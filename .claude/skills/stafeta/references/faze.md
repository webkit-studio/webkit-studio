# Fáze a schvalovací brány

Nejdražší chyba štafety je stavět něco, co Lukáš pak zamítne. Návrh stojí zlomek stavby, přepis hotové obrazovky stojí víc než celý návrh. Proto má každý projekt pevné pořadí fází a mezi nimi schválení Lukášem. **Koordinátor nespustí session další fáze, dokud předchozí nemá schválení zapsané v issue.**

## Pořadí

| # | Fáze | Výstup | Kdo | Brána |
|---|---|---|---|---|
| 0 | **Zadání** | Cíl, pro koho, co musí na konci fungovat, co je mimo | koordinátor s Lukášem | Lukáš potvrdí shrnutí |
| 1 | **Design systém** | Tokeny (barvy, typografie, stupnice odsazení, radiusy, vrstvy), základní prvky (tlačítko, pole, karta, štítek, tabulka, řádek seznamu, menu), ukázková stránka | session D | Lukáš schválí |
| 2 | **Struktura** | Mapa obrazovek, navigace, datový model (entity a vztahy), role a přístupy | session D | Lukáš schválí |
| 3 | **Návrh obrazovek** | Klikatelný návrh klíčových obrazovek z prvků fáze 1, desktop + mobil, stavy (prázdno, chyba, načítání) | session D | Lukáš schválí |
| 4 | **Stavba** | Implementace podle schváleného návrhu, po lanech | session S/E | brány protokolu |
| 5 | **Revize** | Audit všech obrazovek, formulář zpětné vazby, dávka oprav | session R | Lukáš vyplní formulář |

Malé projekty mohou fáze 1–3 sloučit do jedné session D, ale **schválení zůstává**. Projekt s existujícím design systémem (Webkit.Studio, klientův brand) fázi 1 přeskočí a design systém jen převezme a zdokumentuje.

## Pravidla bran

- **Schválení = komentář v issue** `schváleno · datum · odkaz na návrh` (zapisuje koordinátor podle Lukášovy odpovědi). Issue stavby odkazuje na schválený návrh v poli „Schválený návrh". Bez odkazu se nespouští.
- **Návrh je artifact nebo soubor v `docs/`**, ne kód aplikace. Session D nesahá na `src/`.
- **Otázky v návrhu na ano/ne s doporučením**, ať Lukáš odpoví jedním slovem. Otevřené otázky zdržují.
- **Zamítnutý návrh = nová verze návrhu**, ne stavba s poznámkou „dořešíme".
- **Stavba se od návrhu neodchyluje.** Když návrh něco neřeší, session to udělá nejjednodušeji v duchu design systému a zapíše do `docs/decisions.md`; když jde o viditelnou změnu chování, zeptá se v issue a pokračuje na zbytku.
- **Nová obrazovka nebo prvek mimo design systém** = nejdřív rozšíření design systému (malé D), pak použití. Žádné jednorázové styly.
- **Brána vzhledu v protokolu** (audit kompozice, snímky před/po) porovnává stavbu se schváleným návrhem – rozdíl je chyba.

## Kdy fáze přeskočit

- Oprava chyby (H) bez změny vzhledu, práce na datech, API, importy, rutiny – rovnou stavba.
- Drobná změna ve schváleném vzoru (nový sloupec v tabulce, další položka menu) – rovnou stavba.
- Cokoli, co mění rozvržení, navigaci nebo zavádí nový typ obrazovky – vždy přes návrh.

## Proč to šetří usage

Session D stojí typicky $15–40, stavba obrazovek $50–170. Zamítnutá stavba = zaplacená dvakrát plus revize. V dashboardu první vlna obrazovek bez návrhu skončila celým přepisem (etapa E); po zavedení návrhu D01 prošla stavba napoprvé.
