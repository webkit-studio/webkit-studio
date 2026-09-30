// reklama.mjs — reklamní kódy na webu (Google Ads, Meta, Sklik).
// Firma, která platí za reklamu, chce zákazníky z internetu. Hledá se v HTML stránky,
// v kontejnerech Google Tag Manageru (v HTML bývá vidět jen GTM-XXXX) a v požadavcích,
// které zachytil Google PSI. V JS kontejneru jsou lomítka escapovaná, proto \\?\/.
export const REKLAMA = {
  google: /AW-\d{6,}|googleadservices\.com|googleads\.g\.doubleclick\.net|"function":"__awct"|"function":"__sp"/,
  meta: /connect\.facebook\.net\\?\/[^"'\s]*fbevents|fbq\(\s*\\?['"]init|facebook\.com\\?\/tr[?\\]/,
  sklik: /c\.seznam\.cz\\?\/js\\?\/rc\.js|rc\.retargetingHit|rc\.conversionHit|seznam_retargeting_id|sznIVA/,
};

// Kontejnery a kódy, které vkládá platforma webu, ne firma. Webnode dává do každého
// webu GTM-542MMSL s vlastní reklamou Googlu (AW-465935583), takže to není důkaz,
// že firma za reklamu platí.
const PLATFORMA_GTM = new Set(['GTM-542MMSL']);
const PLATFORMA_KODY = /AW-465935583/g;

export async function reklamniKody(url, extra = []) {
  let text = extra.join('\n'); const gtm = [];
  try {
    const h = await (await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0 Safari/537.36' } })).text();
    text += '\n' + h;
    for (const id of [...new Set([...h.matchAll(/GTM-[A-Z0-9]{4,9}/g)].map(m => m[0]))].filter(id => !PLATFORMA_GTM.has(id)).slice(0, 3)) {
      try { text += '\n' + await (await fetch(`https://www.googletagmanager.com/gtm.js?id=${id}`, { signal: AbortSignal.timeout(20000) })).text(); gtm.push(id); } catch {}
    }
  } catch {}
  text = text.replace(PLATFORMA_KODY, '');
  const out = { gtm };
  for (const [k, re] of Object.entries(REKLAMA)) out[k] = re.test(text);
  out.nejaka = out.google || out.meta || out.sklik;
  return out;
}
