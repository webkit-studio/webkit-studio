# Noční hledání – postup rutiny

Běží pondělí až pátek ve 2:00. **Cíl: přidat do zásoby 3–8 ověřených leadů z jednoho oboru.** Kvalita je přednější než počet: raději 2 jisté leady než 8 sporných. Každý lead, který Lukáš ráno vyřadí, stojí víc než lead, který nevznikl.

## 0. Pravidla

- **Nikoho neoslovuj, nic neposílej, nic nemaž** a neměň existující leady.
- **`PSI_API_KEY` nikdy nevypisuj** – ani v příkazu (`echo`), ani v logu, ani ve shrnutí. Ověřuj jen, jestli existuje.
- Co neprošlo ověřením podle `RULES.md`, nezapisuj. Co nevidíš na screenshotu nebo v datech, neexistuje.
- Nejvýš 2,5 hodiny práce. Pak zapiš, co máš, a skonči.
- **Chyba při čtení výstupu (Notion, dashboard) není důvod skončit.** Postup je v `rutiny/vystup-<výstup>.md` → Když čtení selže.

## 1. Přečti

Cesty jsou vůči `tools/lead-system/` v repu.

1. `STRATEGIE.md` – nastavení, obory, města, testy. **Hodnoty z tabulky Nastavení rutin platí přednostně před čímkoli tady.**
2. `RULES.md` – jak hodnotit web, známky, texty, pasti.
3. `rutiny/vystup-<výstup>.md` podle klíče `výstup` v Nastavení – kam a jak zapisovat.

## 2. Kontrola prostředí

```bash
cd tools/lead-system
test -n "$PSI_API_KEY" && echo "klíč je" || echo "KLÍČ CHYBÍ"
npm install --no-audit --no-fund --silent
```

**Když klíč chybí:**
1. Zapiš řádek do deníku (krok 8) s výsledkem „Chybí klíč“.
2. Skonči. Do shrnutí napiš: „Chybí PSI_API_KEY v prostředí Webkit.Studio – návod v tools/lead-system/README.md → Klíč PSI.“

## 3. Vyber obor a města

1. **Deník běhů** (Notion databáze „Lead engine – běhy“): přečti běhy za posledních 30 dní.
2. **Zásoba:** z výstupu spočítej leady po oborech ve stavu Oslovit + Ověřit (v dashboardu k_osloveni + navrh). Jak číst, je v `rutiny/vystup-<výstup>.md` → Čtení.
3. **Obor** vyber podle `STRATEGIE.md` → „Jak rutina vybere obor na noc“. Dnešní den v týdnu ber v čase Europe/Prague.
4. **Města:** `dotazu_za_noc` měst podle `STRATEGIE.md` → „Trhy“:
   - okresní města ze zásobníku,
   - u tohoto oboru ne ta, která byla v deníku za posledních 30 dní,
   - střídej kraje, max 4 města z jednoho kraje.
5. **Dotazy:** klíčové slovo oboru + město, např. `rekonstrukce bytů Kolín`. Když má obor víc klíčových slov, střídej je mezi městy.

## 4. Známé domény

Vytáhni z výstupu weby **všech** leadů (všechny stavy) a ulož domény do `known_domains.txt`, jednu na řádek, bez `www.` a bez cesty. Pipeline je pak přeskočí a neplýtvá měřením.

## 5. Hledání a měření

```bash
cd tools/lead-system
JEN_PLACENE=<1 když jen_platici = ano, jinak 0> SKIP=<skip> NA_DOTAZ=<na_dotaz> ./beh.sh <slozka> "<Obor>" "<dotaz 1>;<dotaz 2>;..."
```

- S `JEN_PLACENE=1` projdou jen firmy s placeným profilem na Firmy.cz. V logu jsou ostatní jako `- neplatí za Firmy.cz`, u kandidátů je `PLATÍ Firmy.cz`.

- `<slozka>` je krátký název bez mezer a diakritiky, např. `rekonstrukce-0930`.
- Běh trvá 30–60 minut. Pusť ho na pozadí a čekej na konec.
- Výsledkem je `shortlist.json` a přehledy screenshotů `runs/<slozka>/prehled-*.png`. Platící firmy jsou v shortlistu nahoře se `$`, pole `paid` (Firmy.cz) a `ads` (reklamní kódy).
- Log je v `runs/<slozka>/log.txt`. Počet řádků `+ kandidát` = kandidátů, počet řádků se `search` = dotazy.

**Druhé kolo:** když po posouzení (krok 6) vychází méně než 3 leady a od začátku uplynulo méně než 90 minut, pusť druhé kolo. Stejný obor, dalších `dotazu_za_noc` měst (jiná než v prvním kole), nová složka. Do deníku jde jeden řádek za oba běhy.

**Když ani po druhém kole nic není:** zapiš běh do deníku s výsledkem „Málo leadů“ a skonči.

