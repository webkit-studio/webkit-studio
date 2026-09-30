# D02: Redesign návrhu podle zpětné vazby

_Session D02 · 1. 10. 2026 · issue #43 · náhled: https://claude.ai/artifact/3rGAWQ952JovDCbNPHzFM1 · kopie: `docs/web-v2/navrh/index.html` · snímky: `docs/web-v2/navrh/snimky/`_

## TL;DR

- **Simple:** 16 komponent místo 21, skoro žádné rámečky, žádné štítky nad sekcemi, žádné ikony v kolečkách. Sekce oddělují jen linky a bílé místo.
- **Homepage je obecná.** Hero, statement, FAQ ani závěrečné CTA neobsahují slovo „web“ (kromě názvů služeb). Buduje důvěru, služby vysvětlují až jejich stránky.
- **Texty podle Halo Lab:** krátké H1 se slibem, karty s nadpisem na 2 až 4 slova a jednou větou, problémy jako otázky zákazníka, přímá CTA.
- **Zakázané věci jsou pryč:** ceny, audit s pevnou cenou, „jeden člověk“, hodnocení Google, pole rozpočet a termín.
- **Grafika:** jediný grafický doplněk jsou dlaždice ze symbolu loga (čtvrtkruhy), které se po najetí otočí. Fotky obsahu nejsou, výjimky jsou projekty a fotka Lukáše v CTA.

## Na Lukášovi (ano/ne)

| # | Otázka | Doporučení |
|---|---|---|
| 1 | Pod formulářem je jen „Ozveme se do 24 hodin.“ Stačí odkaz **Osobní údaje** v patičce, nebo chceš pod tlačítko vrátit drobný odkaz na zpracování údajů? | **Vrátit drobný odkaz.** Informační povinnost podle GDPR je bezpečnější splnit přímo u formuláře. Teď je podle zadání odstraněný. |
| 2 | Nápis v logu je vysázený písmem **Instrument Sans 600** podle OG obrázku ve Webflow (symbol je přesný vektor). Je to správné písmo? | Když ne, pošli SVG loga a S01 ho použije. |
| 3 | Seznam 8 služeb je v hero (řádek odkazů jako Halo Lab) **i** v sekci Služby (2 sloupce po 4). Nechat obojí? | **Ano.** Hero dává rychlý rozcestník, sekce Služby vysvětluje každou službu jednou větou. |

## Zpětná vazba → co se změnilo

### Globální pravidla

| Bod zpětné vazby | Co se změnilo | Kde to vidíte |
|---|---|---|
| Simple, začít minimem | Karty bez rámečků, jen linka nahoře. Pryč: logo strip, čísla, malé CTA, „Proč nám věřit“, akordeon, rozcestník se 3 kategoriemi, náhled u kurzoru, mega menu s kategoriemi. | Všechny stránky, Komponenty → Vyřazené z D01 |
| Žádné štítky (eyebrow) nad sekcemi | Hlavička sekce má jen H2 a volitelný perex. Komponenta Eyebrow neexistuje. | Všechny sekce |
| Texty skoro 1:1 Halo Lab | H1 na 7 až 9 slov se slibem nebo termínem. Karty: nadpis 2 až 4 slova, jedna věta. Problémy jako otázky („Nevíte, co opravit dřív?“). H2 s číslem („6 kroků od prvního hovoru po spuštění“, „3 důvody, proč web nepřináší poptávky“). Závěrečné CTA ve tvaru „Pojďme…“. | Všechny stránky |
| Tah na branku (pixelmate) | CTA jsou slovesa: „Probrat projekt“, „Chci audit“, „Probrat nápad“. Přímé věty: „Řekneme na rovinu, jestli vám umíme pomoct.“, „Po předání nezmizíme.“ | Postup, FAQ, CTA |
| Obrázky jen jako grafické doplňky | Jediný doplněk: dlaždice ze symbolu loga. Interaktivní: po najetí se dlaždice otočí, samy se pomalu přetáčejí, při omezeném pohybu stojí. | Hero všech stránek, Komponenty → Grafický doplněk |
| Výjimka: portfolio a fotka Lukáše | Velké grafiky projektů v Naše práce, kulatá fotka v CTA. Nic jiného. | Naše práce, CTA |
| Zákaz cen | Žádná částka, rozpětí ani „od“. FAQ o ceně zmizela. Tarif Webflow ze srovnání pryč. | Grep v HTML: 0 výskytů |
| Zákaz auditu s pevnou cenou | Audit je samostatná služba. „Co s reportem uděláte dál, je na vás.“ „Rozhodnutí je na vás.“ | UX audit |
| Zákaz „jeden člověk“ | Pryč ze statementu i z důvodů. Místo toho „Jeden dodavatel na všechno“. | Homepage → Proč s námi |
| Hodnocení Google skryté | Sekce Reference má jen citaci a Webflow Partner. | Homepage, Webflow vývoj |
| Pole rozpočet a termín | Nejsou. Varianta „S rozpočtem“ vyřazená. | Formulář |
| Fakta: 30+ projektů, web 4–8 týdnů, odpověď do 24 hodin | 30+ ve statementu a důvodech. 4 až 8 týdnů jen na stránce Webflow vývoj (hero, postup, FAQ). 24 hodin pod formulářem, v FAQ a v důvodech. | Homepage, Webflow vývoj |
| Kontakt jen `inbox@webkit.studio` | V CTA („Radši e-mail?“) a v patičce. Nikde jinde žádný kontakt. | CTA, Footer |

