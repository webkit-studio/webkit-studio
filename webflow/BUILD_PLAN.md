# Audit landing page — stavební plán (Webflow, Client-First)

Zdroj pravdy: `source/audit-landing-source.html` (design, texty 1:1, logika interakcí).
Cílová stránka: **Audit**, slug `audit`, projekt **Webkit Studio** (Relume Client-First starter).

> ⚠️ STAV: Webflow MCP připojení zatím vidí jen site „ELDR". Jakmile bude autorizovaný
> site Webkit Studio, jede se podle tohoto plánu.

## Kontakty (přepisy oproti placeholderům v příloze — potvrzeno v zadání)
- Telefon (success zpráva formuláře): **+420 603 791 585** (příloha má placeholder +420 000 000 000)
- E-mail v patičce: **poptavky@webkit.studio** (příloha má studio@webkit.studio — platí zadání)
- LinkedIn (O mně + patička): **https://www.linkedin.com/in/svoboda-lukas/** (příloha má `#`)
- IČO 09296778 · webkit.studio

## Krok 1 — Variables (kolekce „Audit") + Style Guide
| Token | Hodnota |
|---|---|
| audit/bg | #FAF6EF |
| audit/ink | #171310 |
| audit/accent | #FF4D00 |
| audit/surface | #F1EBE1 |
| audit/card | #FFFDF8 |
| audit/border | #E5DDCF |
| audit/muted | #71695D |
| audit/dark-bg | #171310 |
| audit/dark-fg | #FAF6EF |
| audit/dark-muted | rgba(250,246,239,.6) |
| audit/dark-line | rgba(250,246,239,.22) |

Typografie: Urbanist 400–800 (načíst přes Google Fonts `<link>` v head custom code stránky
+ font-family ve stylech; v Project Settings → Fonts přidá Lukáš ručně, API to neumí).
- H1: fluid clamp(42px, 7vw, 100px), 800, ls −0.03em, lh 1.0 (mobil 40–44 px)
- H2: clamp(32px, 4.5vw, 52px), 800, ls −0.03em, lh 1.05
- H3: 20–24 px, 700, ls −0.02em
- Body: 16–18 px, lh 1.55 · kicker: 12 px, 600, uppercase, ls 0.08em · mono: 13 px ui-monospace
- Radius 0 všude. Odkazy podtržené (offset 3 px), hover akcent.
- Button primary: accent bg + ink text → hover invert (ink bg + krém text), transition 150 ms.
- Button secondary: border 1 px ink → stejný hover. Active: translateY(1px).
- Aktualizovat stránku Style Guide (barvy + typo + tlačítka).

## Krok 2 — Page settings
- Title: `Audit webu s návrhem nové homepage za 8 000 Kč | Webkit.Studio`
- Description: `Do 5 pracovních dnů uvidíte, co váš web brzdí a jak má vypadat. Audit s návrhem nové homepage za 8 000 Kč. Objednávky do 31. 8.`
- OG title/description: stejné (titleCopied/descriptionCopied true).
- Head custom code stránky: Google Fonts Urbanist + malé CSS (selection, scroll-behavior, underline offset).
- Before </body>: `webflow/page-code/before-body.html` (GSAP + ScrollTrigger + orchestrace, < 10 000 znaků).

## Krok 3 — Struktura sekcí (Client-First)
Vše: `page-wrapper > main-wrapper > section_[název] > padding-global > container-large > padding-section-large`.
Padding sekcí: clamp(64px, 9vw, 112px); na mobilu ~60 %.

