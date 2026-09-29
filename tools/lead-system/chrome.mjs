// Cesta k Chromiu: CHROMIUM_PATH, jinak nejnovější verze v /opt/pw-browsers (cloudový kontejner),
// jinak undefined = Chromium, který si stáhl Playwright.
import fs from 'node:fs';
export function chromePath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = '/opt/pw-browsers';
  try {
    const dirs = fs.readdirSync(base).filter(d => /^chromium-\d+$/.test(d)).sort((a, b) => +b.split('-')[1] - +a.split('-')[1]);
    for (const d of dirs) { const p = `${base}/${d}/chrome-linux/chrome`; if (fs.existsSync(p)) return p; }
  } catch {}
  return undefined;
}
