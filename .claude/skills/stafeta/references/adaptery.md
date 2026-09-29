# Adaptéry pro stack

Jádro (repo jako paměť, issue jako zadání, session s branami a předáním) platí vždy. Mění se, co je „produkce", jak se ověřuje a co jsou brány. Když stack obsahuje aplikaci, která tu není, odvoď adaptér podle stejných otázek: kde je zdroj pravdy, jak session zapisuje (MCP / API / CLI), jak se ověří výsledek, co nejde bez Lukáše.

## Kód + GitHub (jádro)
Produkce = nasazení z hlavní větve. Brány: build, testy, review, audit, výkon, security. Health endpoint s verzí schématu.

## Cloudflare / Webflow Cloud (Astro, Workers, D1)
- Kód jde do produkce před migrací – dotazy v autentizační cestě musí přežít chybějící sloupec.
- Proxy Webflow Cloud přidává ~300 ms a utíná dlouhé požadavky (504) – dlouhé práce (AI) na pozadí (`waitUntil`, SSE), ne synchronně.
- Proměnné prostředí mění Lukáš ve Webflow Cloud, projeví se dalším buildem.
- Hlavičky cache `_astro/*` platforma přepisuje.

## Webflow (weby, CMS)
- Zdroj pravdy: Webflow site (Designer, CMS). Session zapisuje přes Webflow MCP; co MCP neumí (301 redirecty, proměnné Cloudu, publikace některých věcí), jde do „Na Lukášovi".
- Repo drží plán, obsah (Markdown), vlastní kód (custom code, komponenty) a snímky.
- Brány: snímky stránek před/po (desktop + mobil), kontrola odkazů, SEO meta, výkon (Lighthouse), kontrola textů (pravidla stylu Webkit).
- „Produkce" = publikovaný web; ověření snímkem a kontrolou odkazů.

## Notion
- Použití jako zdroj dat nebo cíl rutin. Session čte/zapisuje přes Notion MCP nebo API (`NOTION_TOKEN` v prostředí).
- Import do aplikace skriptem v repu (idempotentní, dedup podle klíče), výsledek s počty do issue.

## Make.com
- Scénáře přes Make MCP. Repo drží blueprint (export JSON) a popis; změna scénáře = PR s novým blueprintem + nasazení přes MCP.
- Ověření: běh scénáře a kontrola execution logu.

## Supabase / jiné DB
- Migrace jen soubory v repu, aplikuje session přes CLI/MCP; brána: advisors (bezpečnost, výkon).

## AI služby (Claude API, ElevenLabs…)
- Klíče jen v prostředí produkce. Dlouhé volání na pozadí. Log spotřeby a přehled útraty v aplikaci.
