# Založení štafety v repu

1. **Repo** na GitHubu (private), přístup pro Claude (GitHub App). Hlavní větev chráněná jen tak, aby session mohla mergovat.
2. **Soubory** (šablony v `assets/`):
   - `CLAUDE.md` – co je projekt, stack, pravidla (styl, texty, přístup, tajemství, schéma), jak spustit, struktura. Krátce – čte ho každá session.
   - `docs/roadmap.md` – etapy + sekce **Stav** (Hotovo / Rozpracováno / Další krok / Blokery) + tabulka **Na Lukášovi**.
   - `docs/pipeline.md` – protokol session (z `references/protokol.md` s konkrétními příkazy projektu), lane, úspora tokenů, tabulka session.
   - `docs/decisions.md` – datum · rozhodnutí · proč.
   - `docs/koordinator.md` – předávací dokument koordinátora (`assets/koordinator.md`).
   - `docs/sessions.md` – společná hlavička promptu (`assets/hlavicka-promptu.md`) + odkazy na zadání v issues.
3. **Brány v repu:** jeden příkaz na celou sadu testů, health endpoint v produkci (verze schématu, stav služeb), skript auditu obrazovek (u UI), měření výkonu (u webových aplikací). Když chybí, první session je postaví (S00 · Základ).
4. **Prostředí Claude Code Remote:** proměnné s tokeny (API token aplikace, tokeny služeb), síť povolená na potřebné hosty, setup script (`npm ci` apod.). Tajemství jen tady.
5. **Sběrné issue zpětné vazby** (`Zpětná vazba z provozu`) – koordinátor do něj zapisuje dávky.
6. **První plán** podle `references/planovani.md`, issues pro první lane, spuštění první session.
