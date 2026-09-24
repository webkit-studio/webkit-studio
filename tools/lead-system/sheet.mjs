// sheet.mjs <shortlist.json> <out-prefix> – skládá mobilní screenshoty do přehledových obrázků (10 na list)
import { chromium } from 'playwright'; import fs from 'node:fs'; import path from 'node:path';
const [,, src, out] = process.argv; const S = JSON.parse(fs.readFileSync(src, 'utf8'));
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 1400, height: 800 } });
for (let i = 0; i < S.length; i += 10) {
  const cells = S.slice(i, i + 10).map((s, k) => { const img = path.resolve(s.dir, 'mobile.jpg'); const d = fs.existsSync(img) ? fs.readFileSync(img).toString('base64') : '';
    return `<div class=c><b>${i + k + 1}. ${s.host}</b><br><small>${s.flags.join(' ')} · PSI ${s.pm}/${s.pd}</small><br>${d ? `<img src="data:image/jpeg;base64,${d}">` : 'bez screenshotu'}</div>`; }).join('');
  await p.setContent(`<style>body{margin:0;font:12px sans-serif}.g{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;padding:6px}.c{border:1px solid #999;padding:3px}img{width:100%}</style><div class=g>${cells}</div>`);
  await p.screenshot({ path: `${out}-${i / 10 + 1}.png`, fullPage: true });
}
await b.close(); console.log('OK', Math.ceil(S.length / 10));
