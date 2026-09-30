# Strategie lead systému

**Tohle je soubor, který upravuješ.** Noční i sobotní rutina si ho čtou při každém běhu. Co tady změníš, platí od dalšího běhu. Postupy rutin jsou v `rutiny/`, pravidla hodnocení webu v `RULES.md`.

## Cíl: poptávky, ne leady

Úspěch týdne = **domluvené videohovory a z nich poslané nabídky**. Nalezené firmy jsou jen palivo.

| Krok trychtýře | Poznáš podle | Stav v Notionu |
|---|---|---|
| Lead k volání | prošel ověřením | Oslovit |
| Hovor | vytočil jsem číslo | Osloveno + datum Osloveno |
| Dovoláno | kód není `[nedovoláno]` | Osloveno |
| Rozhodovatel | kód není `[recepce]` ani `[nedovoláno]` | Osloveno |
| Zájem | kód `[zájem]` nebo lepší | Odpověď |
| Videohovor | kód `[videohovor]` | Call |
| Nabídka | kód `[nabídka]` | Nabídka |
| Zakázka | podepsáno | Podpis |

### Týdenní cíle

Výchozí odhad. Po dvou týdnech dat je přepočítá sobotní vyhodnocení.

| Metrika | Cíl za týden | Předpoklad |
|---|---|---|
| Hovory | 30 | 6 denně |
| Rozhovor s rozhodovatelem | 12 | 40 % hovorů |
| Videohovory | 3 | 25 % rozhovorů |
| Nabídky | 1 | 1 ze 3 videohovorů |
| Zásoba leadů ve stavu Oslovit | ≥ 40 | u každého oboru s prioritou 1 aspoň 5 |

## Nastavení rutin

| Klíč | Hodnota | Co to dělá |
|---|---|---|
| `výstup` | **dashboard** | Kam noční rutina zapisuje leady a odkud vyhodnocení čte hovory: `dashboard` nebo `notion`. Postup je v `rutiny/vystup-<hodnota>.md`. Od 30. 9. 2026 Lukáš volá jen z dashboardu. |
| `stav_novych` | **Ověřit** | Stav nových leadů v Notionu. `Ověřit` = projdeš je sám, `Oslovit` = rovnou k volání. Dashboard zakládá vždy návrh. |
| `max_leadu_za_noc` | **8** | Víc nezapisovat, i když je víc kandidátů. Přednost mají lepší známky. |
| `dotazu_za_noc` | **30** | Kolik dotazů „obor + město“ jeden běh projde. Z 10 dotazů vychází zhruba 1 lead. |
| `jen_platici` | **ano** | `ano` = měří se jen firmy s placeným profilem na Firmy.cz (proměnná `JEN_PLACENE=1`). `ne` = všechny. |
| `na_dotaz` | **10** | Kolik firem z výsledků Firmy.cz se u každého dotazu prověří (od místa `skip`). Placené profily bývají na prvních místech. |
| `skip` | **0** | Kolik prvních výsledků Firmy.cz přeskočit. Nahoře stojí placené profily, a ty teď chceme. |
| `zdroj` | **Lead systém v2** | Hodnota pole Zdroj u nových leadů. |

## Koho hledáme

**Od 30. 9. 2026: firmy, které za marketing už platí a web jim přitom ztrácí poptávky.** Takové firmě neprodáváš myšlenku marketingu, jen lepší výsledek z peněz, které už utrácí. Firma se špatným webem a bez reklamy většinou marketing nechce („stálá klientela“, „web pro nás nemá hodnotu“).

- **Platí za marketing** (stačí jedno, ověřené podle `RULES.md` → Platí za marketing):
  - placený profil na Firmy.cz (tarify Seznam Naplno, od 12 Kč denně),
  - reklamní kód Googlu (Google Ads), Mety (Facebook, Instagram) nebo Skliku na webu.
- **Web ztrácí poptávky** a zákazník to uvidí sám za 10 sekund: na první obrazovce mobilu není tlačítko ani telefon, chybí formulář, web se na mobilu zmenšuje, je pomalý nebo rozbitý (`RULES.md`).
- **Česká firma nebo živnostník**, u kterého si zákazník vybírá podle webu a zakázka má hodnotu desítek tisíc a víc.
- **Má peníze:** pobočky, showroom, 10+ lidí v ARES, 30+ hodnocení na Firmy.cz, vlastní výroba.