| # | Sekce | Class | Relume vodítko | Obsah (texty 1:1 ze zdroje) |
|---|---|---|---|---|
| 0 | Nav | section_nav (header) | navbar — minimal | logo SVG + „WEBKIT.STUDIO" · „Objednávky do 31. 8." · CTA „Chci audit" → #objednavka |
| 1 | Hero | section_hero | header82 | badge · H1 „Předělám weby tak,&lt;br&gt;aby vydělávali." (oranžová tečka) · sub · CTA „Chci audit za 8 000 Kč →" + „Jak to funguje ↓" (#prubeh) · demo TRIMEX · dekorativní čtvrtkruhy (#F1EBE1) |
| 2 | Ztráty | section_ztraty | header + 3 karty + statement | kicker „OPTIMALIZACE KONVERZÍ" · H2 · 3 karty (border-top 2px ink) · graf (embed) · statement „Podzim je v B2B…" · CTA + mono „Objednávky do 31. 8." |
| 3 | Co dostanete | section_dostanete | bento s hlavní kartou | H2 „Za 8 000 Kč dostanete" · hlavní karta „Návrh nové homepage" (#F1EBE1, mock wireframů) · 3 karty (#FFFDF8): Rozbor 40+ bodů ([data-count40] na „40"), Seznam oprav, 5min video a 30min konzultace |
| 4 | Jak to probíhá | section_prubeh, id `prubeh` | timeline horizontální | bg #F1EBE1 · čára [data-tbar] + 4 uzly [data-tnode] (4. akcent) · Den 1 Průzkum / Den 2–3 Rozbor / Den 4 Návrh / Den 5 Předání · řádek s CTA (secondary) |
| 5 | Výsledky | section_vysledky | portfolio — 2 case | Arbosis (16/10, border-bottom-left-radius 100 %, placeholder „Arbosis — ukázky dodá Lukáš") · Vládní agentura (placeholder „ukázky dodá Lukáš") · tagy · CTA secondary + „Návrh vám zůstává…" |
| 6 | Cena | section_cena, id `cena` | pricing — jedna karta | tmavá karta (#171310/#FAF6EF): „8 000 Kč" [data-price] · 5 řádků „+" benefitů · CTA (hover invert krém) · „Proč tak levné?" pruh |
| 7 | O mně | section_omne | about — foto + text | foto placeholder 3/4 („foto — dodá Lukáš") · H2 „Audit dělám osobně." · text · LinkedIn ↗ + webkit.studio ↗ |
| 8 | FAQ | section_faq | faq — accordion | 7 položek, první otevřená; nativní Webflow interakce nebo lehký JS v embedu; texty ze zdroje (faqItems v JS, řádky 857–865) |
| 9 | Objednávka | section_objednavka, id `objednavka` | cta + contact form | tmavá sekce · H2 „Objednávky do 31. srpna." · krémová karta s nativním Webflow Form |
| 10 | Footer | footer_wrap | footer — minimal | odstavec Zdroje s id `zdroje` (text 1:1) · logo · „Webkit.Studio — Lukáš Svoboda · IČO 09296778" · poptavky@webkit.studio · webkit.studio · LinkedIn |
| 11 | Sticky CTA | [data-sticky-cta] | — | fixní lišta ≤767 px, „Audit za 8 000 Kč →" → #objednavka; zobrazit po ~500 px, skrýt u formuláře (řídí page script) |

## Krok 4 — Interaktivní prvky
### Hero demo TRIMEX (desktop laptop / mobil telefon)
Markup = Webflow Embedy (limit 10 000 znaků/embed → rozdělit):
1. Embed A: `<style>` scoped CSS dema (třídy `au-*`, `trx-*`) + desktop laptop markup (zdroj ř. 66–227).
2. Embed B: mobilní telefon markup (zdroj ř. 230–367). Viditelnost: media query v CSS (desktop ≥768, telefon ≤767).
3. Embed C: `webflow/embeds/demo-logic.js` v `<script>` (hotová logika, sdílený stav, klik i klávesnice).
Chování: 4 hotspoty [data-fix=h|c|f|p] · pulzující „+" badge (@keyframes auPulse v Embedu A) ·
výsledkové badge +93 % / +202 % / +12 mil. $ / +270 % · počítadlo „opraveno X / 4" ·
po 4/4 přepnout starou nav na „TRIMEX." ([data-au-nav-old/new]) · proof lišta bg #22303e při .is-on.

### Graf návštěvnost vs. poptávky
`webflow/embeds/chart-embed.html` — hotový, samostatný (SVG + IO, kreslení čar, prognóza, zvýraznění labelu).

## Krok 5 — Animace (GSAP)
`webflow/page-code/before-body.html` — hotový. H1 po řádcích (H1 stavět jako 2 spany `.h1_line`),
sub+CTA follow-up, laptop rotateX 14→0 + scale scrub, reveal [data-reveal] once,
timeline scrub + pop, cena scale-in, čítač 0→40, sticky CTA lišta, gsap.matchMedia reduced-motion.
Jen transform + opacity. Hover řeší CSS (150 ms).

## Krok 6 — Formulář (nativní Webflow Form)
Pole: Jméno* (`name`) · E-mail* (`email`, type=email) · Web firmy* (`web`) · Telefon (`phone`, tel, nepovinný).
Inputy: 100 % šířky, font-size ≥ 16 px, padding 12/14, radius 0, focus outline 2px akcent. Touch targety ≥ 44 px.
Tlačítko: plná šířka, „Chci audit za 8 000 Kč →". Pod ním: „Údaje použiju jen k vyřízení objednávky."
Success zpráva: „Díky. Ozvu se do pár hodin s platebním odkazem." + „Chcete to probrat hned? Volejte +420 603 791 585."
(telefon jako tel: odkaz). Error message česky.

## Krok 7 — Responzivita (base / 991 / 767 / 478)
- H1 mobil 40–44 px, nepřetéká; padding sekcí ~60 %.
- 3karty → 1 sloupec; bento → stack (hlavní karta první); timeline → vertikální ≤767 (čára svisle, scaleY).
- Demo: ≤767 telefon verze, ne zmenšený laptop.
- Sticky CTA jen ≤767.

## Krok 8 — QA smyčka
1. Publish jen na **.webflow.io staging** (ostrou doménu NE).
2. Playwright screenshoty 390 / 768 / 1440 (full page) + otevřít zdrojový HTML vedle.
3. Porovnat: rozestupy, velikosti, barvy, zarovnání, přetékání, stav animací. Opravit, zopakovat, min. 2 kola.

## Zbývá ručně (po dokončení)
foto O mně · vizuály Arbosis + vládní agentura · notifikace formuláře na poptavky@webkit.studio
(Project Settings → Forms) · GA4 · publish na ostrou doménu · Google Font Urbanist v Project Settings.
