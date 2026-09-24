// cleanup.mjs – re-verify existing Notion leads: prefilter (curl) → verify2 (PSI + DOM) for suspicious ones
// input: cleanup.tsv (notionId \t url \t obor); output: runs/cleanup/pre.jsonl + runs/cleanup/sites/<host>/result.json
import fs from 'node:fs'; import path from 'node:path'; import { execFile } from 'node:child_process';
const runDir = 'runs/cleanup'; fs.mkdirSync(runDir, { recursive: true });
const rows = fs.readFileSync('cleanup.tsv', 'utf8').trim().split('\n').map(l => { const [id, web, obor] = l.split('\t'); return { id, web, obor }; });
const dom = u => new URL(u).hostname.replace(/^www\./, '');
const log = (...a) => { const l = a.join(' '); console.log(l); fs.appendFileSync(path.join(runDir, 'log.txt'), l + '\n'); };
const curl = u => new Promise(res => execFile('curl', ['-sL', '-m', '30', '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0 Safari/537.36', u], { maxBuffer: 20e6 }, (e, out) => res(e ? '' : out)));
const toVerify = [];
for (const r of rows) {
  let h = ''; for (let i = 0; i < 2 && h.length < 1500; i++) h = await curl(r.web);
  if (h.length >= 1500 && !/upstream request failed/i.test(h)) {
    const vp = /<meta[^>]+name=["']?viewport/i.test(h);
    const years = [...h.matchAll(/(?:©|&copy;|copyright)[^<]{0,40}?(20[0-2]\d)/gi)].map(m => +m[1]);
    const cy = years.length ? Math.max(...years) : null;
    const oldGen = /generator["'][^>]+(webnode|joomla! 1\.|joomla! 2\.|joomla! 3\.|wordpress [1-4]\.|frontpage|wix)/i.test(h) || /jquery[-.]?1\.[0-9]\b|jquery\/1\./i.test(h);
    const tables = (h.match(/<table/gi) || []).length >= 4;
    const eshop = /do košíku|add-to-cart|woocommerce-cart|shoptet|upgates|cdn\.shopify/i.test(h);
    r.pre = { vp, cy, oldGen, tables, eshop }; r.suspicious = !vp || (cy && cy <= 2019) || oldGen || tables;
  } else { r.pre = null; r.suspicious = true; } // nedostupné přes proxy → ověřit přes Google
  fs.appendFileSync(path.join(runDir, 'pre.jsonl'), JSON.stringify(r) + '\n');
  log(r.suspicious ? '  + ověřit:' : '  - moderní:', r.web, JSON.stringify(r.pre));
  if (r.suspicious && !r.pre?.eshop) toVerify.push(r);
}
log('PREFILTER HOTOVO:', toVerify.length, 'k ověření z', rows.length);
const runOne = r => new Promise(res => execFile('node', ['verify2.mjs', r.web, path.join(runDir, 'sites', dom(r.web))], { env: process.env, timeout: 400000, maxBuffer: 5e6 }, (e, out) => { log('  ✓', r.web, (out || '').trim().slice(0, 300)); res(); }));
const q = [...toVerify]; await Promise.all(Array.from({ length: 3 }, async () => { while (q.length) await runOne(q.shift()); }));
log('HOTOVO');
