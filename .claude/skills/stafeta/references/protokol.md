# Protokol session (kroky 0–8)

Tohle je obecná verze. Cílové repo ho má v `docs/pipeline.md` s konkrétními příkazy (build, testy, health endpoint, migrace) – ta verze má přednost.

## 0. Vstup
Prompt = společná hlavička + číslo issue. Celé zadání je v issue. Přečti `CLAUDE.md`, sekci Stav v `docs/roadmap.md`, `docs/pipeline.md` (protokol, lane, úspora) a jen ty části architektury, kterých se issue týká.

## 1. Kontrola závislostí
Otevřené issue ze „Závisí na" = komentář „čeká na X" a konec bez práce.

## 2. Převzetí
- Když ve tvé lane už běží jiná session (issue `běží`), konec.
- Tělo issue `**Stav:** běží`, komentář `start · datum · model`.
- **Převzetí produkce:** health endpoint, čekající migrace aplikovat, smoke stránek předchůdce. Chyba předchůdce = první commit vlastní větve a komentář do jeho issue; větší než hodina = nový `BUG` issue a zpráva koordinátorovi.

## 3. Práce
Větev z aktuální hlavní větve, jen rozsah issue. Rozhodnutí mimo architekturu do `docs/decisions.md`. Nová migrace jen s rezervovaným číslem.

## 4. Brány před PR (v tomto pořadí)
a. Merge hlavní větve, konflikty vyřešit (v dokumentech a seznamu testů zachovat obě strany).
b. Build bez chyb.
c. Celá sada testů zelená. Červený test se opravuje – nikdy nevypínat, nepřeskakovat, neoznačovat jako flaky.
d. Code review nad vlastním diffem (`/code-review high` nebo subagent). Potvrzené nálezy opravit, ostatní zdůvodnit v PR.
e. **Vzhled** (když se mění cokoli viditelného): audit obrazovek – kompozice (bloky bez mezery, obsah na hraně, dvě lišty pod sebou, nadpis mimo kartu, přesah, překrytí dropdownu), odsazení mimo stupnici, zakázané znaky. Snímky před/po jako artifact, porovnat se schváleným návrhem.
f. **Výkon** (když se mění stránky nebo dotazy): měření klíčových stránek, počet dotazů do DB a doba odpovědi pod limitem.
g. Security review u přístupu, auth, peněz, tokenů, souborů, veřejných stránek.
h. Po opravách z d–g znovu c.

## 5. PR
Na hlavní větev, `Closes #N`, v těle co se mění, výstupy bran, co zůstalo. Merge commit (větve navazují). Merguje session sama po zelených branách.

## 6. Produkce
Nasazení trvá pár minut – mezitím udělej krok 7, nečekej nečinně a kvůli buildu neukončuj turn. Pak health, migrace, smoke. Červená produkce = oprava a další PR **před** předáním.

## 7. Uzavření
Stav v roadmapě (jen vlastní řádky), rozhodnutí, komentář `hotovo · PR #N` – co vzniklo, co zůstalo, známé nedostatky, **co potřebuje Lukáš**. Tělo `**Stav:** hotovo`, zavřít issue.

## 8. Předání
Když v lane nic neběží a další issue má `čeká` se zavřenými závislostmi, spusť ho (`create_session`, stejná hlavička, model podle `docs/koordinator.md`) a zapiš `spuštěno · session <id>`. Konec lane = nic nespouštět. Revizní/auditní session (R, D, H) spouští jen koordinátor, pokud issue neříká jinak.
