# Výstup: Notion

Platí, když je ve `STRATEGIE.md` → Nastavení rutin `výstup` = `notion`.

## Kde co je

Hledej podle názvu, nástrojem Notion `search` (a `fetch` pro schéma). ID do veřejného repa nepatří.

| Co | Název v Notionu | Typ |
|---|---|---|
| Leady | **Lead engine** | databáze |
| Obory | **Obory** | databáze, relace „Obor (DB)“ z Lead engine |
| Deník nočních běhů | **Lead engine – běhy** | databáze |
| Týdenní vyhodnocení | **Lead engine – týdenní vyhodnocení** | stránka, vyhodnocení jsou její podstránky |
| Scénář hovoru | **Cold call – scénář (2 min)** | stránka |

Všechno je pod stránkou Marketing.

## Čtení

**Čti vždy přes pohled databáze, nikdy přes SQL.** SQL dotazy (`query-data-sources` s `mode: "sql"`) mají na tomhle tarifu Notionu společný limit pro celý workspace. 29. 9. odpoledne se vyčerpal a jeden běh kvůli tomu skončil bez hledání. Čtení přes pohled limit nemá.

1. `search` podle názvu databáze → `fetch` databáze. Ve výsledku je seznam **Views**, vezmi první pohled (`view://<ID pohledu>`).
2. Slož adresu `https://www.notion.so/<ID databáze bez pomlček>?v=<ID pohledu bez pomlček>`.
3. `query-data-sources` s `mode: "view"`, `view_url` z bodu 2 a `page_size: 100`. Dokud je v odpovědi `has_more: true`, volej znovu se `start_cursor` = `next_cursor`.
4. Pohled vrací všechny vlastnosti, i ty, které v tabulce nejsou vidět. Nevrací čas založení. Místo něj ber datum `Ověřeno`, u leadů z rutiny je to den založení.

Co z toho kdo potřebuje:

- **Zásoba po oborech a známé domény:** Lead engine, vlastnosti `Obor`, `Stav`, `Web`.
- **Deník běhů:** databáze „Lead engine – běhy“, stejným postupem.
- **Pro vyhodnocení:** všechny vlastnosti z `rutiny/tydenni-vyhodnoceni.md` → Data. Datumy jsou pod klíči `date:Osloveno:start`, `date:Follow-up:start` a `date:Ověřeno:start`.

## Když čtení selže

**Neskonči.** Hledání má cenu i bez přesné zásoby.

1. **Obor** vyber podle deníku: ten, který nejdéle neběžel. Když nejde přečíst ani deník, vezmi obor s prioritou 1 podle dne v týdnu: pondělí první v tabulce Obory, úterý druhý a tak dál.
2. **Známé domény:** `known_domains.txt` nech prázdný. Před každým zápisem hledej doménu v Lead engine nástrojem `search` s `data_source_url` Lead engine. Když se najde, lead nezapisuj.
3. Do Poznámky v deníku napiš, co selhalo a jak jsi to obešel.

## Deník běhů a týdenní vyhodnocení

- **Deník:** databáze „Lead engine – běhy“, čtení přes pohled (viz Čtení). Nový řádek: Běh = nadpis záznamu, Datum = dnes, ostatní pole podle `rutiny/nocni-hledani.md` → krok 8.
- **Vyhodnocení:** podstránka stránky „Lead engine – týdenní vyhodnocení“, název `Týden do RRRR-MM-DD`.

## Zápis nového leadu

Stránka v data source „Lead engine“:

| Vlastnost | Hodnota |
|---|---|
| Firma | název firmy (bez s.r.o. jen když je to zjevně stejné) a v závorce město, např. „Truhlářství Mareš (Třebíč)“ |
| Web | adresa, na které web opravdu běží |
| Telefon, E-mail | z Firmy.cz nebo z webu, jen ověřené |
| Obor | přesně jeden z názvů v `STRATEGIE.md` → Obory |
| Obor (DB) | relace na řádek v databázi Obory, podle tabulky níž |
| Stav | `stav_novych` z Nastavení (výchozí Ověřit) |
| Známka | `A – volat první` / `B – volat` / `C – až když není co` |
| Skóre | A: 8–10, B: 5–7, C: 3–4 (RULES.md) |
| Služba | `Nový web` / `Opravy a zrychlení` / `Audit poptávek` (varianta B testu T2 = Audit poptávek) |
| Varianta zprávy | `A` nebo `B` podle testu T2 |
| Proč volám, Co nabízím, Důkaz | podle RULES.md → Texty do Notionu |
| PSI mobil, PSI desktop | skóre výkonu z `result.json` |
| Ověřeno | dnešní datum |
| Velikost | z ARES: `1-10` / `10-50` / `50-250` / `250+` |
| Rozhodovatel | jméno a role z ARES (jednatel) |
| Kanál | `Telefon` |
| Zdroj | `zdroj` z Nastavení |
| Běh enginu | `RRRR-MM-DD · <dotaz> · p<n>`, nejvýš 60 znaků |
| Poznámka | adresa a IČO, např. „Havířská 338, Kladno. IČO 12345678.“ |

## Obor → řádek v databázi Obory

Názvy se liší, proto tabulka:

| Obor (pole Obor) | Řádek v databázi Obory |
|---|---|
| Rekonstrukce bytů a domů | Rekonstrukce bytů a domů |
| Dřevostavby a RD na klíč | Dřevostavby a rodinné domy na klíč |
| Bazény – zimní zahrady – pergoly | Bazény, zimní zahrady, pergoly |
| Stavební firmy | Stavební firmy |
| Střechy a klempířství | Střechy a klempířství |
| Okna – dveře – stínění | Okna, dveře, stínění |
| Kuchyně a nábytek na míru | Kuchyně a nábytek na míru |
| Kliniky | Zubní a estetické kliniky |
| Penziony a hotely | Penziony, hotely a eventové lokace |
| Studny – vrty – ČOV | Studny, vrty a čistírny odpadních vod |
| Haly a ocelové konstrukce | Montované haly a ocelové konstrukce |
| Zateplení a fasády | Zateplení a fasády |
| Tepelná čerpadla – FVE – klimatizace | Tepelná čerpadla, FVE, klimatizace |

## Co nedělat

- Neměnit existující leady, jejich stav ani poznámky.
- Nemazat ani nepřesouvat stránky.
- Nepřidávat do databází nové vlastnosti ani možnosti výběru.
