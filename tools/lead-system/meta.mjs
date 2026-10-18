// meta.mjs "<doména>|<název firmy>" […] — běží firmě reklama na Facebooku a Instagramu? Meta Knihovna reklam, Česko, aktivní reklamy.
// Knihovna jde číst bez přihlášení, ale hledá jen podle klíčového slova. Proto se hledá doména i název a počítají se jen reklamy,
// jejichž stránka se jmenuje jako firma, nebo jejichž text obsahuje doménu. Pixel na webu neznamená, že reklama běží.
// Výstup: jeden řádek JSON na firmu {domena, nazev, meta, stranky, url}. meta = null znamená neověřeno.
import { chromium } from 'playwright'; import { chromePath } from './chrome.mjs';
const firmy = process.argv.slice(2).map(a => { const [d, n] = a.split('|'); return { domena: d.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0], nazev: (n || '').trim() }; }).filter(f => f.domena);
if (!firmy.length) { console.error('Použití: node meta.mjs "<doména>|<název firmy>" […]'); process.exit(2); }
const b = await chromium.launch({ executablePath: chromePath(), headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors'] });
const ctx = await b.newContext({ ignoreHTTPSErrors: true, locale: 'cs-CZ', viewport: { width: 1280, height: 900 } });
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\b(s\.?\s?r\.?\s?o\.?|spol|a\.?\s?s\.?|v\.?\s?o\.?\s?s\.?)\b/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
async function hledej(q, pokus = 1) {
  const url = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CZ&q=${encodeURIComponent(q)}&search_type=keyword_unordered&media_type=all`;
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    /* Výsledky dotahuje skript: čekej na počet výsledků, nebo na „žádné reklamy“. */
    await p.waitForFunction(() => /výsled|Nebyly nalezeny|žádné reklamy/i.test(document.body.innerText), null, { timeout: 30000 });
    await p.waitForTimeout(2500);
    const t = (await p.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ');
    /* Karta reklamy: „ID knihovny: … Zobrazit podrobnosti o reklamě <Stránka> Sponzorováno <text>“. */
    return t.split(/ID knihovny:/).slice(1).map(k => ({ stranka: (k.match(/podrobnosti o reklamě\s+(.+?)\s+Sponzorováno/) || [])[1] || '', text: k }));
  } catch (e) {
    if (pokus < 2) return hledej(q, pokus + 1);
    return null;
  } finally { await p.close(); }
}
for (const f of firmy) {
  const url = `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CZ&q=${encodeURIComponent(f.domena)}&search_type=keyword_unordered&media_type=all`;
  const karty = [];
  let selhalo = false;
  for (const q of [f.domena, f.nazev].filter(Boolean)) { const r = await hledej(q); if (r === null) selhalo = true; else karty.push(...r); }
  const n = norm(f.nazev), dz = f.domena.toLowerCase(), koren = norm(f.domena.split('.')[0]);
  /* Shoda: stránka nese název firmy (nebo název stránku), nebo text reklamy obsahuje doménu. */
  const shoda = karty.filter(k => { const s = norm(k.stranka); return (n && s && (s.includes(n) || n.includes(s))) || (koren.length > 3 && s.replace(/ /g, '').includes(koren.replace(/ /g, ''))) || k.text.toLowerCase().includes(dz); });
  const stranky = [...new Set(shoda.map(k => k.stranka).filter(Boolean))].slice(0, 5);
  const meta = selhalo && !karty.length ? null : new Set(shoda.map(k => k.text.slice(0, 40))).size;
  console.log(JSON.stringify({ domena: f.domena, nazev: f.nazev, meta, stranky, url }));
}
await b.close();
