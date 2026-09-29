# Webkit.Studio v2: zadání

_Fáze 0 · potvrdil Lukáš 29. 9. 2026 (schválení plánu koordinátora)._

## Cíl

**Web, který přináší víc a lepších poptávek.** Lepší poptávka znamená, že klient ví, co chce, má na to rozpočet a hodí se k nám.

Web je nový celý. Nový je vzhled, struktura, sdělení, texty, SEO, GEO i měření. Lukáš se starými texty není spokojený. Chce jasnější texty bez AI vaty, které míří na potřebu zákazníka. Mají být profesionální, přístupné, lidské a jasné.

## Pro koho (priorita v pořadí)

1. **Malé a střední firmy.** Majitel nebo jednatel ve výrobě, službách nebo B2B. Web má zastaralý nebo žádný a potřebuje poptávky.
2. **Startupy a nové produkty.** Zakladatel s nápadem potřebuje MVP, landing page nebo webovou aplikaci a chce vidět rychlý výsledek.
3. **Agentury (white-label).** Potřebují spolehlivého dodavatele na Webflow vývoj nebo vedení projektu na subdodávku.

## Hlas

- Na webu mluví čisté **„my“ studio**, bez konkrétní osoby v popředí.
- Zákazníkovi vykáme.
- Podrobná pravidla textů jsou v `CLAUDE.md`.

## Rozsah webu

Výchozí sitemap je z Relume v souboru `docs/web-v2/sitemap-relume.csv`. **Je to výchozí bod, ne zákon.** T01 smí sekce měnit, vynechávat i přidávat a každou změnu zdůvodní.

| Stránka | Účel |
|---|---|
| `/` | Homepage |
| `/vyvoj-webovych-stranek` | Služba |
| `/design-webovych-stranek` | Služba |
| `/redesign-webovych-stranek` | Služba |
| `/webflow-vyvoj` | Služba |
| `/landing-page` | Služba |
| `/ux-audit` | Služba |
| `/vyvoj-mvp` | Služba |
| `/vyvoj-webovych-aplikaci` | Služba |
| `/vizualni-identita` | Služba |
| `/graficky-design` | Služba |
| `/nase-prace` | Ukázky projektů. Na tuhle stránku budeme odkazovat nejvíc. |
| `/kontakt` | Kontakt a poptávka |
| `/o-nas` | Zatím jen dev, `noindex` |
| `/projekt/[slug]` | Šablona CMS pro projekt |
| `/styleguide/components` | Knihovna komponent, `noindex` |

- **Projekty:** ELDR, CRR, Anse a Arbosis. Snímky jsou v `site/assets/web-*.jpg`, fakta doplní Lukáš.
- **Důkazy, se kterými počítáme:** odznak Webflow Partner a recenze na Google. Detaily doplní Lukáš.

## Princip Halo Lab

Rozbor je v `docs/web-v2/reference-halo-lab.md`.

- **Málo komponent, hodně stránek.** Stránky služeb sdílejí komponenty, ale nejsou to kopie. Pořadí sekcí se řídí tím, čeho se zákazník dané služby bojí nejvíc. Každá stránka má jednu vlastní podpisovou sekci.
- **Volitelné sekce vynecháváme**, když nemají co říct.
- **Jedno CMS projektů.** Na stránkách služeb se projekty filtrují podle služby. Teď jsou jen 4, takže se ukáže skoro „vše na všem“.
- **Stránka `/nase-prace`** obsahuje dobře popsané ukázky: výzvu, řešení, výsledek, obrázky a citaci.

## Vizuální směr

- **Premium flat.** Hlavně bílá a modrá `#1D2BE8`.
- Žádná fialová ani lilac a minimum gradientů. Stíny skoro žádné, plochy oddělují tón a 1px linky.
- **Písma zůstávají:** Bricolage Grotesque na nadpisy, Instrument Sans na text, IBM Plex Mono na štítky. Jsou self-hosted ve Webflow.
- **Hlavní je práce s textem:** typografická hierarchie a hodně prostoru.
- **Interakce jsou jemné, ale účinné.** Vanilla JS bez knihoven. Vždy respektují `prefers-reduced-motion`.
- **Výhradně nativní prvky a komponenty Webflow** s props a variantami. Relume slouží jako předloha rozvržení.

## Laťka kvality

- **Marketing, brand, konverze, prodej, věcnost a technika** se hodnotí na každé bráně.
- **SEO a GEO** jedou naplno. Podrobnosti jsou v plánu v `docs/roadmap.md` a v jednotlivých issues.
- **Měření:** GTM s consent mode v2, GA4 s konverzemi, Search Console a Clarity.
- **Lighthouse:** přístupnost, best practices a SEO musí mít 100. Výkon na mobilu aspoň 95, cíl je 100.

## KPI (T01 je upřesní v měřicím plánu)

- počet kvalifikovaných poptávek za měsíc
- konverzní poměr stránek služeb, tedy kolik návštěv skončí poptávkou
- organická návštěvnost a pozice pro klíčová slova služeb
- zmínky a citace v AI odpovědích (GEO)

## Mimo rozsah

- blog, zatím jen jako návrh plánu obsahu v B02
- anglická verze
- `tools/lead-system/`
