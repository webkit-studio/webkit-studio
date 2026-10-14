// karta.mjs <result.json> [--platiProfil] [--google30 N] [--json]
// Karta webu pro hovor: šest řádků s barvou a pod nimi krátké vysvětlení (RULES → Karta webu).
// Vstup je result.json z verify2.mjs. --platiProfil = placený profil na Firmy.cz (candidates.json → paid),
// --google30 = počet reklam na Googlu za 30 dní z inzeruje.mjs. Výstup: Markdown, s --json i data.
import fs from 'node:fs'; import { reklamniKody } from './reklama.mjs';

const args = process.argv.slice(2);
const soubor = args.find(a => !a.startsWith('--'));
if (!soubor) { console.error('Použití: node karta.mjs <result.json> [--platiProfil] [--google30 N] [--json]'); process.exit(2); }
const R = JSON.parse(fs.readFileSync(soubor, 'utf8'));
const platiProfil = args.includes('--platiProfil');
const gi = args.indexOf('--google30'); const google30 = gi >= 0 && args[gi + 1] !== 'null' ? Number(args[gi + 1]) : null;

/* Starší result.json nemá měření, doplní se z webu. */
if (!R.reklama?.mereni) R.reklama = await reklamniKody(R.url, [...(R.psi?.mobile?.adHits || []), ...(R.psi?.mobile?.measureHits || [])]).catch(() => R.reklama || null);

const BARVA = { zelena: '🟢', zluta: '🟡', oranzova: '🟠', cervena: '🔴', seda: '⚪' };
const podleSkore = (s, [z, zl, o]) => s == null ? 'seda' : s >= z ? 'zelena' : s >= zl ? 'zluta' : s >= o ? 'oranzova' : 'cervena';
const m = R.psi?.mobile || {}, sc = m.scores || {}, d = R.dom && !R.dom.failed ? R.dom : null, rk = R.reklama || {}, me = rk.mereni || {};
const sek = ms => ms == null ? null : (ms / 1000).toFixed(1).replace('.', ',') + ' s';
const radky = [], vysvetleni = [];

/* 1. Platí za reklamu: zeleně jen ověřené placení (profil nebo běžící reklama na Googlu). */
const kody = [rk.google && 'Google', rk.meta && 'Meta', rk.sklik && 'Sklik'].filter(Boolean);
const plati = [platiProfil && 'Firmy.cz profil', google30 > 0 && `Google reklamy běží (${google30})`].filter(Boolean);
const kodyNavic = kody.filter(k => !(k === 'Google' && google30 > 0));
if (plati.length) radky.push({ klic: 'plati', nazev: 'Platí za reklamu', barva: 'zelena', hodnota: 'ano: ' + [...plati, ...kodyNavic.map(k => 'kód ' + k)].join(', ') });
else if (kody.length) radky.push({ klic: 'plati', nazev: 'Platí za reklamu', barva: 'zluta', hodnota: 'jen kód na webu (' + kody.join(', ') + '), jestli reklama běží, neověřeno' });
else radky.push({ klic: 'plati', nazev: 'Platí za reklamu', barva: 'cervena', hodnota: 'ne, nic ověřeného' });

/* 2. Měření: GA4 nebo jiná analytika. Samotný Universal Analytics neměří nic. */
const pixely = [rk.meta && 'Meta pixel', rk.sklik && 'Sklik'].filter(Boolean);
let mereni;
if (me.ga4 || me.jine) mereni = { barva: 'zelena', hodnota: [me.ga4 && 'Google Analytics 4', me.jine && 'jiná analytika', ...pixely].filter(Boolean).join(', ') };
else if (rk.gtm?.length) mereni = { barva: 'zluta', hodnota: 'Tag Manager, analytiku v něm nevidím (neověřeno)' };
else if (pixely.length) mereni = { barva: 'oranzova', hodnota: 'jen reklamní ' + pixely.join(' a ') + ', analytika chybí' };
else if (me.ua) mereni = { barva: 'cervena', hodnota: 'jen starý Universal Analytics, Google ho od 7/2023 nesbírá' };
else mereni = { barva: 'cervena', hodnota: 'nic' };
radky.push({ klic: 'mereni', nazev: 'Měření návštěv', ...mereni });

/* 3.–5. Skóre z Google PageSpeed (mobil). */
/* Rychlost se barví podle doby načtení hlavního obsahu (LCP), ta odpovídá tomu, co člověk zažije.
   Skóre jen doplňuje. Hranice Googlu: do 2,5 s dobře, do 4 s ujde, nad 4 s špatně (RULES → SLOW). */
const lcpBarva = ms => ms <= 2500 ? 'zelena' : ms <= 4000 ? 'zluta' : ms <= 8000 ? 'oranzova' : 'cervena';
radky.push({ klic: 'rychlost', nazev: 'Rychlost na mobilu', barva: m.lcpMs != null ? lcpBarva(m.lcpMs) : podleSkore(sc.performance, [90, 70, 50]), skore: sc.performance ?? null,
  hodnota: sc.performance == null ? 'neměřeno' : `${sc.performance}/100, hlavní obsah ${sek(m.lcpMs) || '?'}` });
