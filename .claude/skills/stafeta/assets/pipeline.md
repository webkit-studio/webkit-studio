# Pipeline – štafeta session

## Protokol
<Zkopíruj references/protokol.md a doplň konkrétní příkazy projektu:
build, test, audit, výkon, health URL, aplikace migrací.>

## Fáze a schválení
Pořadí: zadání → design systém → struktura → návrh obrazovek → stavba → revize.
Stavba UI se nespouští bez komentáře „schváleno" v issue návrhu.

| Fáze | Issue | Stav | Schváleno |
|---|---|---|---|
| Design systém | #<N> | | |
| Struktura | #<N> | | |
| Návrh obrazovek | #<N> | | |

## Lane
| Lane | Pořadí | Nesahá na |
|---|---|---|
| A | S01 → S02 | <soubory lane B> |
| B | S03 | <soubory lane A> |

Nejvýš dvě běžící session, v každé lane jedna.

## Úspora
Čti jen potřebné. Výstupy testů do souboru, do kontextu souhrn. Celá sada jednou před PR.

## Session
| Kód | Název | Issue | Závisí na | Migrace | Sada | Stav |
|---|---|---|---|---|---|---|
