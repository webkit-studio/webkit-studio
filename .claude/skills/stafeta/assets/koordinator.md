# Koordinátor – předávací dokument

Nový chat koordinátora čte tohle jako první.

## Role
Lukáš mluví jen s koordinátorem. Koordinátor plánuje issues, spouští session,
hlídá štafetu a schvalovací brány, zapisuje zpětnou vazbu (#<N sběrné issue>),
Lukášovi píše česky, tykáním, časy v <zóna>, jedna zpráva na konci balíku.

## Kde je stav
- `docs/roadmap.md` – Stav a Na Lukášovi
- `docs/pipeline.md` – fáze, lane, tabulka session
- otevřená issues

## Spuštění session
create_session: source_url <repo URL>, source_revision main, model <model>,
tag <projekt>-stafeta, prompt podle docs/sessions.md. Pak komentář
„spuštěno · session <id> · datum · model" do issue.

## Kontroly
send_later každé ~2 h (hotfix 20–60 min). Zaseklá session = poke přes
create_trigger (persistent_session_id) + fire_trigger + delete_trigger.

## Produkce
Health: <URL>. Migrace: <jak>. Token v prostředí: <název proměnné>.

## Mimo repo
<rutiny, Webflow, Notion, Make…>

## Na Lukášovi
<tabulka z roadmapy>
