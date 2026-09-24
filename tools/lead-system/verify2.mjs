// verify2.mjs <url> <outdir> — measurements from Google PSI (outside our proxy) + static DOM facts from Chromium (only if page really loaded)
import { chromium } from 'playwright';
import fs from 'node:fs'; import path from 'node:path';
const CHROME = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const KEY = process.env.PSI_API_KEY;
const [,, urlArg, outdirArg] = process.argv;
const url = urlArg.startsWith('http') ? urlArg : 'https://' + urlArg;
const host = new URL(url).hostname.replace(/^www\./,'');
const outdir = outdirArg || path.join('out2', host); fs.mkdirSync(outdir, { recursive: true });
const R = { url, host, checkedAt: new Date().toISOString(), psi: {}, dom: null, errors: [] };

async function psi(strategy, attempt = 1) {
  const u = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=best-practices&category=seo&category=accessibility&locale=cs&key=${KEY}`;
  try {
    const r = await fetch(u, { signal: AbortSignal.timeout(150000) }); const d = await r.json();
    if (d.error) { const quota = /quota/i.test(d.error.message); if (attempt < (quota ? 8 : 2)) { if (quota) await new Promise(r => setTimeout(r, 20000 + Math.random() * 25000)); return psi(strategy, attempt + 1); } return { error: d.error.message.slice(0, 200) }; }
    const lr = d.lighthouseResult, a = lr.audits;
    const shot = a['final-screenshot']?.details?.data;
    if (shot) fs.writeFileSync(path.join(outdir, `${strategy}.jpg`), Buffer.from(shot.split(',')[1], 'base64'));
    const reqs = (a['network-requests']?.details?.items || []).map(i => i.url);
    const analytics = reqs.filter(u => /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|c\.seznam\.cz\/js\/rc|clarity\.ms|hotjar|matomo|piwik|ssp\.seznam|region\.seznam/.test(u)).map(u => new URL(u).hostname);
    const failed404 = (a['network-requests']?.details?.items || []).filter(i => [404, 410].includes(i.statusCode)).map(i => i.url.slice(0, 150));
    const httpReqs = reqs.filter(u => u.startsWith('http://')).slice(0, 5);
    const sc = k => (a[k] ? a[k].score : null);
    return {
      finalUrl: lr.finalDisplayedUrl || lr.finalUrl, runWarnings: (lr.runWarnings || []).slice(0, 3),
      scores: Object.fromEntries(Object.entries(lr.categories).map(([k, v]) => [k, v.score == null ? null : Math.round(v.score * 100)])),
      lcp: a['largest-contentful-paint']?.displayValue, lcpMs: a['largest-contentful-paint']?.numericValue, fcp: a['first-contentful-paint']?.displayValue, tbt: a['total-blocking-time']?.displayValue, cls: a['cumulative-layout-shift']?.displayValue,
      viewport: sc('viewport'), isOnHttps: sc('is-on-https'), consoleErrors: sc('errors-in-console'), fontSize: sc('font-size'), imageAspect: sc('image-aspect-ratio'),
      analytics: [...new Set(analytics)], failed404, httpReqs, field: d.loadingExperience?.overall_category || null,
      screenshot: shot ? path.join(outdir, `${strategy}.jpg`) : null,
    };
  } catch (e) { if (attempt < 2) return psi(strategy, attempt + 1); return { error: String(e.message).slice(0, 200) }; }
}

async function dom() {
  const b = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors'] });
  try {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, ignoreHTTPSErrors: true, locale: 'cs-CZ', userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
    const p = await ctx.newPage();
    for (let i = 1; i <= 3; i++) {
      let resp = null, err = null;
      try { resp = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(2500); } catch (e) { err = e.message; }
      const txt = await p.evaluate(() => document.body?.innerText || '').catch(() => '');
      const bad = err || !resp || resp.status() >= 500 || /upstream request failed|tunnel closed/i.test(txt) || txt.trim().length < 80;
      if (bad) { await p.waitForTimeout(3000 * i); continue; }
      const f = await p.evaluate(() => {
        const txt = document.body.innerText;
        const forms = [...document.querySelectorAll('form')].filter(f => f.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=search]):not([type=checkbox]):not([type=radio]),textarea').length >= 2 && !/search|hled/i.test(f.outerHTML.slice(0, 300)));
        const vh = window.innerHeight;
        const telTop = [...document.querySelectorAll('a[href^="tel:"]')].some(a => { const r = a.getBoundingClientRect(); return r.width > 0 && r.top < vh; });
        const ctaTop = [...document.querySelectorAll('a,button')].some(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.top < vh && /popt|nezávazn|kalkul|objedn|kontaktujte|zavolejte|cenov/i.test(e.textContent || ''); });
        const years = [...txt.matchAll(/\b(20[0-2]\d)\b/g)].map(m => +m[1]);
        return {
          title: document.title.slice(0, 120), viewportMeta: !!document.querySelector('meta[name=viewport]'), telLinks: document.querySelectorAll('a[href^="tel:"]').length, phoneInText: (txt.match(/(?:\+420\s?)?\d{3}\s?\d{3}\s?\d{3}/g) || []).length, ico: (txt.match(/I[ČC]O?\s*:?\s*(\d{8})/) || [])[1] || null, copyright: (txt.match(/(©|copyright)[^\n]{0,70}/i) || [null])[0],
          inquiryForms: forms.length, mailtoOnly: !forms.length && !!document.querySelector('a[href^="mailto:"]'),
          telInFirstScreen: telTop, ctaInFirstScreen: ctaTop, lorem: /lorem ipsum/i.test(txt), placeholder: /yourdomain|1\.555\.555|email@domena|your company/i.test(txt),
          maxYearInText: years.length ? Math.max(...years) : null, generator: document.querySelector('meta[name=generator]')?.content || null,
          eshop: /košík|do košíku|add to cart|woocommerce-cart|shoptet|upgates|shopify/i.test(document.documentElement.outerHTML.slice(0, 400000)),
          textSample: txt.replace(/\s+/g, ' ').slice(0, 600),
        };
      });
      return { attempt: i, status: resp.status(), ...f };
    }
    return { failed: true };
  } finally { await b.close(); }
}
if (!KEY) { console.error('PSI_API_KEY missing'); process.exit(2); }
if (process.env.PSI_ONLY === '1' && fs.existsSync(path.join(outdir, 'result.json'))) {
  const old = JSON.parse(fs.readFileSync(path.join(outdir, 'result.json'), 'utf8'));
  R.dom = old.dom; R.psi = old.psi || {};
  const jobs = [];
  if (!R.psi.mobile || R.psi.mobile.error) jobs.push(psi('mobile').then(x => R.psi.mobile = x));
  if (!R.psi.desktop || R.psi.desktop.error) jobs.push(psi('desktop').then(x => R.psi.desktop = x));
  await Promise.all(jobs);
} else {
  [R.psi.mobile, R.psi.desktop, R.dom] = await Promise.all([psi('mobile'), psi('desktop'), dom().catch(e => ({ failed: true, err: String(e.message).slice(0, 120) }))]);
}
fs.writeFileSync(path.join(outdir, 'result.json'), JSON.stringify(R, null, 2));
const m = R.psi.mobile || {}, d = R.psi.desktop || {};
console.log(JSON.stringify({ host, mobile: m.error ? m.error : { perf: m.scores?.performance, lcp: m.lcp, viewport: m.viewport, https: m.isOnHttps, final: m.finalUrl, analytics: m.analytics, e404: m.failed404?.length }, desktop: d.error ? d.error : { perf: d.scores?.performance, lcp: d.lcp }, dom: R.dom?.failed ? 'NEOVĚŘENO' : { forms: R.dom?.inquiryForms, tel1: R.dom?.telInFirstScreen, cta1: R.dom?.ctaInFirstScreen, copy: R.dom?.copyright, maxYear: R.dom?.maxYearInText, vp: R.dom?.viewportMeta, ico: R.dom?.ico, eshop: R.dom?.eshop, lorem: R.dom?.lorem } }));
