# D01: Design systém a knihovna komponent v2

_Session D01 · 30. 9. 2026 · issue #13 · náhled: https://claude.ai/artifact/3rGAWQ952JovDCbNPHzFM1 · kopie náhledu: `docs/web-v2/navrh/index.html`_

## Rozhodnutí pro Lukáše

Stačí odpovědět ano/ne v issue #13. U každé otázky je doporučení.

| # | Otázka | Doporučení | Proč |
|---|---|---|---|
| 1 | Přidáme do formuláře nepovinné pole **Orientační rozpočet** (výběr z pásem)? | **Ano** | Lepší poptávka = klient má rozpočet. Pole je nepovinné, takže nesníží počet odeslání. Znamená to úpravu Make scénáře a pásma od tebe. V knihovně je jako varianta „S rozpočtem“. |
| 2 | Hero homepage rozdělíme na **3 rozcestníky podle cílovky** (firmy, startupy, agentury)? | **Ano** | Každá cílovka hned vidí svou cestu. Je to princip Halo Lab G3 a přímo podporuje prioritu cílovek ze zadání. |
| 3 | Každá stránka služby končí **velkou modrou plochou s formulářem** a jinde modré plochy nepoužíváme? | **Ano** | Jediná sytá plocha na stránce táhne oko k poptávce. Zbytek zůstává bílý a klidný (premium flat). |
| 4 | Schvaluješ **podpisové sekce**: Srovnání (Webflow vývoj), Před a po (UX audit), Pro koho to je (Vývoj MVP)? | **Ano** | Každá nese hlavní argument služby. U MVP navíc „Kdy to není pro vás“, což odfiltruje nevhodné poptávky. |
| 5 | Necháme dvě výraznější interakce: **odhalení řádků nadpisu** a **náhled projektu u kurzoru** v seznamu projektů? | **Ano, jen desktop** | Obě stojí jen transform a opacity, na mobilu a při reduced motion se vypnou. Dávají webu „Halo Lab“ pocit bez těžkých knihoven. |

## Jak náhled číst

- Lišta nahoře je mimo design webu. Přepíná stránky **Homepage, Webflow vývoj, UX audit, Vývoj MVP, Komponenty** a šířku **Okno, 1440, 390**.
- **Názvy komponent** obtáhne každou sekci a ukáže název komponenty a variantu. Podpisové sekce mají tmavý štítek.
- Pod lištou je **pořadí sekcí** aktuální stránky. Podpisová sekce má hvězdičku.
- **Bez animací** ukáže stav pro `prefers-reduced-motion`.
- Žluté štítky `[DOPLNIT: …]` jsou chybějící fakta. Nic z toho není vymyšlené.
- Texty jsou pracovní. Finální texty napíše T02.

## Složení stránek

Stejné komponenty, jiné pořadí. Pořadí se řídí tím, čeho se zákazník dané služby bojí nejvíc (princip Halo Lab).

| # | Homepage | Webflow vývoj (začíná výsledkem) | UX audit (začíná důkazy) | Vývoj MVP (začíná problémy) |
|---|---|---|---|---|
| 1 | Hero: Home (3 rozcestníky) | Hero: Služba, obrázek | Hero: Služba, karta nálezů | Hero: Služba, obrázek |
| 2 | Logo strip: Marquee | Seznam projektů: 3 karty + Čísla | Čísla | Časté problémy |
| 3 | Statement | Seznam služeb: Akordeon | Reference: Citace | Seznam služeb: Akordeon |
| 4 | Seznam služeb: Rozcestník | **★ Srovnání** | Časté problémy | **★ Pro koho to je** |
| 5 | Seznam projektů: Seznam | CTA malé | **★ Před a po** | Postup: Časová osa |
| 6 | Proč s námi | Postup: Kroky (5) | Seznam služeb: Číslované výstupy | Seznam projektů: Seznam |
| 7 | Reference: Odznaky + citace | Reference: Odznaky | Postup: Kroky (4) | Proč s námi |
| 8 | Postup: Kroky (4) | FAQ | Seznam projektů: 3 karty | FAQ |
| 9 | FAQ | CTA velké | FAQ | CTA velké |
| 10 | CTA velké | | CTA velké | |