### Homepage

| Bod zpětné vazby | Co se změnilo |
|---|---|
| Hero bez segmentů, seznam služeb jako Halo Lab | 3 rozcestníky podle cílovky jsou pryč. H1 „Designové a vývojové studio, se kterým firmy rostou“, perex, CTA a pod tím řádek 8 služeb jako odkazy. |
| Hero nesmí být o webech | H1 ani perex neobsahují „web“. Mluví o designu, vývoji a značce obecně. |
| Jak pracujeme: hodnoty, ne o jednom webu, bez „jeden člověk“, hlavní CTA | Statement „Dobrý výsledek nezačíná designem ani kódem…“ + 3 hodnoty (Nejdřív cíl, pak řešení / Mluvíme lidsky / Dotáhneme to do konce) + tlačítko „Probrat projekt“. |
| Služby: 8 ve 2 sloupcích po 4, bez kategorií, pořadí podle Lukáše | Levý sloupec: Tvorba webových stránek, Webflow vývoj, Redesign webu, Landing page. Pravý: UX audit, Vývoj MVP, Vývoj webových aplikací, Vizuální identita. Pod tím odkaz pro agentury. |
| Stránka pro agentury v navigaci a patičce | „Pro agentury“ v hlavní navigaci, v mobilním menu a ve sloupci Studio v patičce. |
| Naše práce ve stylu Relume portfolio-17 | ELDR, CRR a Arbosis. Velká grafika přes celou šířku, bez rámečku. Na ní klient, co jsme udělali, jedno číslo `[DOPLNIT]` a štítky. Grafika se pomalu posouvá jako zástupce za video smyčku. Na mobilu je text pod grafikou kvůli čitelnosti. |
| Proč s námi bez štítku | 6 důvodů, nadpis „6 důvodů, proč s námi firmy pracují“, bez ikon a rámečků. |
| Reference bez Google, Webflow Partner `[DOPLNIT]` | Citace `[DOPLNIT]` + Webflow Partner s odkazem `[DOPLNIT: odkaz na profil]`. |
| Postup: 6 kroků, univerzální | Úvodní hovor (Nezávazně), Plán a termín, Workshop, Návrh řešení, Vývoj a spuštění, Po spuštění (`[DOPLNIT: rozsah péče]`). Struktura podle launchkitdesign: krátký název, co se stane, věta, která bere obavu. |
| FAQ obecné, s „Ozveme se do 24 hodin“ | 5 otázek o spolupráci, žádná o webech. První odpověď: „Ozveme se do 24 hodin. Po odeslání formuláře si můžete rovnou vybrat termín hovoru.“ |
| Závěrečné CTA obecné, ne „co má web dokázat“ | „Pojďme váš projekt rozjet“. Fotka Lukáše, slabě „Lukáš Svoboda, Studio Lead“ a LinkedIn `[DOPLNIT: URL]`. |
| Formulář | Co řešíte (ukázkové věty se přepisují), Jméno, Firma (povinné), E-mail. Pod tlačítkem jen „Ozveme se do 24 hodin.“ |
| Po odeslání rezervační kalendář | Stav „Díky, máme to. Vyberte si termín hovoru.“ s výběrem dne a času. Rezervace je na zákazníkovi: „Když si nevyberete, ozveme se sami.“ |
| Patička: velké skutečné logo | Symbol loga jako přesný vektor + nápis Webkit.Studio přes celou šířku. Nápis podle OG obrázku (viz otázka 2). |

### Stránky služeb

