# Výstup: dashboard

Platí, když je ve `STRATEGIE.md` → Nastavení rutin `výstup` = `dashboard`. Dashboard běží na `https://webkit.studio/dashboard`. Deník běhů a týdenní vyhodnocení zůstávají v Notionu (`rutiny/vystup-notion.md` → Kde co je).

## Přístup

Token dashboardu je v proměnné prostředí `WKD_TOKEN` (Nastavení → Tokeny v dashboardu). **Nikdy ho nevypisuj.**

Když `WKD_TOKEN` chybí:
1. Zapiš do deníku výsledek „Chyba“ s poznámkou „chybí WKD_TOKEN“.
2. Nic nezapisuj jinam.
3. Skonči.

## Zápis nového leadu

Když má session konektor dashboardu, použij MCP nástroj `create_lead`. Jinak API:

```bash
curl -s -X POST https://webkit.studio/dashboard/api/leads \
  -H "Authorization: Bearer $WKD_TOKEN" -H "Content-Type: application/json" \
  -d @lead.json
```

- Lead vzniká vždy jako **návrh**. Lukáš ho schválí v Obchodu → Leady.
- Duplicita se pozná podle domény webu. Odpověď `200 {"duplicate":true}` znamená, že se nic nezaložilo ani nepřepsalo. To je v pořádku, pokračuj dalším.
- `201` = založeno. `400` = špatná hodnota (typicky `service` nebo `grade`), oprav a zkus znovu.

| Pole API | Obsah (stejný jako v Notionu) |
|---|---|
| `name` | Firma |
| `web` | Web |
| `phone`, `email` | Telefon, E-mail |
| `field` | Obor (název ze `STRATEGIE.md`) |
| `size` | `1-10` / `10-50` / `50-250` / `250+` |
| `service` | `web` (Nový web) / `opravy` (Opravy a zrychlení) / `audit` (Audit poptávek) |
| `grade` | `A` / `B` / `C` |
| `score` | Skóre |
| `reason` | Proč volám |
| `offer` | Co nabízím |
| `proof` | Důkaz |
| `psiMobile`, `psiDesktop` | PSI mobil, PSI desktop |
| `verifiedAt` | dnešní datum `RRRR-MM-DD` |
| `decisionMaker` | Rozhodovatel |
| `channel` | `Telefon` |
| `source` | `zdroj` z Nastavení |
| `engineRun` | Běh enginu (obsahuje i variantu testu) |
| `note` | adresa a IČO |

## Čtení

- **Známé domény a zásoba** (`GET /api/leads`) vyžadují token se scope `admin`.
  - Bez něj nejde zásobu spočítat. Obor vyber jen podle deníku (ten, který nejdéle neběžel).
  - Na duplicity se spolehni na odpověď `duplicate`.
- **Týdenní vyhodnocení** potřebuje leady i výsledky hovorů, tedy taky `admin`. Bez něj napiš do vyhodnocení, že data z dashboardu nejsou dostupná, a vyhodnoť jen deník běhů.

## Co musí dashboard ještě mít (předání pro chat, který dashboard vyvíjí)

1. **Čtení leadů pro rutinu bez přístupu k financím.** Dnes `GET /api/leads` i MCP `list_leads` vyžadují scope `admin`, který otevírá i finance. Rutina potřebuje číst leady a hovory, finance ne.
2. **V odpovědi u leadu:**
   - stav,
   - datum oslovení,
   - follow-up,
   - výsledek posledního hovoru,
   - poznámka a „Odpověď firmy“,
   - známka, obor, zdroj a „běh enginu“.

   Bez výsledků hovorů se nedá vyhodnotit, co vede k poptávkám.
3. **Varianta testu.** Stačí, že je v `engineRun` (`… · var A`). Samostatné pole není nutné.
4. **Kódy výsledku hovoru** ze `STRATEGIE.md` → Zápis výsledku hovoru. Výsledek jedním klikem už je, důvod „ne“ jde na začátek poznámky jako `[ne: důvod]`.
