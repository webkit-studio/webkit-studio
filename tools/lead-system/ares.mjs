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
