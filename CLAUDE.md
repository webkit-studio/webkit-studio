# Webkit.Studio – repo webu a projektu v2

Web webkit.studio (Webflow + vlastní kód z tohoto repa přes jsDelivr) a jeho přestavba „v2“. Práce běží **štafetou**: koordinátor (chat s Lukášem) plánuje issues, jednotlivé cloud session dělají vždy jedno issue. Protokol je v `docs/pipeline.md`, skill v `.claude/skills/stafeta/`.

Lukáš u session není. Otázky piš do issue a dokonči, co jde.

## Cíl v2

Web, který přináší víc a lepších poptávek. Zadání: `docs/web-v2/zadani.md`. Stav: sekce Stav v `docs/roadmap.md`.

## ZÁKAZ: staré texty nečíst

Texty, sdělení i analýza v2 vznikají **od nuly**. Staré podklady opakovaně stáhly nové texty zpátky ke starému směru. Proto **nikdy neotvírej a necituj**:

- `docs/web/`, `docs/audit/`, `docs/audit-homepage-2026-09.md`, `docs/prompty/`
- `site/index.html`, `site/poptavka.html`, `site/v6/`, `site/webflow/demo.html`
- texty stávajících stránek ve Webflow (MCP čti jen strukturu, třídy, ID, nastavení – ne obsah textů)
- texty zapsané v JS (`site/webflow/page-home.js`, `site/webkit.js`)
- živý web webkit.studio (nestahuj ho kvůli textům)

Z repa se smí brát jen technika: `site/webflow/README.md`, `build.py`, `dist/`, `analytika/*.js` (logika, ne texty), `docs/analytika*.md`, `docs/formular/*.md`, `docs/gtm/`.

Zdroje pro texty a analýzu: `docs/web-v2/*`, schválené výstupy předchozích session, odpovědi Lukáše v issues, veřejný web (konkurence, vyhledávání). Chybějící fakt = `[DOPLNIT: co]`. Čísla, recenze, výsledky projektů ani klienty **nikdy nevymýšlej**.

## Pravidla textů (web i dokumenty pro Lukáše)

- Česky. Na webu hlas **„my“ (studio)**, zákazníkovi vykáme.
- Podstatné na začátek. Věty 15–20 slov. Krátké odstavce, seznamy, tabulky.
- Nadpisy slovesné nebo jako nepřímá otázka. Klíčová myšlenka tučně.
- Plnovýznamová slovesa místo řetězů podstatných jmen. Minimum trpného rodu.
- Žargon vysvětlit, nebo nepoužít.
- Každá sekce odpovídá na otázku zákazníka (Co dostanu? Kolik a kdy? Zvládnete to? Co když…?).
- **Zakázaná vata:** komplexní řešení, na míru vašim potřebám, posouváme hranice, digitální transformace, inovativní, jedinečný, synergický, v dnešní době, nejen … ale i, klíčový partner, holistický, vášeň, špičkový, bez starostí, zážitek.
- Ve webových textech bez znaků „—“ a „·“ jako oddělovačů.
- Anglické texty kontroluj na czechismy.

## Co se nesmí rozbít

- Pořadí a obsah consent skriptu (`wkConsentGtm` první v head), GTM `GTM-MQW8FHWR`, klíč `wk-consent`, `window.wkGrant`, háček `[data-wk-cookies]`.
- Formulář: ID polí `co-resite`, `name`, `firma`, `email`, název formuláře „Poptávka z homepage“ (sleduje Make). Změna = zároveň úprava Make scénáře.
- CTA odkazy obsahující `#kontakt` (trigger `cta_click` v GTM), jinak upravit GTM.
- URL `/osobni-udaje`.
- `dist/` se needituje ručně – jen přes `python3 site/webflow/build.py`.

## Technika

- Webflow site ID `67fced6633545aae0dbfe4bc`, třídy Client-First, zápis přes MCP `Webflow_Webkit_Studio`.
- Vlastní CSS/JS: zdroj v `site/webflow/`, build `python3 site/webflow/build.py`, výstup `site/webflow/dist/`, načítání z `https://cdn.jsdelivr.net/gh/webkit-studio/webkit-studio@main/site/webflow/dist/…`, cache čistí Action `jsdelivr-purge.yml` po merge do main.
- Omezení: head/footer kód max 10 000 znaků, Data API odmítá `<script>` ve volném kódu (406), duplikace stránky nepřenáší head kód.
- Snímky a měření: Playwright s Chromiem v `/opt/pw-browsers/chromium`.

## Repo je veřejné

Musí být (jsDelivr). Do repa, issues ani PR nic interního: žádné tokeny, ceny pro konkrétní klienty, osobní údaje, interní poznámky o klientech. Tajemství jen v prostředí session.

## Struktura

- `docs/web-v2/` – zadání a výstupy projektu v2 (analýza, strategie, návrhy, texty)
- `docs/roadmap.md`, `docs/pipeline.md`, `docs/decisions.md`, `docs/koordinator.md`, `docs/sessions.md` – štafeta
- `site/webflow/` – vlastní kód webu (v2 do `site/webflow/v2/`)
- `tools/lead-system/` – jiný projekt (hledání leadů), na v2 se nesahá