**Nechceme:** e-shopy, franšízy, prodejní místa výrobců (partnerské sítě značek), velké firmy s vlastním marketingovým oddělením, šablony výrobců, katalogy, agentury, firmy postavené na designu (architekti, studia), veřejnou správu, firmy s novějším webem na jiné doméně a firmy, které končí.

## Obory

Priorita určuje, kam jdou noční běhy. Názvy odpovídají poli Obor v Notionu. Delší popis oborů (proč, typické problémy, námitky) je v Notionu v databázi **Obory**.

| Obor | Priorita | Hodnota zakázky | Hlavní háček | Klíčová slova pro Firmy.cz |
|---|---|---|---|---|
| Rekonstrukce bytů a domů | 1 | 0,3–1,5 mil. | lidi porovnávají online, rozhoduje první dojem | rekonstrukce bytů; rekonstrukce domů |
| Dřevostavby a RD na klíč | 1 | 3–15 mil. | výběr trvá měsíce, web a reference jsou důkaz důvěry | dřevostavby; rodinné domy na klíč |
| Bazény – zimní zahrady – pergoly | 1 | 0,3–2 mil. | podzim a zima = plánování na jaro | pergoly na míru; zimní zahrady; zastřešení bazénů |
| Stavební firmy | 1 | 1–30 mil. | investor si firmu prověří na webu | stavební firma |
| Střechy a klempířství | 1 | 0,2–0,8 mil. | zákazník volá prvním třem, weby jsou nejslabší | pokrývač; klempířství; rekonstrukce střechy |
| Okna – dveře – stínění | 1 | 80–400 tis. | poptávky jdou na víc firem, vyhrává rychlá a důvěryhodná | plastová okna; okna a dveře; stínicí technika |
| Kuchyně a nábytek na míru | 2 | 150–600 tis. | vizuální rozhodování, showroomy | kuchyně na míru; truhlářství nábytek na míru |
| Kliniky | 2 | 50–300 tis. na pacienta | pacient vybírá online. Hodně klinik už má dobrý web, třídit přísně | zubní klinika; estetická medicína |
| Penziony a hotely | 2 | provize Bookingu 15–18 % | každá přímá rezervace je bez provize | penzion; hotel |
| Studny – vrty – ČOV | 2 | 100–300 tis. | hledá se jen online, weby patří k nejslabším | studny vrty; domácí čistírny odpadních vod |
| Haly a ocelové konstrukce | 3 | 1–20 mil. | B2B poptávky přes web | ocelové konstrukce; montované haly |
| Zateplení a fasády | 3 | 0,3–1 mil. | dotace drží poptávku | zateplení fasády |
| Tepelná čerpadla – FVE – klimatizace | 3 | 150–500 tis. | obor je přeplněný agenturami, weby bývají dobré | tepelná čerpadla; klimatizace |

**Mimo:** autoservisy, doprava, úklid, e-commerce.

### Jak rutina vybere obor na noc

1. Vezme obory s prioritou 1 a spočítá, kolik mají leadů ve stavech Oslovit a Ověřit.
2. Vybere obor s **nejmenší zásobou**. Při shodě ten, který nejdéle neběžel (deník „Lead engine – běhy“).
3. Když mají všechny obory s prioritou 1 zásobu aspoň 8, použije stejné pravidlo na prioritu 2.
4. **Pátek je průzkum:** vždy obor s prioritou 2 nebo 3, který nejdéle neběžel. Ať máme data i mimo hlavní obory.

## Trhy: kde hledat

- **Výchozí trh jsou okresní a menší města** (10–80 tisíc obyvatel) po celé ČR. Majitel tam bere telefon sám a agentury tam tolik nevolají.
- **Krajská města** jen se `skip` aspoň 5. **Praha, Brno a Ostrava** jen jako test, se `skip` aspoň 10.
- **Za noc** se projde `dotazu_za_noc` dotazů ve tvaru klíčové slovo + město, například „rekonstrukce bytů Kolín“. Město se u stejného oboru neopakuje dřív než po 30 dnech (podle deníku). **Výjimka:** běhy před 30. 9. 2026 se nepočítají, protože přeskakovaly placené profily nahoře (`skip` 5). Kraje se střídají.
- **Penziony:** místo měst turistické oblasti, tedy Krkonoše, Šumava, Jeseníky, Beskydy, Lipno, Jizerské hory, Český ráj, jižní Morava a Vysočina.

