# Roadmap v2

Plán celého projektu je v `docs/pipeline.md`, tabulka session a zadání v `docs/web-v2/zadani.md`.

| Fáze | Session | Brána |
|---|---|---|
| A · Analýza | B01, B02 | ✋A positioning a nabídka |
| B · Strategie + C · Design | T01, D01 | ✋B strategie a design |
| D · Texty | T02, pak T03 | ✋C vzorové texty |
| E · Stavba | S01 → S02 → S03 → S04 ∥ S05 → P01 | brány protokolu |
| F · Spuštění | R01, L01 | ✋D publikace |
| G · Ladění | M01 (rutina), O0x | data před a po |

## Stav
_Aktualizováno: 1. 10. 2026 · D02_

**Hotovo:** K00 – založená štafeta, zadání, reference Halo Lab, issues. B01 (#10) – služby, zákazníci, nabídka (`docs/web-v2/B01-sluzby-zakaznici.md`). D01 (#13) – design systém, knihovna komponent a náhled homepage a 3 služeb ([artifact](https://claude.ai/artifact/3rGAWQ952JovDCbNPHzFM1), `docs/web-v2/D01-design-system.md`). B02 (#11) – trh, klíčová slova, GEO, katalogy (`docs/web-v2/B02-trh-vyhledavani.md`). D02 (#43) – redesign náhledu podle zpětné vazby: simple, obecná homepage, texty ve stylu Halo Lab (stejný artifact, `docs/web-v2/D02-zmeny.md`).
**Rozpracováno:** nic.
**Další krok:** Lukáš kontroluje ducha redesignu D02 a odpoví na 3 ano/ne otázky v #43. Pak S01 nebo D03 spouští koordinátor. Pak ✋A (positioning a nabídka): B01 a B02 jsou hotové, čeká se na schválení Lukášem (5 + 5 ano/ne otázek v #10 a #11).
**Blokery:** žádné.

### Na Lukášovi
| Co | Proč | Od kdy |
|---|---|---|
| Odpovědět na 5 ano/ne otázek k designu v #13 (začátek `D01-design-system.md`) | Bez nich S01 nezačne stavět | 30. 9. 2026 |
| Vyplnit dotazník faktů z B01 (15 otázek v #10, stačí krátké odpovědi) a rozhodnout 5 otázek ano/ne v B01 | Bez faktů zůstanou v textech `[DOPLNIT]`, rozhodnutí potřebuje T01 | 29. 9. 2026 |
| Přístup k GA4 a Search Console pro session (servisní účet / token v prostředí) | Rutina M01 a ověření v L01 | před L01 |
| Rozhodnout 5 otázek ano/ne v B02 a ověřit stav Webflow partnerství (URL profilu), osobní schůzky s klienty (Google Business Profile) a adresu pro Firmy.cz | Mapa URL pro T01, profily v katalozích pro SEO a GEO | 29. 9. 2026 |
