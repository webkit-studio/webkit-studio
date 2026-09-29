# Poučení z dashboardu (září 2026)

Každé je dnes pravidlo nebo brána. Než začneš nový projekt, převezmi je.

| Co se stalo | Pravidlo |
|---|---|
| Nový sloupec v přihlašování před migrací → 401 na všechno | Kód jde do produkce dřív než migrace; auth cesta musí přežít chybějící schéma. |
| Obrazovky stavěné bez návrhu, Lukáš je celé zamítl | U UI vždy nejdřív klikatelný návrh ke schválení (session D). |
| Spacing „nahovno" na 29 komponentách | Stupnice odsazení v CSS, statická kontrola, sdílené třídy. |
| Nová karta nad starou komponentou, bloky přilepené | Audit kompozice jako brána (mezery, hrany, dvě lišty, nadpis mimo kartu). |
| Dropdown schovaný pod další kartou | Stupnice vrstev (z-index), kontrola překrytí v auditu. |
| Souhrn AI končí 504 | Dlouhé volání na pozadí/stream, nikdy synchronně přes proxy. |
| Pomalé přepínání, filtr až po načtení | Pohled se aplikuje na serveru; brána výkonu (počet dotazů, TTFB). |
| Session čekala hodinu na schválení, které nikdo nedal | Session nikdy nečeká na Lukáše – otázky do issue a dokončit, co jde. |
| Stav „pozastaveno" zablokoval rutinu na den | Pozastavení vždy s podmínkou návratu a zapsané v issue. |
| Časy v UTC zmátly Lukáše | Lukášovi vždy v jeho časové zóně. |
| Hlášení každého milníku zahltilo Lukáše | Když chce, jedna zpráva na konci. |
| Zakázané znaky a styl textů se vracely | Pravidla textu v `CLAUDE.md` + kontrola v auditu (např. žádné „·" a „—"). |
| Úkoly z AI jako text, ne data | Výstupy AI rovnou jako záznamy v databázi ve stavu návrh ke schválení. |
