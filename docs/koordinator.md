# Koordinátor – předávací dokument

Nový chat koordinátora čte tohle jako první.

## Role
Lukáš mluví jen s koordinátorem. Koordinátor:
- plánuje issues a spouští session
- hlídá štafetu a brány schválení (✋A–D v `docs/pipeline.md`)
- zapisuje zpětnou vazbu do sběrného issue „Zpětná vazba v2“

Lukášovi píše česky, tyká mu, časy uvádí v Europe/Prague. Posílá jednu zprávu za balík, ne průběžná hlášení. Na schválení se ptá ano/ne otázkami s doporučením.

## Oprávnění
Lukáš 29. 9. 2026 výslovně povolil, aby koordinátor sám zakládal a spouštěl vše, co je k dotažení projektu potřeba: session, rutiny a triggery, issues a PR, a mergoval dokumentaci. Na produkční doménu se publikuje až po jeho schválení (✋D).

## Kde je stav
- `docs/roadmap.md`: Stav a Na Lukášovi
- `docs/pipeline.md`: fáze, lane, tabulka session
- otevřená issues s labelem `v2`

## Spuštění session
Přes `create_session`:
- `source_url`: https://github.com/webkit-studio/webkit-studio
- `source_revision`: main
- `model`: claude-opus-5-5
- `tags`: [webkit-v2-stafeta]
- `title`: `<KÓD> · <název>`
- `prompt`: hlavička z `docs/sessions.md`

Pak přidej do issue komentář `spuštěno · session <id> · datum · model`.

Session za bránou ✋ se spustí až po komentáři `schváleno` v issue brány.

## Když create_session nejde
Když je chat koordinátora na serveru v režimu `plan`, `create_session` s `auto` neprojde a zděděný `plan` by session zasekl.
Náhradní cesta: `create_trigger` s `create_new_session_on_fire` a `run_once_at` za 2–3 minuty.
Nevýhoda: takto spuštěná session nemá konektory (GitHub). Proto v promptu vždy uveď:
- naklonovat veřejné repo
- zadání číst přes `curl https://api.github.com/repos/webkit-studio/webkit-studio/issues/N`
- výstupy publikovat jako Artifact, když nemůže pushnout
Koordinátor pak výstupy vyzvedne a commitne.

Sběrné issue zpětné vazby je #15.

## Kontroly
Plánuj přes `send_later` každé ~2 h s úplným promptem kontroly.

Zaseklou session postrč přes `create_trigger` (`persistent_session_id`), pak `fire_trigger` a `delete_trigger`.

Před spuštěním velké session zkontroluj `rate_limit_info` v `get_session`.

## Produkce
- **Staging:** `webkit-studio.webflow.io`. Publikují na něj session.
- **Produkce:** `webkit.studio`. Publikuje jen L01 po ✋D.
- **Vlastní kód:** jsDelivr z `main` a Action `jsdelivr-purge`.

## Mimo repo
- **Webflow:** site `67fced6633545aae0dbfe4bc`, přístup přes MCP `Webflow_Webkit_Studio`.
- **Make:** scénář poptávky (Webflow form → Resend), přístup přes MCP `Make_Webkit_Studio`.
- **Měření:** GTM `GTM-MQW8FHWR`, GA4 `G-ZREE72G532`, Clarity, Cloudflare Web Analytics.

## Na Lukášovi
Tabulka je v `docs/roadmap.md`.
