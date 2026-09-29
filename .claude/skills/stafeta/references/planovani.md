# Plánování štafety

## 1. Zadání od Lukáše → cílový stav
Sepiš, co má na konci fungovat a jak se to pozná. Chybí-li podstatné, zeptej se cíleně (nejvýš pár otázek s doporučenou odpovědí). Rozpory a slabá místa řekni na rovinu.

## 2. Rozdělení na session
- Jedna session ≈ 1–2 h práce, jeden ucelený výsledek, jedna migrace.
- Pořadí: nejdřív základy, na kterých ostatní stojí (datový model, engine, navigace), pak obrazovky, pak integrace.
- **Fáze podle `references/faze.md`:** nejdřív session D pro design systém, strukturu a návrh obrazovek, každá končí schválením. Issues stavby založ až po schválení (nebo je založ se stavem `čeká na schválení` a závislostí na D).
- Data a API odděl od UI, když UI čeká na jinou session – mohou běžet souběžně (lane F vs lane E v dashboardu).

## 3. Lane
Lane = oblast kódu, kterou mění jen ona. Pro každou lane v `docs/pipeline.md`: pořadí session a „nesahá na" (soubory druhé lane). Nejvýš dvě souběžné session.

## 4. Issue session – šablona
`assets/issue-session.md`. Povinné: kód a název, **schválený návrh** (odkaz; u UI bez něj se nespouští), model a effort, závisí na, rezervovaná migrace, sady testů, stav, další v lane, **Proč** (citace Lukáše), **Zadání**, **Mimo rozsah**, **Hotovo znamená** (ověřitelná kritéria: testy, snímky, produkce).

## 5. Tabulka session
V `docs/pipeline.md`: kód · název · issue · závisí na · migrace · sada · stav. Stav je jen snímek – pravdu drží issue.

## 6. Kódy session
S = stavba podle plánu, D = návrh, E/x = etapa přepisu, H = hotfix, R = revize/audit, P = výkon, L = rychlá úprava pro provoz. Kód je v názvu session i issue.
