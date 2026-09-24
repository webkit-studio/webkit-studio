// pipeline.mjs <runDir> <perQuery> "<obor label>" "<query>"...
import { chromium } from 'playwright'; import fs from 'node:fs'; import path from 'node:path'; import { execFile } from 'node:child_process';
const [,, runDir, perQ, obor, ...queries] = process.argv; fs.mkdirSync(runDir, { recursive: true });
const log = (...a) => { const l = a.join(' '); console.log(l); fs.appendFileSync(path.join(runDir, 'log.txt'), l + '\n'); };
const known = new Set((fs.existsSync('known_domains.txt') ? fs.readFileSync('known_domains.txt', 'utf8') : '').split(/\s+/).filter(Boolean));
const dom = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return null; } };
// 1) search lists (Chromium, JS-rendered)
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors'] });
const p = await (await b.newContext({ locale: 'cs-CZ', ignoreHTTPSErrors: true })).newPage();
const details = []; const rankMap = {};
// SKIP=5 přeskočí prvních 5 výsledků: firmy na špičce Firmy.cz obvolává každý
const SKIP = +(process.env.SKIP || 0);
for (const q of queries) {
  let links = [];
  for (let i = 1; i <= 3 && !links.length; i++) {
    try { await p.goto('https://www.firmy.cz/?q=' + encodeURIComponent(q), { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(4000); for (let s = 0; s < 3; s++) { await p.mouse.wheel(0, 3000); await p.waitForTimeout(700); } links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href*="/detail/"]')].map(a => a.href.split('#')[0].split('?')[0]))]); } catch {}
  }
  log(`search "${q}": ${links.length}`); links.slice(SKIP, SKIP + +perQ).forEach((l, i) => { if (!details.includes(l)) { details.push(l); rankMap[l] = { query: q, rank: SKIP + i + 1 }; } });
}
await b.close();
// 2) details via curl (server-rendered JSON-LD)
const curl = u => new Promise(res => execFile('curl', ['-s', '-m', '30', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0 Safari/537.36', u], { maxBuffer: 20e6 }, (e, out) => res(e ? '' : out)));
const cands = [];
for (const d of details) {
  let t = ''; for (let i = 0; i < 3 && t.length < 5000; i++) t = await curl(d);
  const lds = [...t.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => { try { return JSON.parse(m[1]); } catch { return null; } }).filter(Boolean).flat();
  const biz = lds.find(x => x && /LocalBusiness|Organization|Store|HomeAndConstructionBusiness|ProfessionalService|GeneralContractor/.test(String(x['@type']))) || {};
  const web = (typeof biz.url === 'string' && !/firmy\.cz/.test(biz.url)) ? biz.url : ([...t.matchAll(/"url"\s*:\s*"(https?:\/\/[^"]+)"/g)].map(m => m[1]).find(u => !/firmy\.cz|sdn\.cz|seznam|mapy/.test(u)) || null);
  const row = { detail: d, firmyRank: rankMap[d] || null, name: biz.name || (t.match(/<h1[^>]*>(.*?)<\/h1>/s) || [])[1]?.replace(/<[^>]+>/g, '').trim() || null, web, phone: biz.telephone || (t.match(/"telephone"\s*:\s*"([^"]+)"/) || [])[1] || null, address: [biz.address?.streetAddress, biz.address?.addressLocality].filter(Boolean).join(', ') || null, rating: biz.aggregateRating?.ratingValue || null, reviews: biz.aggregateRating?.reviewCount || biz.aggregateRating?.ratingCount || null };
  const dm = dom(row.web);
  if (!row.web) { log('  - bez webu:', row.name); continue; }
  if (dm && known.has(dm)) { log('  - už v DB:', row.name, dm); continue; }
  if (cands.find(c => dom(c.web) === dm)) continue;
  if (process.env.PREFILTER === '1') {
    let h = ''; for (let i = 0; i < 2 && h.length < 1500; i++) h = await curl(row.web);
    if (h.length >= 1500 && !/upstream request failed/i.test(h)) {
      const vp = /<meta[^>]+name=["']?viewport/i.test(h);
      const years = [...h.matchAll(/(?:©|&copy;|copyright)[^<]{0,40}?(20[0-2]\d)/gi)].map(m => +m[1]);
      const cy = years.length ? Math.max(...years) : null;
      const oldGen = /generator["'][^>]+(webnode|joomla! 1\.|joomla! 2\.|joomla! 3\.|wordpress [1-4]\.|frontpage|wix)/i.test(h) || /jquery[-.]?1\.[0-9]\b|jquery\/1\./i.test(h);
      const tables = (h.match(/<table/gi) || []).length >= 4;
      const eshop = /do košíku|add-to-cart|woocommerce-cart|shoptet|upgates|cdn\.shopify/i.test(h);
      const suspicious = !vp || (cy && cy <= 2019) || oldGen || tables;
      row.pre = { vp, cy, oldGen, tables, eshop };
      if (eshop) { log('  - e-shop:', row.name); continue; }
      if (!suspicious) { log('  - předsítko OK (moderní):', row.name, row.web); fs.appendFileSync(path.join(runDir, 'skipped_ok.jsonl'), JSON.stringify(row) + '\n'); continue; }
    }
  }
  cands.push(row); log('  + kandidát:', row.name, '|', row.web, '|', row.phone, row.pre ? JSON.stringify(row.pre) : '');
}
fs.writeFileSync(path.join(runDir, 'candidates.json'), JSON.stringify(cands, null, 1));
// 3) verify each (PSI + DOM), concurrency 4
const runOne = c => new Promise(res => execFile('node', ['verify2.mjs', c.web, path.join(runDir, 'sites', dom(c.web))], { env: process.env, timeout: 400000, maxBuffer: 5e6 }, (e, out) => { log('  ✓', c.name, (out || '').trim().slice(0, 400)); res(); }));
const q = [...cands]; await Promise.all(Array.from({ length: 4 }, async () => { while (q.length) await runOne(q.shift()); }));
// 4) ARES for IČO found on site
for (const c of cands) {
  try { const r = JSON.parse(fs.readFileSync(path.join(runDir, 'sites', dom(c.web), 'result.json'), 'utf8')); c.verify = r; const ico = r.dom?.ico;
    if (ico) { const a = JSON.parse(await curl(`https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/${ico}`) || '{}').zaznamy?.[0]; const a2 = JSON.parse(await curl(`https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/${ico}`) || '{}');
      c.ares = a ? { ico, name: a.obchodniJmeno, pravniForma: a.pravniForma, kat: a.statistickeUdaje?.kategoriePoctuPracovniku, kraj: a2.sidlo?.nazevKraje, obec: a2.sidlo?.nazevObce, vznik: a2.datumVzniku, zanik: a2.datumZaniku || null } : { ico, notFound: true }; }
  } catch (e) { c.verifyError = String(e.message).slice(0, 100); }
}
fs.writeFileSync(path.join(runDir, 'candidates.json'), JSON.stringify(cands, null, 1));
log('HOTOVO', cands.length, 'kandidátů');
