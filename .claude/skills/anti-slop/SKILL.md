---
name: anti-slop
description: Návrh a kontrola webu, UI, aplikace nebo dashboardu tak, aby nevypadal jako průměrný AI výstup – kontextový balík, design systém, skutečný obsah, tři směry s trade-offy, navržené stavy (prázdno, chyba, načítání, zpět), test vyměnitelnosti a ubírání. Použij vždy, když Claude navrhuje, staví nebo hodnotí jakékoli rozhraní (landing page, homepage, sekce, aplikace, dashboard, komponenta, prototyp), když Lukáš řekne „vypadá to jako AI", „generické", „slop", „udělej to prémiovější" nebo „proč to nepůsobí dobře", a před předáním UI klientovi.
---

# Anti-slop: design, který nejde zaměnit

AI dává nejpravděpodobnější řešení, tedy průměr. **Specifičnost nevznikne promptem „buď originální“. Vznikne z kontextu, z rozhodnutí a z péče o stavy, které AI vynechá.** Plná verze: uzel mapy `standardy-web-anti-slop` (načti ho, když máš Dashboard).

## Režim podle situace

| Situace | Co dělat |
| --- | --- |
| Nový návrh | Kroky 1–7 |
| Hotová věc působí genericky | Kontrola: test vyměnitelnosti, sedm znaků, stavy, pak ubrat |
| Explorace a inspirace | Volná kreativita je v pořádku, ale označ ji jako exploraci. Do zakázky jde až vybraný směr v design systému |

## Před návrhem

1. **Kontextový balík** do složky projektu: texty klienta (služby, produkty, články), skutečné fotky, co zabírá (reklamy, poptávky, recenze), fonty a barvy současného webu (DevTools, filtr `font` a `color`), 5–10 řešení stejného problému z reálných produktů. Reference slouží k pochopení vzorců, ne ke kopii.
2. **Úloha a uživatel.** Kdo přichází, co chce dokončit, co musí vidět první, která akce musí být nejsnazší. Nikdy jen „moderní dashboard“.
3. **Styl.** Design systém klienta nebo studia, u webu stylový registr (`standardy-web-registr`). **Bez design systému nezačínej, zeptej se.** Nikdy výchozí styl: krémová pozadí, fialové gradienty, kurzíva ve slovech nadpisu.
4. **Skutečný obsah.** Krátké i dlouhé varianty, skutečné množství položek. Chybí? `[DOPLNIT: co]`. Nikdy vymyšlená čísla, recenze ani klienti.

## Návrh

5. **Tři směry** s odlišnou strukturou, ne jen barvou. U každého napiš, co získá a co ztratí. Lukáš vybere.
6. **Test v prohlížeči** (Playwright): hlavní cesta, mobil 390 px, klávesnice, kontrast. Screenshoty si prohlédni sám.
7. **Uber.** U každého prvku: pomáhá uživateli? Ne → pryč. Nejtěžší krok, nevynechávat.

Mezi kroky 5–7 se vracej. Dobrý výsledek je iterace, ne jeden prompt.

## Sedm znaků AI designu

1. **AI paleta:** indigo a fialové gradienty, záře, gradient v textu, tečkovaný grid.
2. **Všechno v kartách:** karty v kartách, stejné zaoblení všude, ikony v tónovaných čtverečcích.
3. **Výchozí kompozice:** pilulka, velký nadpis na střed, šedý podnadpis, dvě tlačítka. Dashboard: čtyři čísla, graf, mřížka.
4. **Stejná váha všeho:** každá sekce nadpis, podnadpis a tři sloupce.
5. **Dekorace bez funkce:** glassmorphism, svítící okraje, pulzující tečky, zvětšení při hoveru, všechno vyjíždí zdola.
6. **Generický obsah:** „posuňte své podnikání“, 10K+, 99,9 %, 24/7, vymyšlená recenze, falešná data v grafu.
7. **Nic specifického** pro tenhle produkt.

Žádný znak není zakázaný sám o sobě. Zakázané je použít ho, protože je výchozí. U každého nálezu napiš, proč tam je, nebo co místo něj.

**Test vyměnitelnosti:** vyměň logo a texty za konkurenta ze stejného oboru. Funguje design dál? Pak je to průměr.

## Stavy: tady žije prémiovost

Vzhled rozhodne o výběru. Prémiový dojem dělá důkaz, že někdo promyslel každý stav. Pro každý hlavní tok navrhni a ukaž:

- reakci na akci (stisk, načítání, potvrzení),
- zpět nebo potvrzení u nevratné akce,
- prázdný stav s první akcí,
- chybový stav: co se stalo, co dělat, kde je pomoc,
- úspěch s dalším krokem,
- extrémní obsah (dlouhý název, 0 a 500 položek).

**Rozbij to schválně:** vypni síť uprostřed toku, nech selhat formulář nebo platbu, vyprázdni každý seznam. Stejná situace má v celém produktu stejný vzor a stejný text.

## Psychologie, kde sedí

- **Gradient cíle:** blízkost cíle motivuje. Progres ve formuláři, „ještě 2 kroky“.
- **Vrchol a konec:** pamatuje se nejlepší, nejhorší a poslední chvíle. Vylaď potvrzení, děkovací stránku a hlavně chybu.
- **Iluze práce:** viditelná práce zvyšuje hodnotu. U analýzy nebo výpočtu ukaž, co se děje. Uměle nezdržuj.
- **Von Restorffův efekt:** pamatuje se, co se liší. Jedna zvýrazněná věc na obrazovku.
- **Přetížení volbou:** moc možností vede k odchodu. Méně položek, výchozí volba, filtry.

## Výstup kontroly

```markdown
Test vyměnitelnosti: projde / neprojde – proč
Znaky AI: [číslo znaku: kde → co místo toho]
Stavy: chybí [který stav, kde]
Ubrat: [prvky bez funkce]
Tři změny s největším dopadem: [1–3]
```

Hotovou věc kontroluj jako samostatný běh (skill `kontrola`), ne hned po vlastní tvorbě.
