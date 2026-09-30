// ares.mjs — dohledání IČO v ARES podle názvu firmy a obce, když ho web neuvádí.
// Firmy.cz IČO v detailu firmy nemá. Bez IČO rutina lead nezapíše (velikost a jednatel
// se berou jen z ARES), a u platících firem tak padala většina kandidátů.

const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

// „Okna Macek - okna, dveře, vrata“ → „Okna Macek“, „BOHEMIAFLEX CS s.r.o.“ → „BOHEMIAFLEX CS“
export function jadroNazvu(n) {
  return (n || '').split(/\s[-–|]\s|,|\(/)[0]
    .replace(/\b(s\.?\s?r\.?\s?o\.?|spol\.?(\s?s\s?r\.?\s?o\.?)?|a\.?\s?s\.?|v\.?\s?o\.?\s?s\.?|k\.?\s?s\.?|z\.?\s?s\.?)\s*$/i, '').trim();
}

// „Brněnská 327, Třebíč“ → „Třebíč“, „Kolín III“ zůstane „Kolín III“
function obecZAdresy(a) {
  const p = (a || '').split(',').map(s => s.trim()).filter(Boolean);
  return p.length ? p[p.length - 1].split(/\s*[-–]\s*/)[0] : null;
}

async function hledej(jmeno) {
  try {
    const r = await fetch('https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/vyhledat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ obchodniJmeno: jmeno, pocet: 20 }), signal: AbortSignal.timeout(20000),
    });
    return ((await r.json()).ekonomickeSubjekty || []).filter(x => !x.datumZaniku);
  } catch { return []; }
}

// Vrací { ico } jen při jednoznačné shodě v obci. Jinak kandidáty k ručnímu ověření.
// Zkouší postupně části názvu: „Opravy oken - Pavel Vybíral“ → „Opravy oken“, pak „Pavel Vybíral“.
export async function aresPodleNazvu(name, address) {
  const obec = obecZAdresy(address); const o = norm(obec);
  const casti = [...new Set((name || '').split(/\s[-–|]\s/).map(jadroNazvu).filter(x => x.length >= 3))].slice(0, 3);
  let prvni = null;
  for (const jadro of casti) {
    let vse = await hledej(jadro);
    // Živnostník bývá v ARES pod jménem („Stavby Marynets“ → „Marynets“).
    if (!vse.length) { const slovo = jadro.split(/\s+/).sort((a, b) => b.length - a.length)[0]; if (slovo && slovo.length >= 5 && slovo !== jadro) vse = await hledej(slovo); }
    const vObci = o ? vse.filter(x => norm(x.sidlo?.nazevObce) === o || norm(x.sidlo?.textovaAdresa).includes(o)) : [];
    const vysledek = {
      jadro, obec, nalezeno: vse.length,
      ico: vObci.length === 1 ? vObci[0].ico : null,
      kandidati: vse.slice(0, 3).map(x => ({ ico: x.ico, jmeno: x.obchodniJmeno, obec: x.sidlo?.nazevObce || null })),
    };
    if (vysledek.ico) return vysledek;
    if (!prvni) prvni = vysledek;
  }
  return prvni;
}

// IČO z webu, když není na úvodní stránce: bývá na stránce Kontakt, O nás nebo v patičce.
// Ranní běh 30. 9. kvůli tomu vyřadil asi 20 platících firem, protože ARES našel
// firmu se sídlem v jiném městě a IČO nešlo potvrdit.
const RE_ICO = /I[ČC]O?\s*[:.]?\s*(\d{2}\s?\d{3}\s?\d{3})\b/;
async function stahni(u) {
  try { const r = await fetch(u, { signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0 Safari/537.36' } }); return r.ok ? await r.text() : ''; } catch { return ''; }
}
const text = h => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/\s+/g, ' ');
export async function icoZWebu(url) {
  const h = await stahni(url);
  const m = text(h).match(RE_ICO); if (m) return m[1].replace(/\s/g, '');
  const odkazy = [...new Set([...h.matchAll(/href=["']([^"'#]+)["']/gi)].map(x => x[1]).filter(x => /kontakt|contact|o-nas|o-firme|o-spolecnosti|about|fakturac/i.test(x)))].slice(0, 3);
  for (const o of odkazy) {
    let u; try { u = new URL(o, url).href; } catch { continue; }
    const t = text(await stahni(u)).match(RE_ICO); if (t) return t[1].replace(/\s/g, '');
  }
  return null;
}
