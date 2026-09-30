# Týdenní vyhodnocení – postup rutiny

Běží v sobotu ve 2:00 ve stejné rutině jako noční hledání. Výsledek je v dashboardu, když se Lukáš ráno probudí. **Cíl: zjistit z výsledků hovorů, co vede k poptávkám, a navrhnout konkrétní změny `STRATEGIE.md`.**

Rutina nic nemění sama: ani leady, ani strategii. Jen čte, počítá a navrhuje. Návrhy schvaluje Lukáš.

## 1. Přečti

Cesty jsou vůči `tools/lead-system/` v repu.

1. `STRATEGIE.md`, hlavně:
   - Cíl a týdenní cíle,
   - Zápis výsledku hovoru (kódy),
   - Běžící testy,
   - Rozhodovací pravidla,
   - Historie změn.
2. `rutiny/vystup-<výstup>.md` podle klíče `výstup`. Odtud víš, kde jsou leady a výsledky hovorů.
3. Poslední vyhodnocení: kde je, říká `rutiny/vystup-<výstup>.md` → Týdenní vyhodnocení. Potřebuješ ho pro srovnání a pro kontrolu, co se z minulých návrhů zavedlo.

## 2. Data

- **Týden** = posledních 7 dní do dnešního rána (Europe/Prague). **Celkem** = od 24. 9. 2026.
- **Leady:** všechny, i ty ve stavu Ne. U každého potřebuješ:
  - Firma, Obor, Známka, Stav, Služba,
  - Osloveno (datum), Follow-up,
  - Odpověď firmy, Poznámka,
  - Kanál, Varianta zprávy, Zdroj, Běh enginu,
  - Ověřeno (u leadů z rutiny je to datum založení).
- **Deník běhů** za posledních 7 dní (`rutiny/vystup-<výstup>.md` → Deník běhů).

## 3. Výsledek každého hovoru

- Kód vezmi ze začátku Odpovědi firmy nebo poznámky (`[nedovoláno]`, `[recepce]` … `[ne: důvod]`).
- Ve výstupu `dashboard` pomůže i stav leadu. Převod stavů na kódy je v `rutiny/vystup-dashboard.md` → Čtení.
- Když kód chybí, odhadni ho z textu Odpovědi firmy a Poznámky a označ ho „odhad“.
- **Hovor** = lead s vyplněným datem Osloveno, nebo s kódem `[nedovoláno]`.
- Z pole Běh enginu vytáhni dotaz (město) a pořadí na Firmy.cz: `p<n>`, u starších leadů `pořadí <n>`.
  - Velikost města: okresní / krajské / velké (Praha, Brno, Ostrava) podle `STRATEGIE.md` → Trhy.
- Variantu testu T2 ber z pole Varianta zprávy (v dashboardu `variant`), u starších leadů případně z `var A` v Běhu enginu.

## 4. Spočítej

1. **Trychtýř** za týden a celkem, proti týdenním cílům:
   hovory → dovoláno → rozhodovatel → zájem → videohovor → nabídka → zakázka.
2. **Rozpady**, vždy s počtem hovorů, aby bylo vidět, na kolika datech číslo stojí:
   - po oborech,
   - po velikosti města,
   - po známce,
   - po kanálu,
   - po pořadí na Firmy.cz (1–5 / 6+),
   - po variantě testu T2,
   - po testu T3: platí za marketing (signál „Reklamy“ u leadu), nebo neplatí.
3. **Důvody „ne“** s počty.
4. **Noční hledání:**
   - leadů za noc a výtěžnost po oborech (z deníku),
   - kolik leadů z nočních běhů Lukáš vyřadil (stav Ne bez data Osloveno, nebo Nevolat) a proč.
5. **Zásoba** leadů ve stavu Oslovit po oborech.

## 5. Vyvoď

- **Použij Rozhodovací pravidla** ze `STRATEGIE.md`.
- **Malý vzorek = „málo dat“.** Kde číslo stojí na méně než 10 hovorech, nevyvozuj z něj pravidlo. Napiš jen, co naznačuje a kolik dat ještě chybí.
- **Porovnej s minulým týdnem.** Co se změnilo a proč. Jestli minulý návrh zabral.
- **Citace:** vyber 2–4 doslovné věty z Odpovědi firmy, které nejvíc vypovídají o tom, proč lidi říkají ano nebo ne.
- **Mysli na cíl.** Cílem jsou poptávky, ne hovory ani leady. Návrh, který zvýší počet hovorů, ale ne videohovorů, není dobrý návrh.

## 6. Napiš vyhodnocení

**Nový dokument** podle `rutiny/vystup-<výstup>.md` → Týdenní vyhodnocení, název `Lead engine – týden do RRRR-MM-DD`. Česky, stručně, tabulky místo odstavců, bez omáčky.

1. **TL;DR** – 3 až 5 vět: čísla proti cíli, co funguje, co změnit.
2. **Čísla** – trychtýř v tabulce: týden / celkem / cíl.
3. **Co funguje a co ne** – obory, trhy, známky. Vždy s počtem hovorů.
4. **Proč lidi říkají ne** – tabulka důvodů s počty, pod ní citace.
5. **Testy** – u každého běžícího testu data A proti B a verdikt, nebo „málo dat“ a kolik chybí.
6. **Návrhy změn `STRATEGIE.md`** – nejvýš 3. U každého:
   - co přesně změnit (sekce a nový text nebo hodnota),
   - proč (čísla),
   - podle čeho za týden poznáme, že to pomohlo.
7. **Co testovat dál** – nejvýš 1 nový test, a jen když některý test doběhl. Uveď hypotézu, varianty, měřítko a minimum dat.
8. **Co sledovat** – 2–3 věci, které zatím nejsou problém, ale můžou být.
9. **Na pondělí** – seznam k volání:
   - follow-upy s datem v příštím týdnu,
   - zmeškané follow-upy,
   - leady ve stavu Osloveno bez Follow-upu.

   Ke každému: Firma, datum, co bylo domluveno (z Odpovědi firmy).
10. **Kvalita dat** – hovory bez kódu, Osloveno bez data, Ne bez důvodu. Uveď konkrétní firmy, ať se dají doplnit.

## 7. Shrnutí rutiny

Zkopíruj TL;DR, pod něj seznam „Na pondělí“ a odkaz na dokument.
