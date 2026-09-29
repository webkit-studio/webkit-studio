# Úspora usage

Reálné náklady z dashboardu (září 2026): implementační session $20–170, typicky $50–90; koordinátor ~$1–5 za den; hotfix $20–30.

## Co šetří nejvíc
1. **Fáze se schválením** (`references/faze.md`): design systém → struktura → návrh → stavba. Session D za $15–40 ušetří přepis za $100+.
2. **Design systém jako sdílené třídy a tokeny** – session skládá z hotových prvků místo vymýšlení, méně kódu, méně oprav.
3. **Malé, jasné issue** s „Hotovo znamená" – session nebloudí.
4. **Čtení jen potřebného:** sekce Stav, ne celá historie; části souborů, ne celé.
5. **Výstupy testů do souboru**, do kontextu jen souhrn; celá sada jednou před PR, ne po každé změně.
6. **Nejvýš dvě souběžné session** a jedna v lane – méně konfliktů a oprav.
7. **Koordinátor v jednom chatu, kontroly úsporně** (jen potřebná pole, `get_session` jen u podezřelých).
8. **Poučení jako brány** – chyba se opraví jednou.

## Model a effort
- Výchozí: nejnovější Opus s nižší cenou (od 22. 9. 2026 `claude-opus-5-5`), effort high výslovně v promptu.
- Jádro, bezpečnost, velké přepisy: effort xhigh.
- Audity jen pro čtení, dokumentace: high stačí.
- Koordinátor: stejný model jako chat Lukáše.
- Sleduj `rate_limit_info` v `get_session`: `allowed_warning` = nespouštěj nové velké session, řekni Lukášovi; `rejected` = nic nespouštěj.