**Okresní města podle krajů** (zásobník pro rutinu):

| Kraj | Města |
|---|---|
| Středočeský | Benešov, Beroun, Kladno, Kolín, Kutná Hora, Mělník, Mladá Boleslav, Nymburk, Příbram, Rakovník, Brandýs nad Labem, Říčany |
| Jihočeský | Český Krumlov, Jindřichův Hradec, Písek, Prachatice, Strakonice, Tábor |
| Plzeňský | Domažlice, Klatovy, Rokycany, Tachov |
| Karlovarský | Cheb, Sokolov, Mariánské Lázně |
| Ústecký | Děčín, Chomutov, Litoměřice, Louny, Most, Teplice |
| Liberecký | Česká Lípa, Jablonec nad Nisou, Semily, Turnov |
| Královéhradecký | Jičín, Náchod, Rychnov nad Kněžnou, Trutnov, Dvůr Králové nad Labem |
| Pardubický | Chrudim, Svitavy, Ústí nad Orlicí, Litomyšl |
| Vysočina | Havlíčkův Brod, Pelhřimov, Třebíč, Žďár nad Sázavou |
| Jihomoravský | Blansko, Břeclav, Hodonín, Vyškov, Znojmo |
| Olomoucký | Jeseník, Prostějov, Přerov, Šumperk |
| Zlínský | Kroměříž, Uherské Hradiště, Vsetín, Valašské Meziříčí |
| Moravskoslezský | Bruntál, Frýdek-Místek, Karviná, Nový Jičín, Opava |
| Krajská (se skip ≥ 5) | Plzeň, Liberec, Hradec Králové, Pardubice, Olomouc, Zlín, České Budějovice, Jihlava, Ústí nad Labem, Karlovy Vary |

## Jak hledáme a ověřujeme

Postup, který se osvědčil při ruční práci 24. 9. 2026. Výtěžnost je kolem 5 %: z 60 firem v oboru vyjdou 2–5 leadů.

1. **Firmy.cz:** dotaz obor + město, bere se prvních `na_dotaz` výsledků od místa `skip`. S `jen_platici = ano` projdou dál jen firmy s placeným profilem (v detailu firmy `isPaid`). Placené profily stojí na Firmy.cz nahoře.
2. **Předsítko:** e-shopy a obchodní řetězce vypadnou hned. U neplatících firem i zjevně moderní weby. U platících se měří všechno, protože i moderní web může ztrácet poptávky.
3. **Reklamní kódy:** Google Ads, Meta a Sklik se hledají v HTML webu, v kontejneru Google Tag Manageru a v požadavcích, které zachytil Google PSI.
4. **Google PageSpeed Insights:** skóre a screenshoty mobilu i počítače. Rychlost, HTTPS a vzhled se berou jen odtud, ne z vlastního prohlížeče (proxy v cloudu zkresluje).
5. **Shortlist:** jen weby s nálezem. Platící firmy jsou nahoře (`$`) a patří k nim i nálezy „bez tlačítka a telefonu na první obrazovce“ (`NOCTA`) a „bez formuláře“ (`NOFORM`).
6. **Screenshot vlastníma očima:** důvod musí být vidět na obrázku.
7. **HTTPS kontrola:** web na `http://` ještě neznamená „Nezabezpečeno“ (`httpscheck.mjs`).
8. **ARES:** velikost firmy (počet lidí jen odtud), jednatel, jestli firma žije.
9. **Novější web jinde:** vyhledat název firmy a porovnat IČO a telefon. Podobný název ≠ stejná firma.
10. **Známka A/B/C** a **texty** podle `RULES.md`.

## Jak oslovujeme

