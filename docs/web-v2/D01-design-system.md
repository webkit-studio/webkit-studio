# D01: Design systém a knihovna komponent v2

_Session D01 · 30. 9. 2026 · issue #13 · aktualizace D02 · 1. 10. 2026 · issue #43 · aktualizace D03 · 14. 10. 2026 · issue #52 · náhled: https://claude.ai/artifact/3rGAWQ952JovDCbNPHzFM1 · kopie náhledu: `docs/web-v2/navrh/index.html`_

## Stav po D03

- **D03 (14. 10. 2026, issue #52) přidal šťávu.** Barevné bloky, velký statement a medium text místo seznamů, nové interakce, konverzní flow. Náhled má jen Homepage, Webflow vývoj (vzorová produktová stránka) a Komponenty. Co a proč: `docs/web-v2/D03-zmeny.md`.
- Pravidlo „jedna sytě modrá plocha“ je zrušené (rozhodnutí 14. 10.). Platí pravidla barevných bloků níže.

## Stav po D02

- **D02 (1. 10. 2026, issue #43) přepsal návrh podle zpětné vazby.** Tokeny, písma a modrá zůstávají. Změnily se komponenty, texty a typová škála nadpisů. Co a proč: `docs/web-v2/D02-zmeny.md`.
- Otázky z D01 rozhodl Lukáš 30. 9. (`docs/decisions.md`): pole rozpočet ne, rozcestníky podle cílovky ne, jedna modrá plocha (CTA) ano, podpisové sekce ano, náhled u kurzoru vyřazen.

## Jak náhled číst

- Lišta nahoře je mimo design webu. Přepíná **Homepage, Webflow vývoj, Komponenty** a šířku **Okno, 1440, 390**.
- **Názvy komponent** obtáhne každou sekci a ukáže název komponenty a variantu. Podpisové sekce mají tmavý štítek.
- Pod lištou je **pořadí sekcí** aktuální stránky s barvou bloku. Podpisová sekce má hvězdičku, skrytá sekce je přeškrtnutá.
- **Bez animací** ukáže stav pro `prefers-reduced-motion`.
- Žluté štítky `[DOPLNIT: …]` jsou chybějící fakta. Nic z toho není vymyšlené.
- Tečkovaně podtržený text je návrh, který potvrdí Lukáš (délky kroků, nástroje).

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
| `--c-blue-on-dark` | `#8FA8FF` | zvýraznění na ink bloku | 8,4:1 na ink |
| `--c-tint` | `#EEF2FF` | blok Tón (statement, postup) | |
| `--c-tint-line` | `#D3DCFA` | linky na bloku Tón | |
| `--c-ink-soft` | `#161A30` | první karta projektu na ink | |
| `--c-blue-deep` | `#0B1170` | druhá karta projektu | bílá 15,8:1 |
| `--c-success` | `#0B7A48` | potvrzení | |
| `--c-error` | `#C0261B` | chyby formuláře | |
| `--c-on-blue`, `--c-on-blue-2` | `#FFFFFF`, bílá 78 % | text na modré ploše | |
| `--c-on-ink-2`, `--c-line-on-dark` | bílá 70 %, bílá 14 % | druhotný text a linky v patičce | |
| `--c-warn-bg`, `--c-warn-ink` | `#FFF4D6`, `#6B4A00` | jen štítky `[DOPLNIT]` v návrhu, na webu nebudou | |

**Pravidla barev**
- Text je vždy Ink, Ink 2 nebo Ink 3. Na modré jen bílá. Všechny kombinace splňují AA.
- Modrá znamená akci nebo zvýraznění. Nikdy velké plochy textu.
- **Barevné bloky (D03):** každá sekce má variantu Blok: Bílá, Tón, Ink, Modrá. Dva stejné bloky nikdy vedle sebe. Nejvýš dvě modré plochy na stránce (Reference a CTA), mezi nimi jiný blok.
- Rytmus homepage: bílá → tón → bílá → ink → bílá → modrá → tón → (FAQ skryté) → modrá → ink. Webflow vývoj: bílá → tón → ink → bílá → ink → modrá → tón → bílá → tón → modrá → ink.
- Na ink a modré je text bílý. Zvýraznění na ink je `--c-blue-on-dark`, na modré podtržená bílá.
- Světlé odstíny modré jsou posunuté k chladné modré (odstín kolem 225°), aby nepůsobily fialově.
- Stíny jen u plovoucích prvků: formulář na modré, ukázka projektu, karta projektu při překrytí. Rámečky kolem karet nepoužíváme. Důvody mají plnou plochu bez rámečku.
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
| Čip | Výchozí, Vybraný | hover, vybraný | Text. Jen v dotazníku a kalendáři. Štítky u projektů jsou zrušené (D03). |
| Odznak partnera | Webflow | hover | Logo, Text, Odkaz |
| Hlavička sekce | Nadpis sám, Nadpis + perex vpravo | | Nadpis H2, Perex (Visibility). **Bez eyebrow.** |
| Pole formuláře | Input, Textarea s přepisujícími se ukázkami | výchozí, hover, focus, chyba | Label, Ukázkové věty |
| Pole dlaždic (D03) | Home, Služba | natáčí se ke kurzoru, vlna bez myši, stojí při omezeném pohybu | Canvas ve vlastním JS. Ve Webflow jen prázdný `div` s atributem `data-field`. |

## Sekční komponenty

Každá sekce je jedna komponenta Webflow. Třídy podle Client-First, např. `section_hero`, `hero_component`, `hero_heading`. Každá má variantu **Blok** (Bílá, Tón, Ink, Modrá). Webflow vývoj je vzorová stránka se všemi komponentami. Sloupec „Na jiné službě“ říká, co se jinde mění.

| Komponenta | Varianty | Props | Blok | Na jiné službě |
|---|---|---|---|---|
| Navbar | Výchozí, Mobil | Odkazy (Služby, Naše práce, O nás), CTA text | bílá | Beze změny. Pro agentury jen v patičce. CTA drží `#kontakt` kvůli GTM. |
| Hero | Home, Služba | H1 (rich text), Perex, CTA, Slib „Ozveme se do 24 hodin“, Fakta 5+ a 30+, Odznak partnera (Visibility), Pole dlaždic, Loga klientů (Visibility) | bílá | Text: H1, perex, CTA. Argument: odznak jen u webových služeb. |
| Statement | S body, Bez bodů, Závěrečný | Výrok (rich text, `span.hl` modře), Bod ×3 (Visibility), CTA (Visibility) | tón | Argument: výrok o hlavní obavě zákazníka služby. Body jen homepage. |
| Seznam služeb | 2 sloupce po 4 | Nadpis, Perex s odkazem na formulář, Služba ×8 | bílá | Jen homepage a stránka Služby. Na službách vypnuto. |
| Výroky | Velké řádky | Nadpis, Řádek ×3 až 5 (výrok, věta) | ink | Text. Nahrazuje seznam „Co dostanete“ na všech službách. |
| Podpis | Napojení (Webflow vývoj), Před a po (UX audit, redesign), Pro koho (MVP, aplikace) | podle varianty | bílá | Argument: jedna podpisová sekce na službu. Před a po a Pro koho jsou z D02, S01 je převede do stylu D03. Srovnání tabulkou je vyřazené. |
| Naše práce | Fullscreen (1 až 3 projekty) | Nadpis, Projekty z CMS: logo, výsledek ve 2 větách, odkaz na web, video MP4 + WebM + poster | ink, karty ink soft / blue deep / blue | Argument: projekty vybrané ke službě ručně (Multi-reference), ne filtrem. |
| Proč s námi | 6 důvodů s ikonami | Nadpis, Důvod ×6 (ikona, nadpis, věta) | bílá | Jen homepage. |
| Reference | Citace a partner, Jen citace | Citace, Autor, Logo firmy, Webflow partner (Visibility), Odkaz na profil | modrá | Text: citace ke službě. Partner jen u webových služeb. |
| Postup | Krok za krokem (3 až 6) | Nadpis, Perex, Krok ×n (název, věta, štítek 1. kroku), CTA | tón | Text: kroky a nadpis s termínem. Audit 5 kroků. |
| FAQ | Krátké | Nadpis, Otázka ×4 až 6 | bílá | Text. Na homepage skryté (Visibility vypnuto). FAQPage JSON-LD shodné s textem. |
| CTA s formulářem | Výchozí | Nadpis, Perex, Fotka, Jméno s osobním LinkedIn, Role, E-mail, Formulář | modrá | Text: jen nadpis a perex. Vždy poslední, `id="kontakt"`. |
| Kontaktní formulář | Krok 1 formulář, 2 kalendář, 3 dotazník, 4 hotovo | Ukázkové věty, Text tlačítka, Předvybrané téma dotazníku | v CTA | Na stránce služby je téma předvybrané. Pole `co-resite`, `name`, `firma` (povinné), `email`, název „Poptávka z homepage“. Bez rozpočtu a termínu. |
| Footer | Výchozí | Popis, E-mail, LinkedIn firmy, Služby ×8, Studio (Pro agentury), Právní odkazy | ink | Beze změny. `/osobni-udaje` a `[data-wk-cookies]`. |

**Vyřazené v D03:** řádek služeb v hero, štítky u projektů, „Jste agentura?“ v Službách, Srovnání Webflow × WordPress, seznam „Co dostanete“, dlaždice 3×3 v hero, pravidlo jedné modré plochy.

**Vyřazené z D01:** Čísla, CTA malé, Proč nám věřit, Seznam projektů (3 karty a seznam s náhledem u kurzoru), Akordeon služeb, Rozcestník služeb, Mega menu se 3 kategoriemi, Ukázka projektu (vrátí se u `/nase-prace`), hodnocení Google, eyebrow, pole rozpočet. Logo strip se vrátil v D03 jako součást hero.

## Interakce

Všechno ve vanilla JS a CSS, bez knihoven. Při `prefers-reduced-motion` se vypne.

| Interakce | Jak funguje |
|---|---|
| Text tlačítka se odroluje, šipka v kolečku | Text je v DOM jednou, kopie přes `::after` s `attr(data-t)`. `translateY(-100%)`, 300 ms. |
| Podtržení odkazu | `background-size` z 0 na 100 %, kreslí se zleva a odchází doprava. 500 ms, ease-draw. |
| Odhalení řádků nadpisu | Slova se obalí do `span.w`, seskupí se podle `offsetTop` do řádků, každý řádek o 80 ms později. Čeká na `document.fonts.ready`. |
| Scroll reveal | IntersectionObserver při 10 %, sourozenci po 70 ms, jednou. Prvky nad ohybem se neskrývají. |
| Pole dlaždic (D03) | Canvas 2D. Dlaždice v dosahu kurzoru se natočí k němu a zmenší, ostatní se vrátí. Bez myši projíždí polem pomalá vlna. Kreslí se jen ve viditelné části, DPR max 2. |
| Odhalení výroku (D03) | Slova statementu se podle scrollu rozsvěcují z 60 % do plné barvy. I v klidu drží kontrast aspoň 3 : 1 (velký text). |
| Fullscreen projekty (D03) | Karty jsou `position: sticky` na výšku obrazovky. Okraj a zaoblení klesají k nule, jak karta dojíždí nahoru. Další karta překryje předchozí. Na mobilu karty pod sebou. |
| Kurzor „Prozkoumat“ (D03) | Nad ukázkou projektu modré kolo místo kurzoru, ukázka se natočí o max. 6° k myši. |
| Krok za krokem (D03) | Aktivní krok podle scrollu: modré číslo, linka nad krokem a plná barva nadpisu, ostatní nadpisy šedé (AA). Velké číslo a ukazatel postupu jdou s ním. |
| Ikona → čtvrtkruh (D03) | Po najetí na důvod se roh ikony změní na čtvrtkruh z loga a zmodrá. |
| Tok dat (D03) | SVG linky mezi uzly, body putují přes `animateMotion`. |
| Grafika projektu | Video smyčka 20 s (MP4 + WebM + poster). V náhledu zástupná smyčka: přiblížení na 4 místa snímku. |
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

- D01 a D02: viz historie souboru. D03: výsledky bran c, d a h jsou v PR k issue #52 a v `D03-zmeny.md`.
- Snímky 1440 a 390 px homepage a Webflow vývoje: `docs/web-v2/navrh/snimky/`.

## Co chybí (`[DOPLNIT]`)

Seznam je v `D03-zmeny.md`. Ceny a hodnocení Google se nedoplňují (rozhodnutí 30. 9.).

## Pro S01 (stavba ve Webflow)

- Proměnné vytvořit podle tabulek tokenů. Fluidní hodnoty jako `clamp()` v proměnných.
- Komponenty stavět nativně s props a variantami podle tabulky výše. Hlavička sekce a Tlačítko jsou vnořené komponenty.
- Vlastní CSS a JS jen na interakce, které Webflow Interactions neumí levně: roll textu tlačítka, odhalení řádků, pole dlaždic, odhalení výroku, fullscreen projekty, kurzor, krok za krokem, tok dat, ukázkové věty, kalendář a dotazník po odeslání. Zdroj v `site/webflow/v2/`, build přes `build.py`.
- Náhled `docs/web-v2/navrh/index.html` je referenční vzhled. Rozdíl oproti němu je chyba (brána e).