| Bod zpětné vazby | Co se změnilo |
|---|---|
| Texty skoro 1:1 přístupem Halo Lab | Stejná logika jako Halo Lab G2: problémy jako otázky → co dostanete → podpisová sekce → postup → FAQ → CTA. Délky podle Halo Lab (karty 1 věta, problémy 2 věty). |
| Žádné obrázky obsahu | Hero má místo obrázku projektu dlaždice ze symbolu. Karta nálezů v hero auditu zmizela. |
| Nejjednodušší komponenty, méně rámečků | Srovnání bez rámečku tabulky, problémy a persony jen s linkou nahoře, „Co dostanete“ jako seznam s čísly. |
| UX audit nezačíná důkazy | Pořadí: Hero → Kdy vám audit pomůže (problémy) → Před a po (jasně označené jako ilustrace) → Co dostanete → Postup → FAQ → CTA. Čísla, citace ani projekty na stránce nejsou. |
| Jiné pořadí sekcí + jedna podpisová sekce | Viz tabulka níže. |

## Složení stránek

| # | Homepage | Webflow vývoj (začíná volbou platformy) | UX audit (začíná problémem) | Vývoj MVP (začíná tím, pro koho je) |
|---|---|---|---|---|
| 1 | Hero: Home | Hero: Služba | Hero: Služba | Hero: Služba |
| 2 | Statement | **★ Srovnání** | Časté problémy | **★ Pro koho to je** |
| 3 | Seznam služeb: 2 sloupce | Co dostanete | **★ Před a po** | Časté problémy |
| 4 | Naše práce (3) | Naše práce (1) | Co dostanete | Co dostanete |
| 5 | Proč s námi | Postup (6) | Postup (5) | Postup (6) |
| 6 | Reference | Reference (jen citace) | FAQ | FAQ |
| 7 | Postup (6) | FAQ | CTA s formulářem | CTA s formulářem |
| 8 | FAQ | CTA s formulářem | | |
| 9 | CTA s formulářem | | | |

**Proč pořadí služeb takhle:** levý sloupec jsou weby od nejčastější poptávky (tvorba webu) po nejmenší produkt (landing page). Pravý sloupec jde od diagnózy (audit) přes produkt (MVP, aplikace) ke značce. Návrh z issue sedí, jen ho dělíme na dva sloupce, aby se četl bez kategorií.

## Co chybí (`[DOPLNIT]`)

- Jedno číslo výsledku u každého projektu (ELDR, Anse, Arbosis).
- Citace klienta se jménem, rolí a firmou.
- Odkaz na profil Webflow Partner, LinkedIn Lukáše, IČ.
- Délka UX auditu a obvyklá délka MVP.
- Rezervační nástroj pro kalendář po odeslání formuláře.
- Běží ELDR na Webflow? Pokud ne, na stránce Webflow vývoj ho nahradí jiný projekt.
- Grafika projektu Anse bez částek v Kč a jmen. Do té doby Anse v náhledu není a stránka MVP nemá sekci Naše práce.
- Co přesně děláme po spuštění (krok 6 postupu).

## Kontrola

| Brána | Výsledek |
|---|---|
| c: texty (grep ve vykresleném textu 4 stránek) | 0 výskytů: Kč, cena, „od“ s částkou, „jeden člověk“, Google, hodnocení, rozpočet, eyebrow, odečet, zakázaná vata, „—“ a „·“. Jediný e-mail `inbox@webkit.studio`. Slovo „rozpočet“ je jen v knihovně v seznamu vyřazených komponent. |
| Homepage bez „web“ | Hero (bez řádku služeb), statement, FAQ a CTA: 0 výskytů mimo Webkit.Studio. |
| d: review | Nezávislý subagent (skeptický majitel firmy + Lukáš, který chce simple): 38 nálezů. Opraveno 31, mimo jiné: grafika Anse s částkami v Kč pryč, sliby péče po spuštění jako `[DOPLNIT]`, sliby pozic ve vyhledávání pryč, pořadí sekcí auditu a MVP se liší, nadpisy problémů sedí na otázky, žargon SEO a WCAG vysvětlený, řádek služeb v hero bez rámečků, menší dlaždice na mobilu, „Například:“ před ukázkovou větou, Webflow Partner jen jednou na stránce Webflow. Neopraveno záměrně: „Studio Lead“ (zadání Lukáše), H1 homepage jako identita studia (styl Halo Lab), Webflow Partner na homepage (zadání), bílá karta formuláře na modré (kontrast polí). |
| h: přístupnost | axe-core 4 (WCAG 2.2 AA včetně `target-size`) na 4 stránkách a knihovně v šířce 1440 i 390: **0 chyb**. Konzole bez chyb. Reduced motion vypne animace, dlaždice stojí, ukázková věta je statická. |