- **Telefon** podle scénáře v Notionu: stránka „📞 Cold call – scénář (2 min)“ v Marketingu.
- **Otvírák:** konkrétní pochvala z faktů → „Ale když otevřu váš web na telefonu…“ + co zákazník zažije → „Tak jsem si říkal, že vám zavolám.“
- **Nabídka:** „20 minut na videu, projdeme váš web očima zákazníka. Rozbor dostanete sepsaný zdarma a můžete ho dát svému dodavateli.“ Vždy přímo k firmě, nikdy „dostanou, můžou“.
- **Recepce:** ptát se na majitele **jménem** (jednatel z ARES).
- **E-mail místo hovoru** (recepce, „pošlete to e-mailem“): přirozeně, vřele, věcně, nic úlisného. Stavba je vždy stejná:
  1. odkud mám kontakt,
  2. kdo jsem (jedna věta),
  3. proč píšu (jeden konkrétní nález),
  4. s čím pomáhám,
  5. 20minutový videohovor,
  6. podpis.

  E-mail posílá vždy Lukáš, rutina nikdy.
- **Jak Lukáš e-maily píše** (z jeho oprav konceptů 29. 9. 2026). Platí pro každý koncept, který pro něj připravuješ:
  - **Předmět obecně:** „Webové stránky – návrh termínu na videohovor“, „Webové stránky – problém s rychlostí na mobilu“. Bez názvu firmy a bez poznámek v závorce.
  - **Spolu, ne pro vás:** „kdy spolu můžeme projít váš web“, ne „kdy vám web projdu“.
  - **Kdo jsem, s odkazem:** „vedu webové projekty pro firmy, od auditu po zadání a hotový web. Moji práci najdete na webkit.studio“.
  - **Nástroj vždy vysvětlit:** „Google PageSpeed (nástroj, který měří rychlost a dává webu skóre)“.
  - **Body z hovoru do seznamu.** Co firmu na webu štve, patří do e-mailu jako samostatný bod. Poslední bod smí být obecný: „Další úpravy, které by pomohly…“.
  - **Dodavatel je rovnocenná možnost, ne soupeř.** Uznat ho („Chápu, že máte asi vlastního IT dodavatele…“) a na konci nabídnout volbu: „Podklady můžete předat svému dodavateli, nebo můžeme společně prozkoumat, jak by fungovala naše spolupráce.“ Nikdy trojici „sám / dodavatel / já“, cílem je dostat firmu na svou stranu.
  - **Žádné obranné věty** typu „Nejsem další automatická nabídka“.
  - **Recepci nepopisovat:** „Paní mi doporučila napsat e-mail, tak posílám.“
  - **Termíny:** víc možností (3–5), klidně i týden až dva dopředu. Tvar „čtvrtek 1. 10. od 10:00“ nebo „pondělí 12. 10. odpoledne“.
  - **Závěr vřele:** „Děkuji za váš čas a mějte hezký den!“ Jméno v podpisu tučně.
- **Follow-up** (pole Follow-up):
  - Po e-mailu, který si firma řekla nebo který šel přes recepci: telefon **za 3–5 pracovních dní** s odkazem na e-mail („posílal jsem vám rozbor, stihl jste se podívat?“). Déle si e-mail nikdo nepamatuje.
  - Když se nedovolám: druhý pokus jiný den v jinou denní dobu, pak poslední krátká zpráva e-mailem.
  - Když firma řekne termín sama („ozvěte se po sezóně“, „za dva měsíce“) nebo ho určí Lukáš, platí ten. Důvod patří do Odpovědi firmy.

## Zápis výsledku hovoru

**Po každém hovoru (30 s)** vyplň:
- Stav,
- datum Osloveno,
- Follow-up,
- **Odpověď firmy, začínající kódem.**

Bez kódu se nedá vyhodnotit, co funguje. Když kód chybí, vyhodnocení ho odhadne z textu, ale méně přesně.

| Kód | Kdy | Stav |
|---|---|---|
| `[nedovoláno]` | nikdo to nevzal | zůstává Oslovit |
| `[recepce]` | nedostal jsem se k rozhodovateli | Osloveno + Follow-up |
| `[e-mail]` | chtějí e-mail, poslal jsem | Osloveno + Follow-up za 3–5 pracovních dní |
| `[později]` | zavolat jindy | Osloveno + Follow-up |
| `[zájem]` | chce víc info, čeká na mě | Odpověď |
| `[videohovor]` | domluvený termín | Call |
| `[nabídka]` | chce nabídku | Nabídka |
| `[ne: důvod]` | nezájem. Důvod: `nový web dělají`, `má dodavatele`, `spokojený`, `nemá peníze`, `volali jiní`, `končí`, `nový web jinde`, `jiné` | Ne |

