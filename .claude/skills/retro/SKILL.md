---
name: retro
description: Retro na konci session nebo po chybě – Claude projde, kde se zasekl, co dlouho hledal a kde porušil zvyklosti, a navrhne úpravy prostředí (CLAUDE.md, kontrola nebo test, uzel mapy, skill), ze kterých Lukáš vybere. Použij, když Lukáš napíše „retro", „co jsme se naučili", „ať se to nestane znovu", po nalezené chybě, nebo na konci delší session či úkolu štafety před zavřením.
---

# Retro

Agent si nestěžuje. Narazí, protlačí to a trápení zůstane pohřbené v přepisu session. Retro ho vytáhne a promění v úpravu prostředí, aby příští session nenarazila. Plná verze cyklu práce: uzel mapy `standardy-ai`.

## Postup

1. Projdi celou session, nebo popis chyby. Hledej:
   - kde jsi dlouho hledal (soubor, uzel, nástroj),
   - kde jsi hádal, protože chyběl fakt nebo rozhodnutí,
   - kde jsi porušil zvyklost repa nebo standard,
   - co selhalo víckrát (nástroj, příkaz, síť, MCP),
   - co Lukáš opravoval nebo vracel.
2. Ke každému navrhni **nejlevnější trvalou opravu**:

| Druh problému | Oprava |
| --- | --- |
| Chybu umí najít stroj | Kontrola: lint, test, skript, brána ve štafetě. **Vždy přednost.** |
| Dlouhé hledání | Jeden řádek do `CLAUDE.md` nebo uzlu mapy: kde co je |
| Chybějící rozhodnutí | Zápis do `docs/decisions.md` nebo uzlu, s datem a „Lukáš“ |
| Úsudek, který stroj nepozná | Pravidlo do standardu (uzel mapy) |
| Opakovaný postup | Nový skill, nebo úprava existujícího |
| Zastaralá informace | Oprava zdroje, ne výjimka v promptu |

3. Předlož číslovaný seznam: problém → důkaz (kde v session) → oprava → kam. Nejvýš 7 položek, seřazených podle užitku.
4. **Nic sám neopravuj.** Lukáš vybere čísla, teprve pak zapiš. Retro, které opravuje vlastní nálezy, honí falešné poplachy.
5. Když Lukáš u session není (štafeta): návrhy do issue nebo do lekcí koordinátora. Do standardů nezapisuj.

## Pravidla

- Do psaných standardů patří jen věci úsudku. Co jde zkontrolovat strojem, je kontrola, ne věta.
- Žádné „příště budu pozornější“. Každý bod je změna souboru, kontroly nebo uzlu.
- Když oprava mění mapu: navrhni přesné znění a slug (`update_node`).
- Retro i ubírá. Obezličky, které nový model už nepotřebuje, navrhni smazat.
