# Pravidla hodnocení leadů

Cíl: zavolat majiteli a domluvit 20min videohovor s rozborem webu zdarma. Proč a kde hledat, je ve `STRATEGIE.md`. Prodává se **výsledek**: víc zákazníků z webu.

**Každý důvod k hovoru musí jít ověřit za 10 sekund.** Otevřu web na telefonu nebo v PageSpeed Insights a vidím totéž.

## Co platí jako důkaz

- **Google PageSpeed Insights (PSI)** – `result.json → psi.mobile / psi.desktop`. Měří Google zvenku. Jediný zdroj pro rychlost, HTTPS a rozbité soubory.
- **Screenshoty `mobile.jpg` a `desktop.jpg`** – vyfotil je Google. Před hodnocením je vždycky otevři.
- **`dom`** – statická fakta z načtené stránky (viewport, formulář, `tel:` odkazy, patička, IČO). Když `dom` chybí, tato fakta neznáš.
- **Nic z paměti ani odhadem.** Co není vidět na screenshotu nebo v datech, neexistuje.

> Proč tak přísně: cloudový kontejner jde přes proxy, která vrací timeouty a chyby, které u zákazníka nejsou. Jednou z toho vznikl „web se načítá 7 s“ u webu s PSI 100. Proto se síťová měření berou jen z Googlu.

## Platí za marketing (hlavní cíl od 30. 9. 2026)

Firma, která už za zákazníky z internetu platí, chce marketing. Neprodáváš jí myšlenku, ale lepší výsledek z peněz, které utrácí. **Takové firmy mají přednost před všemi ostatními.**

| Signál | Jak ověřit | Co smíš říct |
|---|---|---|
| Placený profil na Firmy.cz | `candidates.json → paid = true` (v detailu firmy na Firmy.cz `isPaid`) | „Vidím, že platíte za zvýrazněný profil na Firmy.cz.“ |
| Reklamní kód Googlu | `result.json → reklama.google` | „Na webu máte kód pro reklamu Googlu.“ |
| Reklamní kód Mety | `result.json → reklama.meta` | „Na webu máte kód pro reklamu na Facebooku.“ |
| Reklamní kód Skliku | `result.json → reklama.sklik` | „Na webu máte kód pro reklamu na Seznamu.“ |

