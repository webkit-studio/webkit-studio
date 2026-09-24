# Pravidla hodnocení leadů

Cíl: zavolat majiteli a domluvit 30min videohovor s rozborem webu zdarma. Prodává se **výsledek**: víc zákazníků z webu.

**Každý důvod k hovoru musí jít ověřit za 10 sekund.** Otevřu web na telefonu nebo v PageSpeed Insights a vidím totéž.

## Co platí jako důkaz

- **Google PageSpeed Insights (PSI)** – `result.json → psi.mobile / psi.desktop`. Měří Google zvenku. Jediný zdroj pro rychlost, HTTPS a rozbité soubory.
- **Screenshoty `mobile.jpg` a `desktop.jpg`** – vyfotil je Google. Před hodnocením je vždycky otevři.
- **`dom`** – statická fakta z načtené stránky (viewport, formulář, `tel:` odkazy, patička, IČO). Když `dom` chybí, tato fakta neznáš.
- **Nic z paměti ani odhadem.** Co není vidět na screenshotu nebo v datech, neexistuje.

> Proč tak přísně: cloudový kontejner jde přes proxy, která vrací timeouty a chyby, které u zákazníka nejsou. Jednou z toho vznikl „web se načítá 7 s“ u webu s PSI 100. Proto se síťová měření berou jen z Googlu.

## Důvody volat

### Úroveň 1 – otvírák (zákazník to uvidí sám)

| Kód | Co | Jak ověřit | Služba |
|---|---|---|---|
| R1 | Na mobilu zmenšená verze pro počítač | `mobile.jpg` + `dom.viewportMeta = false` | Nový web |
| R2 | Chrome píše „Nezabezpečeno“ | `finalUrl` začíná `http://` **a zároveň** `httpscheck.mjs` potvrdí, že https nefunguje | Opravy a zrychlení |
| R3 | Web je rozbitý | Chybová stránka, lorem ipsum, rozsypané rozložení na screenshotu | Opravy a zrychlení |
| R4 | Web je pomalý | PSI mobil < 30 **a zároveň** desktop < 60 | Opravy a zrychlení |
| R5 | Vzhled o dekádu pozadu | Na obou screenshotech zjevně 2008–2015 i pro laika | Nový web |

### Úroveň 2 – doplněk, ne otvírák

- **R6** Na první obrazovce mobilu není telefon ani tlačítko poptávky.
- **R7** Chybí poptávkový formulář.
- **R8** Reference nebo patička ≤ 2019 a nic novějšího.
- Telefon jde jen opsat, ne prokliknout (`dom.telLinks = 0`). Silné v kombinaci s R1.

Jen podpůrné: žádné měření návštěvnosti, stará verze WordPressu nebo jQuery.

## Nevolat

- **N1** Moderní web: responzivní, PSI mobil ≥ 50 nebo desktop ≥ 80, telefon nahoře.
- **N2** E-shop, franšíza, šablona výrobce, katalog, agentura. Firmy postavené na designu (architekti).
- **N3** Firma nežije.
- **N4** Jen důvody úrovně 2 → nejvýš známka C.
- **N5** PSI selhalo a screenshot chybí → nevolat, dokud se nepřeměří (`repsi.sh`).

## Pasti, na které jsme narazili

- **Chrome sám zkouší https.** Web na `http://` neznamená „Nezabezpečeno“. Vždycky pusť `httpscheck.mjs`.
- **Blokace zahraničních IP.** Google (USA) dostal stránku bez stylů, z Česka se načetla normálně. Když Google vidí rozbitý web, ale soubory z Česka vrací 200, je to blokace, ne argument.
- **Adresa s www a bez www.** Firmy.cz může odkazovat na `www.`, která hází chybu 500, zatímco adresa bez www funguje. To je dobrý a ověřitelný háček: „když na vás kliknu z Firmy.cz…“.
- **Čísla na webu stárnou.** Web psal 18 zaměstnanců, ARES 6–9. Počet lidí říkej jen podle ARES.
- **Střední skóre PSI (např. 58/84) není důvod.** Rychlost jen podle R4.

## Známka

| Známka | Kdy | Skóre |
|---|---|---|
| A – volat první | Úroveň 1 + signál peněz (pobočky, showroom, 10+ lidí v ARES, ≥ 30 hodnocení na Firmy.cz) | 8–10 |
| B – volat | Úroveň 1, nebo 2× úroveň 2 | 5–7 |
| C – až když není co | Jen 1 důvod úrovně 2 | 3–4 |
| Nevolat | N1–N5 | 0–2 |

## Texty do Notionu

**Proč volám** (tak, jak to řekneš do telefonu, 2–3 věty):
1. Konkrétní pochvala z faktů: rok založení, pozice na Firmy.cz, počet hodnocení, fotky realizací.
2. „Ale když otevřu váš web na telefonu, …“ + důvod úrovně 1.
3. „Tak jsem si říkal, že vám zavolám.“

**Co nabízím** (2–3 věty): 30 minut na videu, projdeme web z telefonu očima zákazníka. Rozbor dostanou sepsaný a můžou ho dát svému dodavateli. Když budou chtít, pomůžeš se [Služba].

**Důkaz**: co přesně je ověřené (PSI, screenshot, `tel:` odkazy, pořadí na Firmy.cz, ARES). A velkými písmeny, co **neříkat** (např. „Rychlost OK – NEŘÍKAT“).

**Zakázaná slova:** chyby, skutečný problém, konzultant, diagnostika, ošklivý, hrozný, zastaralý. Popiš, co je vidět.