Příklad: `[ne: nový web dělají] Připravují nový web s novým dodavatelem.`

V dashboardu stejně: výsledek hovoru jedním klikem a kód na začátek poznámky.

## Běžící testy

Najednou běží nejvýš dva testy. Test se vyhodnocuje až při minimu dat, do té doby platí „málo dat“.

| # | Test | A | B | Jak se pozná | Měřítko | Minimum | Od |
|---|---|---|---|---|---|---|---|
| T2 | Co nabízet | **rozbor webu** (nový web, opravy) | **měření poptávek:** kolik lidí web otevře a kolik se ozve. Hodí se i firmám, které dělají nový web s dodavatelem. | pole Varianta zprávy, v dashboardu `variant` (A/B), noční rutina střídá | podíl videohovorů z rozhovorů s rozhodovatelem | 12 rozhovorů v každé | 30. 9. 2026 |
| T3 | Platí za marketing | neplatí (starší zásoba) | platí: placený profil na Firmy.cz nebo reklamní kód na webu | u leadu signál „Reklamy“ (dashboard `signals.vzhled`) | podíl zájmů z rozhovorů s rozhodovatelem | 12 rozhovorů v každé | 30. 9. 2026 |

**T1 (přeskočit špičku Firmy.cz) skončil 30. 9. 2026 bez dat.** Na prvních místech Firmy.cz stojí placené profily, a přesně ty teď hledáme (T3).

**Jak rutina píše variantu B:** stejné „Proč volám“. „Co nabízím“ ale zní: „20 minut na videu. Ukážu vám, kolik lidí váš web otevře a kolik z nich se opravdu ozve, a co je cestou ztrácí. Hodí se to i jako zadání pro vašeho dodavatele.“ Služba = Audit poptávek.

**Nápady na další testy** (až některý test doběhne):
- e-mail se screenshotem předem, pak telefon, nebo rovnou telefon,
- volat ráno 7:30–9:00, nebo odpoledne 16:00–17:30 (řemeslníci jsou přes den na stavbě),
- jméno a mobil jednatele předem, nebo pevná linka z webu.

## Rozhodovací pravidla

Podle nich sobotní vyhodnocení navrhuje změny. Týdně se mění **nejvýš 3 věci**, jinak se nedá poznat, co zabralo.

| Když | Navrhni |
|---|---|
| Obor má 15+ hovorů a 0 zájmů | snížit prioritu na 3 |
| Obor má nejvyšší podíl zájmů (min. 10 hovorů) | prioritu 1 a víc nocí |
| Dovolatelnost pod 40 % | jiné časy volání |
| `[recepce]` přes 30 % hovorů | dohledávat jméno a mobil rozhodovatele předem |
| `[ne: volali jiní]` přes 20 % | vyšší `skip`, menší města |
| `[ne: nový web dělají]` + `[ne: má dodavatele]` přes 25 % | víc varianty B (měření poptávek) |
| Zásoba Oslovit pod 20 | zvýšit `max_leadu_za_noc` nebo přidat obor |
| Lukáš vyřadí přes 30 % leadů z nočních běhů | zpřísnit ověření v tom, co vyřazuje |
| T3: platící firmy mají vyšší podíl zájmů (min. 12 rozhovorů v každé skupině) | `jen_platici` natrvalo, starou zásobu volat jen jako doplněk |
| Noční běh najde méně než 3 platící firmy s nálezem | zvýšit `na_dotaz` nebo přidat obory a města |

## Co jsme se zatím naučili

**24.–29. 9. 2026, 10 hovorů.** Vzorek je malý, nic z toho zatím není pravidlo.

- **5× ne:**
  - 2× nový web s vlastním dodavatelem právě dělají,
  - 1× „nejsem první, kdo volá“,
  - 1× končí s výrobou,
  - 1× měli novější web na jiné doméně (chyba v ověření).
- **5× osloveno:**
  - 3× jen recepce nebo „pošlete e-mail“,
  - 1× domluvený čas s manažerkou,
  - 1× e-mail přímo řediteli.
