# Rutiny jako nové session s instrukcemi v repu

Místo dlouhého promptu v rutině: rutina spustí **čerstvou session** (`create_trigger` s `create_new_session_on_fire: true`, cron), prompt je krátký a odkazuje do repa. Postup, pravidla, zpětná vazba a historie žijí v repu, jsou verzované a upravuje je kterákoliv session.

## Struktura v repu
`docs/rutiny/<nazev>.md`:
- **Cíl** jednou větou, **výstup** (kam zapisuje: API aplikace, Notion, soubor).
- **Postup** krok za krokem, zdroje, kritéria, deduplikace.
- **Zpětná vazba** – co Lukáš zamítl a proč (session ji čte jako první).
- **Shrnutí pro Lukáše** – přesný formát závěrečné zprávy.
- **Nikdy:** co rutina nesmí (oslovovat lidi, publikovat, mazat).

## Prompt rutiny (vzor)
```
Jsi rutina <název> projektu <repo>. Naklonuj/otevři repo <owner/repo>, větev main,
přečti docs/rutiny/<nazev>.md a proveď ho přesně. Tokeny jen z prostředí.
Na konci zpráva podle oddílu „Shrnutí pro Lukáše".
```

## Pravidla
- Token pro rutinu má jen potřebná práva (read + write, ne admin) a je v prostředí, ne v promptu.
- Zápis do aplikace přes API s deduplikací; rutina nikdy nemění záznamy, které už Lukáš zpracoval.
- Zpětnou vazbu na výstupy rutiny zapisuje koordinátor do `docs/rutiny/<nazev>.md` (PR), ne do promptu rutiny.
- Oznámení: e-mail nebo push jen se shrnutím.
- Náklady: rutina = celá session; drž postup krátký, čti jen potřebné soubory, nastav rozumný strop (např. „nejvýš 2 h, pak zapiš, co máš").