**Vynechané sekce:** Webflow vývoj nemá Časté problémy ani Proč s námi. UX audit nemá Logo strip ani Proč s námi. MVP nemá Logo strip, Čísla ani Reference (zatím pro MVP nemáme ověřené důkazy).

**Oproti sitemapě z Relume:** na homepage přibyl Seznam služeb jako rozcestník (10 služeb se jinak nedá rychle najít) a Postup. Sekci „Why Can You Trust Us“ jsme spojili s Referencemi, dokud nemáme víc důkazů. Konečné rozhodnutí o struktuře dělá T01.

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
- Stíny nepoužíváme. Plochy oddělují tón a 1px linka.
- Gradient jen jako maska okraje marquee. Nikde jinde.

### Typografie

| Styl | Písmo | Velikost (390 → 1440 px) | Řádkování / prostrkání |
|---|---|---|---|
| H1 domů | Bricolage Grotesque 600 | `clamp(2.625rem, .9rem + 5.4vw, 6rem)` | 1,0 / -0,045em |
| H1 služba | Bricolage Grotesque 600 | `clamp(2.375rem, 1rem + 4.3vw, 4.9rem)` | 1,04 / -0,035em |
| H2 sekce | Bricolage Grotesque 600 | `clamp(2rem, 1rem + 2.9vw, 3.5rem)` | 1,08 / -0,03em |
| H3 | Bricolage Grotesque 600 | `clamp(1.375rem, 1.05rem + 1vw, 2rem)` | 1,15 / -0,02em |
| H4, název karty | Bricolage Grotesque 600 | `clamp(1.125rem, 1rem + .45vw, 1.375rem)` | 1,25 |
| Perex | Instrument Sans 400 | `clamp(1.125rem, 1rem + .45vw, 1.375rem)` | 1,5 |
| Text | Instrument Sans 400 | 1rem až 1,0625rem | 1,6 |
| Malý text | Instrument Sans 400 | 0,875rem | 1,5 |
| Štítek, eyebrow | IBM Plex Mono 500 | 0,75rem, verzálky | +0,08em |

- Nadpisy `text-wrap: balance`, text `text-wrap: pretty`.
- Zvýraznění v nadpisu je modrá barva (`span.hl`), ne jiný řez ani kurzíva.
- V náhledu jsou škály v jednotkách `cqi` (šířka rámu). Ve Webflow se přepíšou na `vw`.

### Mezery, radiusy, vrstvy

| Token | Hodnota |
|---|---|
| `--s-1` až `--s-10` | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px (v náhledu zapsané přímo v rem, ve Webflow jako proměnné) |
| `--sec-y` (odsazení sekce) | `clamp(4rem, 2.4rem + 6vw, 8.5rem)` |
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
| Tlačítko | Primární, Sekundární, Bílé (na modré); velikost M (52 px), S (44 px); s kolečkem a bez | výchozí, hover (text odroluje, šipka se vymění), focus (2px ring), stisk, odesílání, neaktivní | Text, Odkaz, Ikona (Visibility) |
| Odkaz | Kreslený, Podtržený (v textu), Se šipkou | hover | Text, Odkaz |
| Štítek | Neutrální, Modrý, Plný, S tečkou | | Text |
| Hlavička sekce | Vlevo, Rozdělená | | Eyebrow, Nadpis H2, Perex (Visibility), Odkaz (Visibility) |
| Pole formuláře | Input, Textarea, Select | výchozí, hover, focus, chyba, neaktivní | Label, Placeholder, Nápověda |
| Karta | Obsahová, Odkaz, Na šedé ploše | hover (linka Ink) | Ikona, Nadpis, Text |

## Sekční komponenty