- **Z toho plyne:**
  - **Recepce je hlavní brzda.** Jméno jednatele znát předem a ptát se na něj.
  - **Firma, která právě mění web, není ztracená.** Jeden jednatel řekl, že neví, jestli mu z webu chodí zákazníci. Proto test T2.
  - **Kontrola novějšího webu je povinná** (je v `RULES.md`).
  - **Špička Firmy.cz je přelidněná.** Proto `skip` 5 a test T1.

**30. 9. 2026: firmy se špatným webem často marketing vůbec nechtějí.**

- Z 10 dnešních hovorů mluvil Lukáš s rozhodovatelem jednou a ten řekl: „Web pro nás nemá žádnou hodnotu.“ Jiní: „Máme stálou klientelu“, „teď úplně nepotřebujem“.
- **Špatný web často znamená, že firma zákazníky z internetu nepotřebuje.** Přesvědčovat ji o marketingu je nejdražší prodej.
- **Na prvních místech Firmy.cz jsou placené profily.** U dotazu „okna a dveře Přerov“ platilo prvních 6 firem, další ne. `skip` 5 přeskakoval právě firmy, které za zákazníky platí.
- Proto od 30. 9. hledáme firmy, které za marketing platí a web jim ztrácí poptávky (`Koho hledáme`, test T3).
- **Recepce zastaví hovor, když slyší „ohledně webových stránek“.** Ptát se na jednatele jménem (scénář v Notionu).

**29. 9. 2026 odpoledne, první domluvený videohovor.**

- **Stavební firma z nočního běhu:** web jim dělá dodavatel a je drahý. Jednatel chce podklady, aby je dodavateli „omlátil o hlavu“.
  - **„Má dodavatele“ tedy není automaticky konec.** Sepsaný rozbor je pro majitele argument proti drahému nebo pomalému dodavateli.
  - Proto v nabídce zůstává „můžete ho dát svému dodavateli“.
- **Námitka „web teď neřešíme, není na to čas“ má odpověď, která funguje:** „Právě to je moje role. Projekt se odkládá, protože na něj není čas. Pusťte mě na to…“
  - Takhle Lukáš domluvil schůzku s bývalým klientem, na které připraví zadání projektu.
  - Celé znění je ve scénáři hovoru v Notionu.

## Historie změn

| Datum | Změna | Proč |
|---|---|---|
| 2026-09-29 | První verze podle ručního postupu z 24. 9., rutiny čtou strategii z repa | aby šla strategie měnit bez sahání na rutiny |
| 2026-09-29 | `dotazu_za_noc` 12 → 30, nový klíč `na_dotaz` 7, „pergoly“ → „pergoly na míru“ | první tři běhy: 8–10 dotazů po 5 firmách daly dohromady 2 leady, „pergoly“ vrací Kaufland a Tesco |
| 2026-09-29 | Follow-up po e-mailu 3–5 pracovních dní, vlastní termín firmy nebo Lukáše má přednost | zkušební vyhodnocení: follow-upy po e-mailu byly rozházené (3 dny až 2 měsíce) |
| 2026-09-29 | Rutiny čtou Notion jen přes pohled a při chybě čtení pokračují. Obchodní řetězce vynechává už pipeline. | Odpolední běh oken skončil bez hledání kvůli limitu SQL dotazů v Notionu. Kaufland a Tesco zbytečně zabíraly měření. |
| 2026-09-29 | Nabídka v „Jak oslovujeme“ v přímé řeči | Rutina podle ní psala „dostanou, můžou“ místo „dostanete, můžete“. |
| 2026-09-29 | Nová část „Jak Lukáš e-maily píše“ | Pravidla z Lukášových oprav prvních konceptů, ať další koncepty nepotřebují stejné opravy. |
| 2026-09-30 | `výstup` notion → dashboard, Běh enginu bez varianty (`… · p<n>`, max 60 znaků) | Leady jsou převedené do dashboardu a Lukáš volá jen odtud. Dashboard bere Běh enginu do 60 znaků, varianta má vlastní pole. |
| 2026-09-30 | Hledáme firmy, které platí za marketing: `jen_platici` ano, `skip` 5 → 0, `na_dotaz` 7 → 10, T1 končí, nový T3 | Firmy se špatným webem bez reklamy marketing nechtějí. Placené profily stojí na Firmy.cz nahoře a `skip` je přeskakoval. |