- **Kód neznamená, že reklama běží právě teď.** Může zůstat po staré kampani. Proto se ptej: „Inzerujete teď?“ Neříkej „platíte za reklamu na Googlu“, dokud to nepotvrdí.
- Když chceš jistotu před hovorem: [Google Ads Transparency](https://adstransparency.google.com) a [Meta Ad Library](https://www.facebook.com/ads/library) podle názvu firmy nebo domény.

**U platící firmy jsou úroveň 1 i tyto nálezy** (web ztrácí lidi, za které firma platí):

| Kód | Co | Jak ověřit |
|---|---|---|
| NOCTA | Na první obrazovce mobilu není tlačítko ani telefon | `mobile.jpg` (horní část) + `dom.ctaInFirstScreen = false` a `dom.telInFirstScreen = false` |
| NOFORM | Na úvodní stránce chybí poptávkový formulář | `dom.inquiryForms = 0`. Říkej „na úvodní stránce“. Na Kontakty se podívej, než řekneš „nikde“. |
| SLOW | Hlavní obsah se na mobilu načítá přes 4 s | `psi.mobile.lcp`. Říkej „podle Googlu“, Google měří na pomalejším mobilním připojení. |

Platí i R1–R5. U platící firmy **neplatí N1**: moderní web, který ztrácí poptávky, je dobrý lead.

- **SLOW nebo NOFORM samy jsou nejvýš známka B.** Silný otvírák je jen to, co zákazník uvidí hned: zmenšený web (R1), chybějící tlačítko a telefon nahoře (NOCTA) nebo rozbitý web.
- **NOFORM se nepočítá**, když je na první obrazovce tlačítko Poptávka nebo Kontakt. Formulář bývá na podstránce.

## Kam lead povede: nový web, nebo úpravy

Do telefonu se prodává jen 20 minut na videu zdarma. Na videu Lukáš nabízí **placený Audit poptávek**: z dat firmy zjistí, kolik ji stojí jedna poptávka a kde ji web ztrácí. Po auditu jsou tři cesty. Celý postup je v Notionu na stránce „Audit poptávek – produkt a postup“.

| Cesta po auditu | Pro koho |
|---|---|
| Zadání pro dodavatele firmy | moderní web, stačí 1–3 úpravy |
| Poptávková stránka ve Webflow | firma platí reklamu (Google, Sklik, Meta), starý web zůstává |
| Nový web ve Webflow | web se na mobilu zmenšuje, běží na stavebnici, nejde upravit, nebo je o dekádu pozadu |

Lukáš realizuje jen ve Webflow a do cizích systémů nesahá. Proto u každého leadu odhadni, kam povede. Systém webu je v `result.json → dom.cms`.

| Odhad | Kdy |
|---|---|
| **Nový web: spíš ano** | R1 nebo R5, web na stavebnici (`dom.cms` Webnode, Wix, eStránky, Mioweb, WebSnadno), nebo copyright a reference nejvýš 2018 |
| **Nový web: možná** | 3 a víc nálezů najednou (např. NOCTA + NOFORM + SLOW), nebo starší vzhled |
| **Nový web: spíš ne** | moderní web a 1–2 nálezy. Po auditu zadání dodavateli, u firmy s reklamou poptávková stránka |

**Do Poznámky** na začátek jeden řádek: `Web: <systém>, © <rok>. Nový web: <odhad>. Po auditu: <cesta>.`

**Do Důkazu** seznam věcí, které ubírají poptávky, každá ověřená na screenshotu nebo v datech. Co zákazník vidí → co udělá. Například „Na první obrazovce mobilu je jen fotka a menu. Kdo přijde z reklamy, neví, kam kliknout.“ Kromě kódů výš počítá i:

- formulář s víc než 5 poli (`dom.formFields`),
- nadpis, ze kterého není poznat, co firma dělá a kde (`dom.h1`),
- cookie lišta nebo vyskakovací okno přes většinu první obrazovky (`mobile.jpg`),
- telefon, na který nejde kliknout (`dom.telLinks = 0`).

## Důvody volat

### Úroveň 1 – otvírák (zákazník to uvidí sám)

| Kód | Co | Jak ověřit | Služba |
|---|---|---|---|
| R1 | Na mobilu zmenšená verze pro počítač | `mobile.jpg` + `dom.viewportMeta = false` | Nový web |
| R2 | Chrome píše „Nezabezpečeno“ | `finalUrl` začíná `http://` **a zároveň** `httpscheck.mjs` potvrdí, že https nefunguje | Opravy a zrychlení |
| R3 | Web je rozbitý | Chybová stránka, lorem ipsum, rozsypané rozložení, výchozí stránka hostingu místo webu, reklama bezplatného hostingu, skrytý spam (sázky, léky) ve zdrojovém kódu | Opravy a zrychlení |
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
- **Firma může mít novější web jinde.** Firmy.cz někdy odkazuje na starou doménu. Před hovorem vyhledej název firmy a porovnej IČO. Podobný název ještě neznamená stejnou firmu (GARANTSTAV Strakonice ≠ GARANTSTAV Praha).
- **Čísla na webu stárnou.** Web psal 18 zaměstnanců, ARES 6–9. Počet lidí říkej jen podle ARES.
- **Střední skóre PSI (např. 58/84) není důvod.** Rychlost jen podle R4.
- **Napadené weby.** `SPAM` v shortlistu = skrytý text o sázkách nebo lécích. Ověř ve zdrojovém kódu (Ctrl+U). Do telefonu říkej „nejspíš napadený“, ne „hacknutý“.
- **Špička Firmy.cz je přelidněná.** 1.–2. místo ve velkém městě obvolávají všichni. Známku A nedávej jen za velikost, když je firma zároveň nahoře ve velkém městě.

## Známka

| Známka | Kdy | Skóre |
|---|---|---|
| A – volat první | Platí za marketing + silný nález: R1–R5, nebo NOCTA ověřené na screenshotu. Nebo úroveň 1 + signál peněz (pobočky, showroom, 10+ lidí v ARES, ≥ 30 hodnocení na Firmy.cz) | 8–10 |
| B – volat | Úroveň 1, nebo 2× úroveň 2 | 5–7 |
| C – až když není co | Jen 1 důvod úrovně 2 | 3–4 |
| Nevolat | N1–N5 | 0–2 |

## Texty do Notionu

**Proč volám** (tak, jak to řekneš do telefonu, 2–3 věty). Mluví přímo k firmě: „děláte“, „váš web“, nikdy „jejich web“.
1. Konkrétní pochvala z faktů: rok založení, pozice na Firmy.cz, počet hodnocení, fotky realizací.
2. „Ale když otevřu váš web na telefonu, …“ + důvod úrovně 1.
3. „Tak jsem si říkal, že vám zavolám.“

**U platící firmy** je stavba jiná. Pořád 2–3 věty a přímo k firmě:
1. Co platí: „Vidím, že platíte za zvýrazněný profil na Firmy.cz“ nebo „Na webu máte kód pro reklamu Googlu, takže do reklamy investujete.“
2. „Ale když z reklamy přijde člověk na váš web z telefonu, …“ + konkrétní nález (na první obrazovce nevidí, jak se ozvat; nenajde formulář; čeká X s).
3. „A za každého takového člověka platíte. Tak jsem si říkal, že vám zavolám.“

**Co nabízím** u platící firmy: „20 minut na videu. Ukážu vám, kde lidé, za které platíte, z webu odcházejí, a co s tím udělat, aby z nich byly poptávky.“ Služba = Audit poptávek.

**Co nabízím** (2–3 věty): 20 minut na videu, projdeme web z telefonu očima zákazníka. „Rozbor dostanete sepsaný a můžete ho předat svému dodavateli, nebo můžeme společně naplánovat, jak dál.“ Služba podle nálezu. U varianty B testu T2 platí text ze `STRATEGIE.md` → Běžící testy.

**Důkaz**: co přesně je ověřené (PSI, screenshot, `tel:` odkazy, pořadí na Firmy.cz, ARES). A velkými písmeny, co **neříkat** (např. „Rychlost OK – NEŘÍKAT“).

**Zakázaná slova:** chyby, skutečný problém, konzultant, diagnostika, ošklivý, hrozný, zastaralý. Popiš, co je vidět.
