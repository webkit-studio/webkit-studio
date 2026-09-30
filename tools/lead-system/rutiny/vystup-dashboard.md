# Výstup: dashboard

Platí, když je ve `STRATEGIE.md` → Nastavení rutin `výstup` = `dashboard`. Dashboard běží na `https://webkit.studio/dashboard` a od 30. 9. 2026 je **jediné místo, kde Lukáš volá a zapisuje výsledky hovorů**. Leady z Notionu (Lead engine) jsou do něj převedené. Do dashboardu jde i deník běhů a týdenní vyhodnocení. **Notion rutina nepotřebuje** a nemá do něj zapisovat.

## Přístup

Token dashboardu je v proměnné prostředí `WKD_TOKEN`. **Nikdy ho nevypisuj**, ani v příkazu (`echo`), ani v logu.

Když `WKD_TOKEN` chybí:
1. Zapiš do deníku výsledek „Chyba“ s poznámkou „chybí WKD_TOKEN“.
2. Nic nezapisuj jinam.
3. Skonči.

## Čtení

```bash
curl -s -H "Authorization: Bearer $WKD_TOKEN" https://webkit.studio/dashboard/api/leads -o leads.json
```

Vrací `{"leads": [...]}`: **všechny** leady včetně archivu. U každého jsou mimo jiné:

| Pole | Co to je |
|---|---|
| `name`, `web`, `field` | firma, web, obor (název ze `STRATEGIE.md`) |
| `status` | stav, viz tabulka níž |
| `grade`, `variant`, `service`, `source`, `engineRun` | známka, varianta testu T2, služba, zdroj, běh enginu |
| `contactedAt`, `followUpAt` | datum oslovení a follow-upu |
| `responseMd`, `note`, `outcome`, `lostReason` | odpověď firmy, poznámka, výsledek hovoru, důvod „ne“ |
| `createdAt`, `verifiedAt` | založení a ověření |

- **Známé domény:** `web` všech leadů, včetně archivu.
- **Zásoba po oborech:** leady ve stavu `k_osloveni` a `navrh`, podle `field`.

**Stavy a jak je číst** (pro týdenní vyhodnocení):

| `status` | Význam | Kód ze `STRATEGIE.md` |
|---|---|---|
| `navrh` | čeká na Lukášovo schválení | – (zásoba) |
| `k_osloveni` | schválený, k volání | – (zásoba) |
| `osloven` | oslovený, bez jasného výsledku | kód z `responseMd` nebo `note`, jinak odhad |
| `ozvat_pozdeji` | ozvat se později | `[později]` |
| `poslat_datum_callu`, `replied` | zájem, čeká na termín nebo podklady | `[zájem]` |
| `meeting` | domluvený videohovor | `[videohovor]` |
| `poslat_nabidku` | chce nabídku | `[nabídka]` |
| `quoted` | nabídka odeslána | `[nabídka]` |
| `won` | zakázka | – |
| `zruseno` | nezájem | `[ne: …]`, důvod z `lostReason` nebo `responseMd` |
| `archiv` | vyřazeno (i leady ve stavu Ne z Notionu) | `[ne: …]`, když je `contactedAt`, jinak vyřazený lead |
| `poptavka`, `ozvat_se` | poptávka, která přišla sama | mimo trychtýř hovorů, ale počítá se do cíle |

Kód na začátku `responseMd` nebo `note` (`[zájem]`, `[ne: má dodavatele]` …) má přednost před odhadem ze stavu.

## Zápis nového leadu

```bash
curl -s -X POST https://webkit.studio/dashboard/api/leads \
  -H "Authorization: Bearer $WKD_TOKEN" -H "Content-Type: application/json" \
  -d @lead.json
```

- Lead vzniká vždy jako **návrh** (`navrh`). Lukáš ho schválí v Obchod → Leady.
- Duplicita se pozná podle domény webu. Odpověď `200 {"duplicate":true}` znamená, že se nic nezaložilo. To je v pořádku, pokračuj dalším.
- `201` = založeno. `400` = špatná nebo příliš dlouhá hodnota: oprav ji a zkus znovu.
- Limit je 120 zápisů za minutu. `429` = počkej minutu.

