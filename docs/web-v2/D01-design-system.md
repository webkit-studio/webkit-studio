# D01: Design systém a knihovna komponent v2

_Session D01 · 30. 9. 2026 · issue #13 · aktualizace D02 · 1. 10. 2026 · issue #43 · náhled: https://claude.ai/artifact/3rGAWQ952JovDCbNPHzFM1 · kopie náhledu: `docs/web-v2/navrh/index.html`_

## Stav po D02

- **D02 (1. 10. 2026, issue #43) přepsal návrh podle zpětné vazby.** Tokeny, písma a modrá zůstávají. Změnily se komponenty, texty a typová škála nadpisů. Co a proč: `docs/web-v2/D02-zmeny.md`.
- Otázky z D01 rozhodl Lukáš 30. 9. (`docs/decisions.md`): pole rozpočet ne, rozcestníky podle cílovky ne, jedna modrá plocha (CTA) ano, podpisové sekce ano, náhled u kurzoru vyřazen.

## Jak náhled číst

- Lišta nahoře je mimo design webu. Přepíná **Homepage, Webflow vývoj, UX audit, Vývoj MVP, Komponenty** a šířku **Okno, 1440, 390**.
- **Názvy komponent** obtáhne každou sekci a ukáže název komponenty a variantu. Podpisové sekce mají tmavý štítek.
- Pod lištou je **pořadí sekcí** aktuální stránky. Podpisová sekce má hvězdičku.
- **Bez animací** ukáže stav pro `prefers-reduced-motion`.
- Žluté štítky `[DOPLNIT: …]` jsou chybějící fakta. Nic z toho není vymyšlené.

## Složení stránek

Tabulka pořadí sekcí je v `D02-zmeny.md`. Princip zůstává: stejné komponenty, jiné pořadí podle obavy zákazníka a jedna podpisová sekce na službu.

## Tokeny

Ve Webflow jako proměnné (Variables) ve složkách Barvy, Písmo, Mezery, Radius. Názvy odpovídají CSS proměnným v náhledu.

### Barvy

| Token | Hodnota | Použití | Kontrast na bílé |
|---|---|---|---|
| `--c-white` | `#FFFFFF` | pozadí | |
| `--c-surface` | `#F5F6F9` | střídání sekcí, karty na bílé | |
| `--c-surface-2` | `#ECEEF4` | neaktivní prvky, přepínače | |
| `--c-line` | `#E0E3EB` | 1px linky, okraje karet | |
| `--c-line-strong` | `#C5CAD6` | okraje polí a sekundárních tlačítek | |
| `--c-ink` | `#0C0E1C` | nadpisy, hlavní text, patička | 19,2:1 |
| `--c-ink-2` | `#464B5E` | perex, popisy | 8,6:1 |
| `--c-ink-3` | `#5E6376` | štítky, metadata | 6,0:1 |
| `--c-blue` | `#1D2BE8` | akce, zvýraznění, velké CTA | 8,2:1 |
| `--c-blue-hover` | `#1520C4` | hover tlačítka | |
| `--c-blue-press` | `#0F189A` | stisk | |
| `--c-blue-50` | `#EFF3FF` | malé CTA, hover důvodů, štítky | |
| `--c-blue-100` | `#DCE4FF` | focus ring polí | |
| `--c-blue-200` | `#B9C8FF` | rezerva | |
| `--c-blue-on-dark` | `#86A2FF` | akcent na tmavé patičce | |
| `--c-success` | `#0B7A48` | potvrzení | |
| `--c-error` | `#C0261B` | chyby formuláře | |
| `--c-on-blue`, `--c-on-blue-2` | `#FFFFFF`, bílá 78 % | text na modré ploše | |
| `--c-on-ink-2`, `--c-line-on-dark` | bílá 70 %, bílá 14 % | druhotný text a linky v patičce | |
| `--c-warn-bg`, `--c-warn-ink` | `#FFF4D6`, `#6B4A00` | jen štítky `[DOPLNIT]` v návrhu, na webu nebudou | |

**Pravidla barev**
- Text je vždy Ink, Ink 2 nebo Ink 3. Na modré jen bílá. Všechny kombinace splňují AA.
- Modrá znamená akci nebo zvýraznění. Nikdy velké plochy textu.
- Jedna sytě modrá plocha na stránce: velké CTA.
- Světlé odstíny modré jsou posunuté k chladné modré (odstín kolem 225°), aby nepůsobily fialově.
- Stíny nepoužíváme. Plochy oddělují tón a 1px linka. Rámečky kolem karet nepoužíváme, karta má jen linku nahoře.
- Gradient jen jako maska okraje marquee. Nikde jinde.

### Typografie

| Styl | Písmo | Velikost (390 → 1440 px) | Řádkování / prostrkání |
|---|---|---|---|
| H1 domů | Bricolage Grotesque 600 | `clamp(2.75rem, .8rem + 6vw, 6.5rem)` | 0,98 / -0,05em |
| H1 služba | Bricolage Grotesque 600 | `clamp(2.5rem, 1rem + 4.6vw, 5.25rem)` | 1,02 / -0,04em |
| H2 sekce | Bricolage Grotesque 600 | `clamp(2rem, 1rem + 3vw, 3.75rem)` | 1,05 / -0,035em |
| H3 | Bricolage Grotesque 600 | `clamp(1.25rem, 1.05rem + .7vw, 1.75rem)` | 1,2 / -0,02em |
| H4, název karty | Bricolage Grotesque 600 | `clamp(1.125rem, 1rem + .45vw, 1.375rem)` | 1,25 |
| Perex | Instrument Sans 400 | `clamp(1.125rem, 1rem + .45vw, 1.375rem)` | 1,5 |
| Text | Instrument Sans 400 | 1rem až 1,0625rem | 1,6 |
| Malý text | Instrument Sans 400 | 0,875rem | 1,5 |
| Číslo kroku a důvodu | IBM Plex Mono 500 | 0,8125rem | 0 |
| Logo (nápis) | Instrument Sans 600 | podle místa, patička až 11,25rem | -0,045em |

**Štítky (eyebrow) nad sekcemi nepoužíváme** (rozhodnutí 30. 9.).

- Nadpisy `text-wrap: balance`, text `text-wrap: pretty`.
- Zvýraznění v nadpisu je modrá barva (`span.hl`), ne jiný řez ani kurzíva.
- V náhledu jsou škály v jednotkách `cqi` (šířka rámu). Ve Webflow se přepíšou na `vw`.

### Mezery, radiusy, vrstvy

| Token | Hodnota |
|---|---|
| `--s-1` až `--s-10` | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px (v náhledu zapsané přímo v rem, ve Webflow jako proměnné) |
| `--sec-y` (odsazení sekce) | `clamp(4.5rem, 2.6rem + 7vw, 9.5rem)` |
| `--gutter` (okraj stránky) | `clamp(16px, 4.2vw, 56px)` |
| Max. šířka obsahu | 1312 px včetně okrajů |
| `--r-xs` / `--r-sm` / `--r-md` / `--r-lg` / pill | 6 / 10 / 16 / 24 / 999 px (drobnosti / pole / karta / CTA plocha / tlačítko a štítek) |
| `--z-raised` / header / menu / overlay / modal / toast | 1 / 50 / 60 / 80 / 90 / 100 |

### Pohyb

| Token | Hodnota | Použití |
|---|---|---|
| `--dur-1` | 150 ms | barva, stisk |
| `--dur-2` | 300 ms | hover tlačítek, šipky, menu |
| `--dur-3` | 500 ms | podtržení, FAQ, akordeon |
| `--dur-4` | 800 ms | odhalení řádků, zoom obrázku |
| `--ease-out` | `cubic-bezier(.2,.7,.2,1)` | výchozí |
| `--ease-draw` | `cubic-bezier(.14,0,0,1.01)` | kreslení linky |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | přesuny |

Animujeme jen `transform` a `opacity`. Při `prefers-reduced-motion` se animace vypnou a obsah je hned vidět. Prvky nad ohybem se neskrývají nikdy.

## Primitiva

| Primitivum | Varianty | Stavy | Props ve Webflow |
|---|---|---|---|
| Tlačítko | Primární, Sekundární, Bílé (na modré); velikost M (52 px), S (44 px) | výchozí, hover (text odroluje, šipka se vymění), focus (2px ring), stisk, odesílání | Text, Odkaz |
| Odkaz | Kreslený, Podtržený (v textu), Se šipkou | hover | Text, Odkaz |
| Štítek | Na tmavé (projekty), Světlý | | Text. Jen u projektů, nikde jinde. |
| Hlavička sekce | Nadpis sám, Nadpis + perex vpravo | | Nadpis H2, Perex (Visibility). **Bez eyebrow.** |
| Pole formuláře | Input, Textarea s přepisujícími se ukázkami | výchozí, hover, focus, chyba | Label, Ukázkové věty |
| Dlaždice | Čtvrtkruh, Čtverec, Prázdná; barva modrá, tmavá, světle modrá | otočení o 90° po najetí | Mřížka 2×2 nebo 3×3, typ, barva a otočení každé dlaždice |

## Sekční komponenty

Každá sekce je jedna komponenta Webflow. Třídy podle Client-First, např. `section_hero`, `hero_component`, `hero_heading`. 16 komponent místo 21.

| Komponenta | Varianty | Props | Kde | Poznámka |
|---|---|---|---|---|
| Navbar | Výchozí, Mobil | Odkazy (Služby, Naše práce, Pro agentury, O nás), CTA text | Všechny | Menu Služby: 8 služeb ve 2 sloupcích bez kategorií a krátká výzva. CTA drží `#kontakt` kvůli GTM. |
| Hero | Home (seznam služeb), Služba | H1 (rich text), Perex, Důkaz 1 a 2 (jen Služba), CTA, Grafika (slot pro dlaždice) | Všechny | Home má pod úvodem řádek 8 služeb jako odkazy. Žádný obrázek obsahu. |
| Statement | Výchozí | Výrok (rich text, `span.dim`), Hodnota ×3 (nadpis, věta), CTA | Homepage | Jak pracujeme. Hodnoty, hlavní CTA. |
| Seznam služeb | 2 sloupce po 4, Co dostanete | Nadpis, Perex, Položky (název, věta, odkaz), „Tohle potřebuju“ (Visibility) | Homepage, služby | „Tohle potřebuju“ předvyplní pole `co-resite`. |
| Naše práce | Velká grafika | Nadpis, Projekty (CMS Projekty, limit 1 až 3, filtr přes Switch), Odkaz na všechny (Visibility) | Homepage, Webflow vývoj, MVP | Podle Relume portfolio-17: grafika přes celou šířku bez rámečku, na ní klient, co jsme udělali, jedno číslo a štítky. Grafika je video smyčka nebo GIF (v náhledu pomalý posun obrázku). Na mobilu text pod grafikou. |
| Proč s námi | 6 důvodů | Nadpis, Důvod ×6 (nadpis, věta) | Homepage | Linka a číslo, bez ikon a rámečků. |
| Reference | Citace a Webflow Partner | Nadpis, Citace, Autor, Odkaz na profil partnera | Homepage, Webflow vývoj | Hodnocení Google se nezobrazuje, dokud recenze nemáme. |
| Postup | 3 až 6 kroků | Nadpis, Perex, Kroky (název, věta, štítek 1. kroku), CTA | Všechny | 6 univerzálních kroků. Služby je upravují nebo ubírají (audit má 5). |
| Časté problémy | 3 otázky | Nadpis, Problém ×3 (otázka, odpověď), CTA (Visibility) | UX audit, MVP | Nadpis karty je otázka zákazníka. |
| FAQ | Výchozí | Nadpis, Perex, Otázky (4 až 6) | Všechny | Homepage obecně, bez webů. FAQPage JSON-LD shodné s textem. |
| CTA s formulářem | Výchozí | Nadpis, Perex, Fotka, Jméno a role, LinkedIn, Formulář | Všechny | Vždy poslední, `id="kontakt"`, jediná modrá plocha. |
| Kontaktní formulář | Výchozí, Odesláno (kalendář) | Ukázkové věty (5), Text tlačítka | v CTA | Pole `co-resite`, `name`, `firma` (povinné), `email`. Název „Poptávka z homepage“. Bez rozpočtu a termínu. Pod tlačítkem jen „Ozveme se do 24 hodin.“ Po odeslání výběr termínu hovoru. |
| Footer | Výchozí | Popis, E-mail, Služby ×8, Studio, Právní odkazy | Všechny | Velké skutečné logo přes celou šířku. `/osobni-udaje` a `[data-wk-cookies]`. |
| Podpis: Srovnání | Webflow vývoj | Nadpis, Perex, Sloupce ×3, Řádky | Webflow vývoj | Tabulka bez rámečku, na mobilu vodorovný posun. |
| Podpis: Před a po | UX audit | Nadpis, Perex, Ilustrace před a po, Nálezy ×3, Úpravy ×3 | UX audit | Označená jako ilustrace. Posuvník jde i klávesnicí. |
| Podpis: Pro koho to je | Vývoj MVP | Nadpis, Persona ×3 (otázka, kdo, věta), Kdy to není pro vás | Vývoj MVP | |

**Vyřazené z D01:** Logo strip, Čísla, CTA malé, Proč nám věřit, Seznam projektů (3 karty a seznam s náhledem u kurzoru), Akordeon služeb, Rozcestník služeb, Mega menu se 3 kategoriemi, Ukázka projektu (vrátí se u `/nase-prace`), hodnocení Google, eyebrow, pole rozpočet.

## Interakce

Všechno ve vanilla JS a CSS, bez knihoven. Při `prefers-reduced-motion` se vypne.

| Interakce | Jak funguje |
|---|---|
| Text tlačítka se odroluje, šipka v kolečku | Text je v DOM jednou, kopie přes `::after` s `attr(data-t)`. `translateY(-100%)`, 300 ms. |
| Podtržení odkazu | `background-size` z 0 na 100 %, kreslí se zleva a odchází doprava. 500 ms, ease-draw. |
| Odhalení řádků nadpisu | Slova se obalí do `span.w`, seskupí se podle `offsetTop` do řádků, každý řádek o 80 ms později. Čeká na `document.fonts.ready`. |
| Scroll reveal | IntersectionObserver při 10 %, sourozenci po 70 ms, jednou. Prvky nad ohybem se neskrývají. |
| Dlaždice | Po najetí myší se dlaždice otočí o 90° (800 ms). Každých 2,6 s se sama otočí jedna náhodná. |
| Grafika projektu | Pomalý posun a přiblížení obrázku (22 až 26 s, tam a zpět) jako zástupce video smyčky. |
| Ukázkové věty ve formuláři | Technika z `global.js`: průhledná vrstva nad textarea píše a maže ukázkové věty. Zmizí po kliknutí nebo psaní. Věty jsou nové a obecné. |
| FAQ | Nativní `details` s `name` (otevřená jen jedna). Plynulá výška přes `::details-content`. |
| Skrývání navbaru | Schová se po 40 px scrollu dolů (od 120 px), vrátí se po 30 px nahoru. Otevřené menu ho drží. |

## Výkonnostní rozpočet

Webflow vždy načte jQuery a webflow.js. Proto je rozpočet na vlastní kód přísný.

| Položka | Rozpočet |
|---|---|
| Vlastní CSS | ≤ 12 kB gzip, jeden soubor z jsDelivr |
| Vlastní JS | ≤ 6 kB gzip, `defer`, bez knihoven |
| Písma | ≤ 150 kB, 3 soubory woff2 (subset latin + latin-ext), preload 2 |
| Obrázek LCP | ≤ 100 kB, na mobilu ≤ 60 kB, AVIF nebo WebP |
| Celková váha stránky (mobil) | ≤ 900 kB |
| LCP / CLS / TBT | ≤ 2,0 s / ≤ 0,02 / ≤ 150 ms |
| Třetí strany | jen GTM, GA4 a Clarity po souhlasu |

## Kontrola bran

- D01: viz historie souboru. D02: výsledky bran c, d a h jsou v PR k issue #43 a v `D02-zmeny.md`.
- Snímky 1440 a 390 px všech 4 stránek: `docs/web-v2/navrh/snimky/`.

## Co chybí (`[DOPLNIT]`)

Seznam je v `D02-zmeny.md`. Ceny a hodnocení Google se nedoplňují (rozhodnutí 30. 9.).

## Pro S01 (stavba ve Webflow)

- Proměnné vytvořit podle tabulek tokenů. Fluidní hodnoty jako `clamp()` v proměnných.
- Komponenty stavět nativně s props a variantami podle tabulky výše. Hlavička sekce a Tlačítko jsou vnořené komponenty.
- Vlastní CSS a JS jen na interakce, které Webflow Interactions neumí levně: roll textu tlačítka, odhalení řádků, otáčení dlaždic, ukázkové věty a předvyplnění formuláře, kalendář po odeslání. Zdroj v `site/webflow/v2/`, build přes `build.py`.
- Náhled `docs/web-v2/navrh/index.html` je referenční vzhled. Rozdíl oproti němu je chyba (brána e).