Každá sekce je jedna komponenta Webflow. Třídy podle Client-First, např. `section_hero`, `hero_component`, `hero_heading`.

| Komponenta | Varianty | Props | Poznámka |
|---|---|---|---|
| Navbar | Výchozí, Mobil | Odkazy ×3, CTA text a odkaz, mega menu (slot) | Sticky, schová se při scrollu dolů. CTA drží `#kontakt` kvůli GTM. |
| Mega menu Služby | | 3 sloupce (Weby, Produkty, Značka) + promo karta | Hover na desktopu, klik všude, Esc zavře. |
| Footer | | Sloupce odkazů, štítky důvěry, právní odkazy | Obsahuje `/osobni-udaje` a `[data-wk-cookies]`. |
| Hero | Home (3 rozcestníky), Služba (vizuál obrázek / karta) | Eyebrow, H1 (rich text), Perex, Důkaz 1 a 2, Primární CTA, Sekundární CTA, Vizuál | H1 vždy s klíčovým slovem služby. |
| Logo strip | Marquee, Statický | Popisek, Loga (slot) | Marquee se zastaví při hoveru. |
| Statement | Výchozí | Eyebrow, Výrok (rich text, `span.dim`), CTA, Poznámka | Jen homepage a O nás. |
| CTA malé | Modrá plocha, Linka | Nadpis, Text, CTA | Nadpis je otázka nebo konkrétní nabídka. |
| CTA velké | S formulářem | Nadpis, Perex, Fakta ×3, Kontakt, Formulář | Vždy poslední sekce, `id="kontakt"`. Nadpis pro každou službu jiný. |
| Seznam projektů | 3 karty, Seznam s náhledem | Hlavička, Zdroj CMS, Limit, Výsledek (Visibility), Čísla (Visibility) | Jedno CMS Projekty, filtr přes Switch. |
| Seznam služeb | Akordeon s „Tohle potřebuju“, Rozcestník, Číslované výstupy | Položky, Text tlačítka, Náznak | „Tohle potřebuju“ předvyplní pole `co-resite`. |
| Čísla | Samostatně, Pod projekty | Číslo ×3, Popisek ×3 | Bez ověřených čísel se vynechá. |
| Časté problémy | Šedá plocha, Bílá | Otázka, Odpověď, Řešení ×3, CTA | Karta končí tím, co s problémem uděláme. |
| Proč nám věřit | Výchozí | Citace, Autor, Důkazy ×2 | Pro O nás a dražší služby. |
| Postup | Kroky (3 až 6), Časová osa | Kroky (název, popis, výstup), Štítek 1. kroku, Týden, CTA | První krok nese štítek „Nezávazně“. |
| Proč s námi | 6 důvodů | Důvod ×6 (ikona, nadpis, text) | Nadpisy se mění podle služby. |
| Reference | Odznaky, Citace, Odznaky + citace | Webflow Partner, Google skóre a počet, Citace, Jméno, Role | |
| FAQ | Výchozí | Nadpis, Otázky (5 až 8) | Vždy cena a termín. FAQPage JSON-LD shodné s textem. |
| Ukázka projektu | Pro `/nase-prace` | Obrázky ×3, Štítky, Klient, Délka, Výsledek, Výzva, Řešení, Výsledek, Citace | |
| Kontaktní formulář | Základní, S rozpočtem (návrh) | Placeholder, Text tlačítka | Pevná ID `co-resite`, `name`, `firma`, `email`, název „Poptávka z homepage“. |
| Podpis: Srovnání | Webflow vývoj | Sloupce ×3, Řádky, Poznámka | Tabulka s vodorovným scrollem na mobilu. |
| Podpis: Před a po | UX audit | Obrázek před, Obrázek po, Nálezy, Úpravy | Ovládá se posuvníkem (range input, jde i klávesnicí). |
| Podpis: Pro koho to je | Vývoj MVP | Persona ×3 (ikona, nadpis, text, seznam, CTA), Kdy to není pro vás | |