| Pole API | Obsah | Limit |
|---|---|---|
| `name` | Firma a v závorce město, např. „Truhlářství Mareš (Třebíč)“ | 200 znaků |
| `web` | adresa, na které web opravdu běží | 300 |
| `phone`, `email` | jen ověřené | 60, 200 |
| `field` | Obor, přesně název ze `STRATEGIE.md` → Obory | 100 |
| `size` | `1-10` / `10-50` / `50-250` / `250+` z ARES | |
| `decisionMaker` | jméno a role z ARES | 200 |
| `grade` | `A` / `B` / `C` | |
| `score` | A: 8–10, B: 5–7, C: 3–4 | 0–10 |
| `service` | `web` (Nový web) / `opravy` (Opravy a zrychlení) / `audit` (Audit poptávek, varianta B testu T2) | |
| `variant` | `A` nebo `B` podle testu T2 | 100 |
| `reason` | Proč volám | 2000 |
| `offer` | Co nabízím | 2000 |
| `proof` | Důkaz | 5000 |
| `psiMobile`, `psiDesktop` | skóre výkonu z `result.json` | 0–100 |
| `verifiedAt` | dnešní datum `RRRR-MM-DD` | |
| `channel` | `Telefon` | |
| `source` | `zdroj` z Nastavení | 100 |
| `engineRun` | Běh enginu `RRRR-MM-DD · <dotaz> · p<n>` | **60 znaků** |
| `signals` | `{"vzhled": ["Reklamy"]}` u firmy, která platí za marketing (test T3) | |
| `note` | adresa, IČO a u platící firmy co platí („Platí: Firmy.cz profil, Google Ads“) | 5000 |

**Běh enginu se musí vejít do 60 znaků**, jinak API odmítne celý lead. Když je dotaz dlouhý, zkrať ho (např. „n. L.“ místo „nad Labem“). Varianta testu patří do `variant`, ne do `engineRun`.

## Deník běhů

Dokument **„Lead engine – běhy“** v knihovně dokumentů dashboardu. Nejnovější záznam je nahoře.

**Čtení:**

```bash
curl -s -H "Authorization: Bearer $WKD_TOKEN" "https://webkit.studio/dashboard/api/documents?knihovna=1" -o docs.json
```

Najdi dokument s titulkem „Lead engine – běhy“ a vezmi jeho `id`. Celý text je v `GET /api/documents/<id>` → `document.bodyMd`. Pole `verze` si ulož, potřebuješ ho k zápisu.

**Zápis:** nový záznam vlož hned pod úvodní odstavce, nad první záznam `## …`, a ulož celý dokument:

```bash
curl -s -X POST "https://webkit.studio/dashboard/api/documents/<id>" \
  -H "Authorization: Bearer $WKD_TOKEN" -H "Content-Type: application/json" \
  -d '{"akce": "ulozit", "bodyMd": "<celý nový text>", "verze": "<verze z čtení>"}'
```

- `409` = dokument se mezitím změnil. Načti ho znovu, vlož záznam a ulož ještě jednou.
- Tělo požadavku skládej v Pythonu nebo Node (`json.dumps`), ne ručně v shellu. Text obsahuje uvozovky a nové řádky.

**Tvar záznamu** (pole z `rutiny/nocni-hledani.md` → krok 8):

```
## RRRR-MM-DD <Obor>
- Výsledek: OK
- Zapsáno: 3
- Firem prošlo: 112
- Kandidátů: 24
- Dotazy: dotaz 1;dotaz 2;…
- Poznámka: jedna až dvě věty
```

Když dokument chybí, založ ho `POST /api/documents` s tělem `{"type": "note", "title": "Lead engine – běhy", "bodyMd": "# Lead engine – běhy\n\n<záznam>"}`.

## Týdenní vyhodnocení

Každé vyhodnocení je **samostatný dokument** v knihovně dashboardu s titulkem `Lead engine – týden do RRRR-MM-DD`.

- **Minulé vyhodnocení:** v `GET /api/documents?knihovna=1` dokument s titulkem, který začíná „Lead engine – týden do“, s nejnovějším datem.
- **Nové:** `POST /api/documents` s tělem `{"type": "note", "title": "Lead engine – týden do RRRR-MM-DD", "bodyMd": "<text>"}`.
- Do shrnutí napiš titulek dokumentu a odkaz na knihovnu `https://webkit.studio/dashboard/knihovna`.

## Když zápis do dashboardu selže

**Neskonči a nezapisuj do Notionu.** Záznam deníku nebo celé vyhodnocení dej do shrnutí rutiny. Připiš, co selhalo (kód odpovědi), ať to Lukáš může doplnit.

## Co by dashboard ještě měl mít (předání pro chat, který dashboard vyvíjí)

1. **Token jen na leady.** Rutina teď používá token se scope `admin`, který otevírá i finance. Rutina finance nečte ani nemění, ale token jen pro leady a hovory by byl bezpečnější.
2. **Historie hovorů v `GET /api/leads`.** Dnes je u leadu jen poslední výsledek (`outcome`, `naposledyOsloven`). Pro vyhodnocení by pomohl počet pokusů o dovolání.
