// Použití: node render.js <soubor.html> <vystup.png>
// Vyrenderuje 1200x630 a k tomu <vystup>-sms.png (360 px široký náhled,
// jak ho uvidí příjemce v SMS / iMessage / WhatsApp bublině).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const path = require('path');
(async () => {
  const [html, out] = process.argv.slice(2);
  if (!html || !out) { console.error('node render.js in.html out.png'); process.exit(1); }
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('requestfailed', r => errs.push('FAIL ' + r.url()));
  await p.goto('file://' + path.resolve(html), { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const fonts = await p.evaluate(() => [...document.fonts].map(f => f.family + ':' + f.status));
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await b.close();
  const sms = out.replace(/\.png$/, '-sms.png');
  execFileSync('python3', ['-c', `from PIL import Image; im=Image.open('${out}').convert('RGB'); im.resize((360,189), Image.LANCZOS).save('${sms}')`]);
  console.log(JSON.stringify({ out, sms, fonts, errors: errs }));
})();
