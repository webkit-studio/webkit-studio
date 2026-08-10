# QA kolo 2 — staging https://webkit-studio.webflow.io/audit (2026-08-10)

## Screenshoty (reduced-motion, full page)
stage2-390 / stage2-478 / stage2-768 / stage2-1440 + interakce:
stage1-demo-fixed (desktop demo 4/4), stage1-mobile-sticky (sticky CTA po scrollu).

## Automatické kontroly (Playwright proti publikovanému stagingu)
- horizontální overflow: 0 px na 390/478/768/1440
- GSAP + ScrollTrigger načtené; 29/29 [data-reveal] prvků se odhalí při scrollu
  (reduced-motion: vše viditelné okamžitě)
- graf: kreslení čar + oranžová prognóza + zvýraznění labelu „poptávky"
- demo TRIMEX: klik/klávesnice 0→4/4 na desktopu (laptop) i mobilu (telefon),
  výměna navigace při 4/4, návrat stavů, žádné překryvy
- FAQ: první položka otevřená, toggle funguje
- sticky CTA (≤767): skrytá nahoře → viditelná po 500 px → skrytá u formuláře
- formulář: Jmeno* / Email* / Web firmy* / Telefon (tel, nepovinný),
  správné placeholdery i data-name, tlačítko „Chci audit za 8 000 Kč →"
- kotvy #prubeh #cena #objednavka #zdroje existují
- Urbanist načten (document.fonts)

## Poznámky
- „Made in Webflow" badge se zobrazuje jen na .webflow.io subdoméně
  (vypnutí: Project Settings → General → Branding).
- Capture metodologie: Chromium network stack nefunguje přes sandbox proxy
  (CONNECT reset) — requesty routované přes Node/undici (page.route + fulfill).
