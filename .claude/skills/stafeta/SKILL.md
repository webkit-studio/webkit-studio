---
name: stafeta
description: Systém štafety přes repo pro Webkit.Studio – Claude jako koordinátor plánuje práci do issues, spouští navazující cloud session (Claude Code Remote), hlídá brány, produkci a předávání, a Lukášovi píše jen to podstatné. Použij vždy, když Lukáš chce postavit nebo dotáhnout větší projekt „přes štafetu", rozdělit práci na session/agenty, převzít koordinaci po jiném chatu, založit repo tak, aby na něm mohly pracovat navazující session, spouštět rutiny jako nové session s instrukcemi v repu, nebo když říká „koordinátor", „lane", „předej další session", „ať to jede až do konce", „rozděl práci" – i bez slova štafeta. Platí pro kódové projekty i pro projekty kolem Webflow, Notionu, Make a dalších aplikací (adaptéry uvnitř).
---

# Štafeta přes repo

Štafeta je způsob, jak dotáhnout velký projekt pomocí řady krátkých, čerstvých session místo jednoho dlouhého chatu. Paměť projektu žije v repu (dokumenty + issues), ne v kontextu modelu. Každá session převezme stav, udělá jeden jasně vymezený balík, projde branami, ověří výsledek a předá další. Koordinátor (chat, se kterým Lukáš mluví) plánuje, spouští, hlídá a hlásí.

Proč to funguje: čerstvá session je levnější a přesnější než chat s tisíci zprávami; plán v repu přežije výměnu modelu i koordinátora; brány zachytí chyby dřív než Lukáš; jasné „hotovo znamená" dává každé session vlastnictví výsledku.

## Kdo je kdo

- **Lukáš** mluví jen s koordinátorem. Dává zadání, schvaluje návrhy, dává zpětnou vazbu. Do GitHubu ani do hostingu nesahá, pokud nemusí (tajemství, platby, věci mimo dosah nástrojů).
- **Koordinátor** plánuje (issues), spouští session, hlídá štafetu, zapisuje zpětnou vazbu, merguje drobnosti v dokumentaci, Lukášovi píše stručně a jen milníky nebo věci, které bez něj nejdou.
- **Session** (S/E/H/R/P…) pracuje na jednom issue od převzetí po ověřenou produkci a předá další ve své lane. Lukáš s ní nemluví; otázky píše do issue.

## Postup podle situace

Zjisti, kde projekt je, a přečti jen potřebnou referenci:

| Situace | Čti |
|---|---|
| Nový projekt nebo repo bez štafety | `references/zalozeni.md` + šablony v `assets/` |
| Fáze projektu a schvalovací brány (design systém → struktura → návrh → stavba → revize) | `references/faze.md` – čti vždy před plánováním |
| Plánování práce, rozdělení na session a lane, zadání issue | `references/planovani.md` |
| Protokol, kterým se řídí každá session (kroky 0–8, brány) | `references/protokol.md` |
| Koordinátor: spouštění, kontroly, poke, zprávy Lukášovi | `references/koordinator.md` |
| Stack jiný než kód + GitHub (Webflow, Notion, Make, Supabase…) | `references/adaptery.md` |
| Rutiny (noční/opakované úlohy) jako nové session | `references/rutiny.md` |
| Úspora usage, volba modelu a effortu | `references/usage.md` |
| Před prvním během zkontroluj poučení z minula | `references/lekce.md` |

## Jádro v deseti bodech

1. **Paměť v repu.** `CLAUDE.md` (pravidla), `docs/roadmap.md` (Stav + Na Lukášovi), `docs/pipeline.md` (protokol, lane, tabulka session), `docs/decisions.md`, `docs/koordinator.md` (předávací dokument koordinátora). Zadání session je celé v issue.
2. **Jedna session = jedno issue = jeden výstup** s oddílem „Hotovo znamená" (ověřitelná kritéria). Bez něj se session nespouští.
3. **Nestavět bez schváleného návrhu.** Pevné pořadí: zadání → design systém → struktura → návrh obrazovek → stavba → revize, mezi fázemi schválení Lukášem zapsané v issue. Koordinátor nespustí stavbu UI bez odkazu na schválený návrh. Přepis zamítnuté stavby je nejdražší chyba štafety (`references/faze.md`).
4. **Lane = oblast kódu.** V jedné lane běží vždy jedna session, lane se navzájem nedotýkají. Celkem nejvýš dvě běžící session.
5. **Brány před PR:** merge hlavní větve, build, celá sada testů, code review, audit vzhledu/kompozice a výkonu u UI, security review u citlivých změn. Červený test se opravuje, nikdy nevypíná.
6. **Produkce je součást hotovo.** Po merge ověřit nasazení (health endpoint, migrace, smoke). Kód jde do produkce dřív než migrace – nic nesmí na nové schéma spoléhat v cestě přihlášení.
7. **Předání:** session na konci zapíše „hotovo" (co vzniklo, co zůstalo, co potřebuje Lukáš), zavře issue a spustí další v lane.
8. **Koordinátor jen hlídá:** plánované kontroly (každé ~2 h), poke zaseklé session, spuštění, když štafeta upadne. Každá chyba, kterou najde Lukáš, se stane novou bránou (test, kontrola v auditu), aby se nevrátila.
9. **Tajemství nikdy do repa, issue ani promptu.** Session je berou z prostředí.
10. **Lukášovi stručně:** česky, tykáním, časy v jeho časové zóně, jedna souhrnná zpráva na konci balíku místo průběžného hlášení, jasně oddělené „co je na tobě".

## Styl zadání session

Prompt session = společná hlavička (protokol, co číst, kde jsou tajemství, že Lukáš u chatu není) + číslo issue + rezervovaná migrace + sady testů + další session v lane + na co nesahat (souběžná lane). Celé zadání patří do issue, ne do promptu – issue přežije restart, prompt ne. Vzor hlavičky: `assets/hlavicka-promptu.md`.

Effort piš do promptu výslovně („Effort high – pracuj důkladně"), protože některé modely mají nižší výchozí effort.

## Když si nevíš rady

Přečti `docs/pipeline.md` a sekci Stav v cílovém repu – projekt může mít vlastní úpravy protokolu, které mají přednost před tímto skillem. Rozhodnutí, které dokumenty neřeší, zapiš do `docs/decisions.md` a pokračuj; Lukáše se ptej jen na věci, které mění, co se staví.