## 6. Posuď kandidáty

Pro každý web ze `shortlist.json` (v poli `dir` je složka s `result.json`, `mobile.jpg` a `desktop.jpg`):

1. **Podívej se na `mobile.jpg` a `desktop.jpg`.** Nebo nejdřív na přehled `prehled-*.png`, a jednotlivé screenshoty otevři jen u slibných.
2. **Najdi důvod úrovně 1** podle `RULES.md` (R1–R5, u platících firem i NOCTA, NOFORM, SLOW) a ověř ho přesně tak, jak tam stojí.
   - U platící firmy se podívej na horní část `mobile.jpg`: je na první obrazovce tlačítko nebo telefon? Co nevidíš na screenshotu, neříkej.
   - Signál placení ověř podle `RULES.md` → Platí za marketing. Do leadu napiš, co přesně platí (Firmy.cz, Google, Meta, Sklik).
   - Příznak `HTTP?` → `node httpscheck.mjs <host>`.
   - Příznak `SPAM` → ověř ve zdrojovém kódu.
   - Příznak `ERR?` → zkus i adresu s `www.` a bez něj.
3. **Vyřaď** vše, co spadá pod N1–N5 nebo pod „Nechceme“ ve `STRATEGIE.md`. Obchodní řetězce a velkoprodejny (Kaufland, Tesco, OBI, Hornbach, Mountfield a podobně) pipeline vynechá sama, seznam je v `pipeline.mjs` → `CHAIN`. Když nějaký proklouzne, vyřaď ho a napiš jeho doménu do Poznámky v deníku.
4. **Firma žije a nemá novější web jinde:**
   - Vyhledej název firmy na webu a porovnej IČO a telefon. Podobný název ještě neznamená stejnou firmu.
   - Když má firma novější web, lead nezapisuj.
5. **Velikost a rozhodovatel** z ARES:
   - `https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty-res/<IČO>` → kategorie počtu pracovníků,
   - `.../ekonomicke-subjekty-vr/<IČO>` → jednatel.
   - Počet lidí ber jen z ARES, nikdy z webu.
6. **Známka** A / B / C podle `RULES.md`. C zapisuj, jen když má obor zásobu pod 5.
7. **Texty** Proč volám, Co nabízím a Důkaz podle `RULES.md` → „Texty do Notionu“. U platící firmy podle stavby pro platící firmy (co platí → kde web ztrácí lidi → „za každého takového člověka platíte“).
   - Varianta nabídky podle `STRATEGIE.md` → „Běžící testy“ (T2).
   - Střídej A a B tak, aby jich za noc bylo zhruba stejně. Začni tou, které je v zásobě oboru méně.
8. **Pořadí na Firmy.cz** je v `shortlist.json` → `rank` (`query` a `rank`). Použij ho do pole Běh enginu.

## 7. Zápis

Podle `rutiny/vystup-<výstup>.md`:

- Nejvýš `max_leadu_za_noc` leadů. Přednost mají lepší známky, při shodě vyšší hodnota zakázky.
- Před každým zápisem ještě jednou zkontroluj, že doména ve výstupu není.
- **Platí za marketing** (test T3): u platící firmy přidej signál „Reklamy“ (dashboard `signals: {"vzhled": ["Reklamy"]}`, Notion pole Signály vzhled) a do Poznámky napiš, co platí, např. „Platí: Firmy.cz profil, Google Ads, Sklik“.
- **Běh enginu** = `RRRR-MM-DD · <dotaz> · p<n>`, např. `2026-09-30 · rekonstrukce bytů Kolín · p7`. Nejvýš 60 znaků, dlouhý dotaz zkrať. Varianta testu patří do vlastního pole (Varianta zprávy, v dashboardu `variant`).

## 8. Deník a shrnutí

**Deník:** v Notionu v databázi „Lead engine – běhy“ vždy založ jeden řádek, i když běh skončil chybou:

| Pole | Co tam patří |
|---|---|
| Běh | `RRRR-MM-DD <Obor>` |
| Datum | dnešní datum |
| Obor | obor běhu |
| Dotazy | všechny dotazy oddělené středníkem |
| Firem prošlo | unikátní firmy z Firmy.cz |
| Kandidátů | weby v `shortlist.json` |
| Zapsáno | počet zapsaných leadů |
| Výsledek | OK / Málo leadů / Chyba / Chybí klíč |
| Poznámka | jedna až dvě věty, co brzdilo nebo co se ukázalo |

**Shrnutí** je jediné, co Lukáš ráno čte:

1. Tabulka zapsaných leadů: Firma, Obor, Známka, Varianta, Proč volám (zkráceně na jednu větu).
2. Pod ní tři řádky:
   - kolik firem prošlo a kolik kandidátů,
   - kolik leadů zapsáno,
   - co dnes brzdilo.

Bez omáčky.