radky.push({ klic: 'seo', nazev: 'Technické SEO', barva: podleSkore(sc.seo, [90, 80, 65]), skore: sc.seo ?? null, hodnota: sc.seo == null ? 'neměřeno' : `${sc.seo}/100` });
radky.push({ klic: 'pristupnost', nazev: 'Přístupnost', barva: podleSkore(sc.accessibility, [90, 80, 65]), skore: sc.accessibility ?? null, hodnota: sc.accessibility == null ? 'neměřeno' : `${sc.accessibility}/100` });

/* 6. Konverzní základ: pět kontrol z načtené úvodní stránky. */
const kontroly = !d ? [] : [
  ['mobil', 'verze pro mobil', d.viewportMeta !== false],
  ['nahore', 'telefon nebo tlačítko na první obrazovce', d.telInFirstScreen || d.ctaInFirstScreen],
  ['tel', 'telefon k ťuknutí', d.telLinks > 0],
  ['formular', 'formulář na úvodní stránce', d.inquiryForms > 0],
  ...(d.inquiryForms > 0 && d.formFields != null ? [['pole', 'krátký formulář (do 6 polí)', d.formFields <= 6]] : []),
];
const chybi = kontroly.filter(k => !k[2]);
radky.push({ klic: 'konverze', nazev: 'Konverzní základ', barva: !d ? 'seda' : ['zelena', 'zluta', 'oranzova'][chybi.length] || 'cervena',
  skore: d ? Math.round(100 * (kontroly.length - chybi.length) / kontroly.length) : null,
  hodnota: !d ? 'neověřeno, stránka se nenačetla' : `${kontroly.length - chybi.length}/${kontroly.length}` + (chybi.length ? ': chybí ' + chybi.map(k => k[1]).join(', ') : '') });

/* Vysvětlení: nejdřív to, co prodává (platí, ale neměří; konverze), pak doplňky. */
const r = Object.fromEntries(radky.map(x => [x.klic, x]));
if (r.plati.barva === 'zelena' && ['oranzova', 'cervena'].includes(r.mereni.barva)) vysvetleni.push('**Platí za reklamu, ale web neměří.** Firma neví, kolik lidí z reklamy přijde a kolik se ozve. Nejsilnější argument pro hovor.');
else if (r.plati.barva === 'zelena' && r.mereni.barva === 'zelena') vysvetleni.push('**Platí a měří.** Dá se mluvit o číslech: kolik lidí přijde a kolik se ozve. Zeptej se, jestli ta čísla sledují.');
else if (r.plati.barva === 'zluta') vysvetleni.push('**Placení neověřené.** Kód reklamy může zůstat po staré kampani. V hovoru se zeptej: „Inzerujete teď?“');
const DOPAD = { mobil: 'Web není přizpůsobený mobilu, v telefonu je celý zmenšený.', nahore: 'Na první obrazovce mobilu není telefon ani tlačítko, člověk musí hledat.', tel: 'Na telefon nejde ťuknout, z mobilu se musí opsat.', formular: 'Na úvodní stránce není formulář. Než řekneš „nikde“, podívej se na Kontakty.', pole: `Formulář má ${d?.formFields} polí, víc polí znamená méně odeslaných poptávek.` };
if (chybi.length) vysvetleni.push('**Cesta k poptávce:** ' + chybi.map(k => DOPAD[k[0]]).join(' '));
if (['oranzova', 'cervena'].includes(r.rychlost.barva)) vysvetleni.push(`**Rychlost:** hlavní obsah se na mobilu podle Googlu načítá ${sek(m.lcpMs) || '?'}. Google měří na pomalém připojení, říkej „podle Googlu“.`);
else if (r.rychlost.barva === 'zelena') vysvetleni.push('**Rychlost je v pořádku.** Neotvírej s ní.');
const doplnky = [['seo', 'technické SEO'], ['pristupnost', 'přístupnost']].filter(([k]) => ['oranzova', 'cervena'].includes(r[k].barva));
if (doplnky.length) vysvetleni.push(`**${doplnky.map(([k, n]) => `${n[0].toUpperCase() + n.slice(1)} ${r[k].skore}/100`).join(', ')}:** jen doplněk. Kontrolní seznam Googlu, ne důkaz, že web nejde najít nebo použít. Neotvírej s tím.`);

const datum = new Date().toLocaleDateString('cs-CZ', { timeZone: 'Europe/Prague' });
const md = [`**Karta webu** (${datum})`, '', '| Co | Výsledek |', '|---|---|',
  ...radky.map(x => `| ${x.nazev} | ${BARVA[x.barva]} ${x.hodnota.replace(/\|/g, '/')} |`), '',
  ...vysvetleni.map(v => '- ' + v)].join('\n');
if (args.includes('--json')) console.log(JSON.stringify({ web: R.url, datum, radky, vysvetleni, md }, null, 1));
else console.log(md);
