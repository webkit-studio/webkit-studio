# Pipeline v2: štafeta session

Obecný protokol je ve skillu `.claude/skills/stafeta/references/protokol.md`. Tahle verze má přednost, protože obsahuje konkrétní kroky projektu (Webflow adaptér).

## Protokol (kroky 0–8)

0. **Vstup.**
   - Prompt obsahuje hlavičku a číslo issue. Celé zadání je v issue.
   - Přečti `CLAUDE.md`, sekci Stav v `docs/roadmap.md`, tenhle soubor a issue.
   - Dál čti jen to, na co issue odkazuje.
   - **Staré texty nečti**, seznam je v `CLAUDE.md`.
1. **Závislosti.** Když je otevřené issue ze „Závisí na“, napiš komentář `čeká na #N` a skonči.
2. **Převzetí.**
   - Když ve tvé lane běží jiná session (issue `běží`), skonči.
   - Do těla issue napiš `**Stav:** běží` a přidej komentář `start · datum · model`.
3. **Práce.**
   - Větev `v2/<kód>-<slug>` založ z aktuální `main`. Dělej jen rozsah issue.
   - Rozhodnutí zapiš do `docs/decisions.md`.
   - Výstupy dokumentů ukládej do `docs/web-v2/<kód>-<název>.md`.
   - Návrhy ukládej jako artifact a kopii dej do `docs/web-v2/navrh/`.
4. **Brány před PR.**

   Pro každou session:

   | Brána | Co ověřit |
   |---|---|
   | a | Merge `main`, vyřešit konflikty |
   | b | Když se měnil kód v `site/webflow/`: `python3 site/webflow/build.py` bez chyb a `dist/` commitnutý |
   | c | Text: kontrola podle pravidel v `CLAUDE.md`, tedy žádná zakázaná vata, žádná `—` a `·` ve webových textech, `[DOPLNIT]` místo vymyšlených faktů |
   | d | Review vlastního výstupu (subagent nebo `/code-review high`), potvrzené nálezy opravit |

   Když se mění Webflow:

   | Brána | Co ověřit |
   |---|---|
   | e | Snímky před a po na 1440, 991 a 390 px (Playwright, staging `webkit-studio.webflow.io`) jako artifact, porovnané se schváleným návrhem. Rozdíl je chyba. |
   | f | Odkazy (žádné 404), SEO meta, jedna H1 na stránku, `noindex` tam, kde má být |
   | g | Lighthouse mobil a desktop. Přístupnost, best practices a SEO = 100, výkon mobil ≥ 95 |
   | h | Konzole bez chyb, `prefers-reduced-motion` vypne animace, klikací plochy ≥ 24 px, kontrast AA |
   | i | Security review, když jde o formuláře, skripty třetích stran nebo měření |

5. **PR** do `main` s `Closes #N`. V těle popiš změny, výstupy bran a co zůstalo. Merge commit. Session merguje sama po zelených branách.
6. **Produkce.**
   - Webflow: publikuj jen na staging `webkit-studio.webflow.io`.
   - **Na produkční doménu publikuje jen L01 po schválení Lukášem.**
   - Po merge změn v `dist/` ověř, že doběhla Action `jsdelivr-purge`.
7. **Uzavření.**
   - Aktualizuj řádky v sekci Stav v roadmapě.
   - Komentář `hotovo · PR #N`: co vzniklo, co zůstalo, **co potřebuje Lukáš**.
   - Do těla issue napiš `**Stav:** hotovo` a issue zavři.
8. **Předání.**
   - Když další issue v lane nemá bránu schválení a má zavřené závislosti, spusť ho přes `create_session` se stejnou hlavičkou z `docs/sessions.md` a zapiš `spuštěno · session <id>`.
   - Session za bránou ✋ spouští jen koordinátor.

## Fáze a schválení

Pořadí: analýza → strategie a design → texty → stavba → spuštění → ladění. Mezi fázemi schvaluje Lukáš. Schválení zapisuje koordinátor do issue jako `schváleno · datum · odkaz`.

| Brána | Po session | Stav |
|---|---|---|
| ✋A Positioning a nabídka | B01, B02 | čeká |
| ✋B Strategie a design | T01, D01 | čeká |
| ✋C Vzorové texty | T02 | čeká |
| ✋D Publikace | R01 | čeká |

## Lane

| Lane | Pořadí | Nesahá na |
|---|---|---|
| A (analýza) | B01 → B02 (B01 po dokončení spustí B02) | Webflow, `site/` |
| T (strategie a texty) | T01 → T02 → T03 | Webflow, `site/` |
| D/S (design a stavba) | D01 → S01 → S02 → S03 → S04 ∥ S05 → P01 | `docs/web-v2/texty/` (jen čte) |
| F (spuštění) | R01 → L01 | – |
| G (ladění) | M01 (rutina) → O0x | – |

Nejvýš dvě session běží souběžně.

## Úspora

- Čti jen potřebné: sekci Stav, issue a výstupy, na které issue odkazuje.
- Výstupy testů a Lighthouse ukládej do souboru. Do kontextu dej jen souhrn.
- Lighthouse a snímky spouštěj celé jednou před PR.

## Session

Stav je jen snímek. Pravdu drží issue.

| Kód | Název | Issue | Závisí na | Model · effort | Stav |
|---|---|---|---|---|---|
| B01 | Služby, zákazníci, nabídka | #10 | K00 | opus-5.5 · xhigh | čeká |
| B02 | Trh, vyhledávání, GEO | #11 | B01 | opus-5.5 · high | čeká |
| T01 | Strategie webu a měřicí plán | #12 | ✋A | opus-5.5 · xhigh | čeká na schválení |
| D01 | Design systém, komponenty a náhled 3 služeb | #13 | K00 (hned, souběžně s B01) | opus-5.5 · xhigh | čeká |
| T02 | Vzorové texty (homepage a `/webflow-vyvoj`) | #16 | ✋B | opus-5.5 · xhigh | čeká na schválení |
| T03 | Zbylé texty, FAQ, SEO meta | #17 | ✋C | opus-5.5 · high | čeká na schválení |
| S01 | Webflow základ a styleguide | #18 | ✋B | opus-5.5 · high | čeká na schválení |
| S02 | CMS Projekty a `/nase-prace` | #19 | S01 | opus-5.5 · high | čeká |
| S03 | Úprava styleguidu a stránky | #20 | S02, T03 | opus-5.5 · high | čeká |
| S04 | Měření a lead flow | #21 | S03 | opus-5.5 · high | čeká |
| S05 | SEO a GEO technika | #22 | S03 | opus-5.5 · high | čeká |
| P01 | Výkon 100/100 | #23 | S04, S05 | opus-5.5 · xhigh | čeká |
| R01 | Revize | #24 | P01 | opus-5.5 · high | čeká |
| L01 | Publikace a ověření | #25 | ✋D | opus-5.5 · high | čeká na schválení |
| M01 | Rutina ladění (každé 2 týdny) | #26 | L01 | opus-5.5 · high | čeká |
