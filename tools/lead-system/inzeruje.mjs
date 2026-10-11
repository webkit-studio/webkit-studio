// inzeruje.mjs <doména> [<doména> …] — běží firmě reklama na Googlu? Google Ads Transparency, Česko, posledních 30 dní.
// Kód reklamy na webu může zůstat po staré kampani. Tohle říká, jestli reklamy na doménu opravdu běží (RULES.md → Platí za marketing).
// Výstup: jeden řádek JSON na doménu {domena, google30, inzerenti, url}. google30 = null znamená neověřeno.
import { chromium } from 'playwright'; import { chromePath } from './chrome.mjs';
const domeny = process.argv.slice(2).map(d => d.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]).filter(Boolean);
if (!domeny.length) { console.error('Použití: node inzeruje.mjs <doména> [<doména> …]'); process.exit(2); }
const b = await chromium.launch({ executablePath: chromePath(), headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors'] });
const ctx = await b.newContext({ ignoreHTTPSErrors: true, locale: 'cs-CZ', viewport: { width: 1280, height: 900 } });
async function zjisti(domena, pokus = 1) {
  const url = `https://adstransparency.google.com/?region=CZ&domain=${domena}&preset-date=Last+30+days`;
  const p = await ctx.newPage();
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    /* Stránka dotahuje výsledky skriptem: čekej na počet reklam, nebo na „Nebyly nalezeny“. */
    await p.waitForFunction(() => /\d[\d\s ]*\s+reklam|Nebyly nalezeny/i.test(document.body.innerText), null, { timeout: 45000 });
    await p.waitForTimeout(1500);
    const t = (await p.evaluate(() => document.body.innerText)).replace(/\s+/g, ' ');
    if (/Nebyly nalezeny žádné reklamy/i.test(t)) return { domena, google30: 0, inzerenti: [], url };
    const m = t.match(/(\d[\d  ]*)\s+reklam/i);
    const n = m ? +m[1].replace(/\D/g, '') : null;
    /* Inzerenti jsou v kartách reklam jako „Název Ověřeno“ mezi filtry a patičkou stránky. */
    const usek = t.split(/Všechny formáty arrow_drop_down/)[1]?.split(/Další informace najdete/)[0] || '';
    const inzerenti = [...new Set(usek.split(/\s*Ověřeno\s*/).map(s => s.replace(/hide_image|Tuto reklamu teď bohužel nemůžeme zobrazit\.|See all ads/g, '').trim()).filter(s => s && s.length < 80))].slice(0, 5);
    return { domena, google30: n, inzerenti, url };
  } catch (e) {
    if (pokus < 2) return zjisti(domena, pokus + 1);
    return { domena, google30: null, inzerenti: [], url, chyba: String(e.message).slice(0, 120) };
  } finally { await p.close(); }
}
for (const d of domeny) console.log(JSON.stringify(await zjisti(d)));
await b.close();