## Interakce

Všechno ve vanilla JS a CSS, bez knihoven. Při `prefers-reduced-motion` se vypne.

| Interakce | Jak funguje |
|---|---|
| Text tlačítka se odroluje, šipka v kolečku | Text je v DOM jednou, kopie přes `::after` s `attr(data-t)`. `translateY(-100%)`, 300 ms. Šipka vyjede doprava a klon přijede zleva. |
| Podtržení odkazu | `background-size` z 0 na 100 %, kreslí se zleva a odchází doprava. 500 ms, ease-draw. |
| Odhalení řádků nadpisu | Slova se obalí do `span.w`, seskupí se podle `offsetTop` do řádků, každý řádek o 80 ms později. Čeká na `document.fonts.ready`. |
| Scroll reveal | IntersectionObserver při 10 %, sourozenci po 70 ms, jednou. Prvky nad ohybem se neskrývají, nadpis nad ohybem se jen jemně posune bez zprůhlednění. |
| Hover karty projektu | Obrázek `scale(1.035)` za 800 ms, vyjede štítek „Zobrazit projekt“, šipka se posune. |
| Náhled u kurzoru | V seznamu projektů náhled sleduje kurzor (lerp přes requestAnimationFrame). Jen jemný ukazatel, na dotyku se místo něj ukáže miniatura. |
| FAQ | Nativní `details` s `name` (otevřená jen jedna). Plynulá výška přes `::details-content`, kde to prohlížeč umí. |
| Marquee log | CSS `translateX(-50%)`, 38 s, pauza při hoveru a tlačítko „Zastavit pohyb“ (WCAG 2.2.2). |
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

- **c (texty):** žádná zakázaná vata, žádné „—“ ani „·“ ve webových textech, fakta jako `[DOPLNIT]`. Hlas „my“, vykání.
- **d (review):** nezávislá kontrola našla 20 bodů. Opraveno: akordeon (`inert`, nadpis mimo tlačítko), odeslání formuláře jako `button`, chyby přes `aria-describedby`, návrat fokusu z menu, pauza marquee, únik posluchačů, H1 nad ohybem se neskrývá, neoznačená fakta, nadpisy bez slovesa, žargon.
- **h (přístupnost):** axe-core 4 (WCAG 2.2 AA, včetně `target-size`) na všech 5 obrazovkách v šířce 1440 i 390: **0 chyb**. Kontrast AA, klikací plochy ≥ 24 px, konzole bez chyb, reduced motion vypne animace.
- Snímky 1440 a 390 px všech 4 stránek: `docs/web-v2/navrh/snimky/`.

## Co chybí (`[DOPLNIT]`)

- Hodnocení a počet recenzí na Google, úroveň Webflow partnerství a odkaz na profil.
- Počty projektů, let s Webflow, výsledky projektů ELDR, CRR, Anse a Arbosis.
- Ceny (od kolika), délky projektů, doba odpovědi na poptávku, délka prvního hovoru.
- Podpora po spuštění, podmínky předání kódu, NDA.
- Citace klientů se jménem a rolí, skutečné snímky před a po auditu.
- Pásma rozpočtu (pokud schválíš otázku 1).
- E-mail studia, IČ, LinkedIn.

## Pro S01 (stavba ve Webflow)

- Proměnné vytvořit podle tabulek tokenů. Fluidní hodnoty jako `clamp()` v proměnných.
- Komponenty stavět nativně s props a variantami podle tabulky výše. Hlavička sekce a Tlačítko jsou vnořené komponenty.
- Vlastní CSS a JS jen na interakce, které Webflow Interactions neumí levně: roll textu tlačítka, odhalení řádků, náhled u kurzoru, předvyplnění formuláře. Zdroj v `site/webflow/v2/`, build přes `build.py`.
- Náhled `docs/web-v2/navrh/index.html` je referenční vzhled. Rozdíl oproti němu je chyba (brána e).
