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

- **Zásoba po oborech a známé domény:** SQL dotaz nad data source „Lead engine“, sloupce `Obor`, `Stav`, `Web`.
- **Pro vyhodnocení:** všechny sloupce z `rutiny/tydenni-vyhodnoceni.md` → Data.
  - Datumy jsou ve sloupcích `date:Osloveno:start` a `date:Follow-up:start`.
  - Názvy sloupců s diakritikou a pomlčkou dávej do uvozovek, např. `"E-mail"`.

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
| Běh enginu | `RRRR-MM-DD · <dotaz> · pořadí <n> · var <A/B>` |
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
