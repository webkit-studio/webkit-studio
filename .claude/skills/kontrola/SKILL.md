---
name: kontrola
description: Kontrola výstupu u dvou stolů – dva čerství kontroloři (jeden proti zadání, druhý proti standardům), hledání vad místo názorů, editorský průchod „hotovo není dobré" a popis rizika změny (vratné a nevratné kroky, dosah). Použij po každém dokončeném výstupu před předáním nebo PR – kód, web, UI, text, nabídka, video, automatizace – a vždy, když Lukáš napíše „zkontroluj", „najdi chyby", „co je na tom špatně", „roast", „review" nebo „je to dobré?".
---

# Kontrola u dvou stolů

Autor svou práci obhajuje a model má sklon souhlasit. Proto kontroluje vždy **někdo jiný, s čerstvou hlavou, a hledá vady, ne dojem**. Plná verze cyklu práce: uzel mapy `standardy-ai`.

## Pravidla

- Neptej se „je to dobré?“. Ptej se: co chybí, co je navíc, co vypadá hotově a je špatně, co spadne.
- Kontrolu dělá jiný agent než autor. Dostane výstup, zadání a standardy. Historii tvorby ne.
- Kontrola a oprava nikdy v jednom běhu. Nejdřív seznam nálezů, oprava zvlášť. Jinak se hodnocení přizpůsobí tomu, co jde snadno opravit.
- Každý nález má místo (soubor:řádek, sekce, sekunda videa), důvod a návrh.
- Nálezy dělíš na **VADA** (opravit před předáním) a **HYPOTÉZA** (kandidát na test, ne oprava).

## Stůl 1: proti zadání

Kontrolor dostane spec, Zadání nebo issue a výstup. Hledá:

- co zadání chtělo a chybí,
- co nikdo nechtěl a je tam,
- co vypadá hotově, ale nedělá, co zadání říká (cituj uživatelský příběh),
- hraniční situace z grilování, které nejsou ošetřené.

## Stůl 2: proti standardům

Kontrolor dostane standardy a výstup, zadání ne. Podle typu výstupu:

| Výstup | Standardy |
| --- | --- |
| Kód | `CLAUDE.md` repa, uzel `standardy-kod`, pachy kódu (níže) |
| Web, UI, aplikace | `standardy-web-anti-slop`, `standardy-web-struktura`, `standardy-web-conversion-check`, design systém |
| Text pro klienta | `standardy-psani`, `standardy-firma` (slovník, hlas), slop ze `standardy-marketing` |
| Video, animace | `projekty-motion`, `standardy-web-animace` |

**Pachy kódu** (podle Fowlerova Refactoringu): duplicita, dlouhá funkce, dlouhý seznam parametrů, funkce, která víc pracuje s cizími daty než se svými, shluky dat, které vždy cestují spolu, primitivy místo malých typů, opakované přepínače podle typu, obecnost „pro jistotu“, dočasná pole, dlouhé řetězy volání, prostředník bez práce, jedna změna nutí sahat na mnoho míst.

Modely špatně dodržují seznam zákazů, když tvoří. Kontrolor, který hledá jen ty zákazy, je najde.

## Editor: hotovo není dobré

Po obou stolech projdi výsledek jako uživatel, od začátku do konce:

- Řeší to opravdu problém? Drží to pohromadě jako celek, ne jen po kouscích?
- U každého prvku: pomáhá? Když ne, pryč.
- Jdi o úroveň hlouběji, než zákazník uvidí. Cílem není dokonalost.
- Hledej tam, kde AI selhává nejčastěji: nečekané detaily, hlubší smysl, souvislé téma, chybové a prázdné stavy.

## Riziko změny

U PR, nasazení a změny v externím systému (Webflow, Make, GTM, Dashboard) přidej do popisu:

```markdown
### Riziko
- Krok: vratný / nevratný (migrace, smazání, odeslaný e-mail, změna URL nebo ID pole)
- Dosah: co se může rozbít (např. formulář → Make scénář, CTA → GTM trigger, consent → měření)
- Důkaz: před a po (screenshot, test, měření)
```

Nevratný krok potvrdí Lukáš dřív, než se provede.

## Výstup

```markdown
## Kontrola – [co], [datum]
Stůl 1 (zadání): [n] vad, [n] hypotéz
Stůl 2 (standardy): [n] vad, [n] hypotéz

| # | Typ | Kde | Nález | Návrh |
| --- | --- | --- | --- | --- |

Editor: [2–3 věty]
Verdikt: předat / opravit a znovu zkontrolovat
```

Klientovi tabulku nálezů neposílej. Klientovi jdou opravy.
