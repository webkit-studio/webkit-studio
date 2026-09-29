# B02: Trh, vyhledávání, GEO

_Analýza v2, session B02, 29. 9. 2026, issue #11_

Podklady: `docs/web-v2/zadani.md`, `sitemap-relume.csv`, `B01-sluzby-zakaznici.md` a rešerše veřejného webu 29. 9. 2026 (zdroje v kapitole 9). Staré texty webu ani živý web webkit.studio jsme nečetli. Fakta o nás, která nemáme, označujeme `[DOPLNIT]`. Co jsme nemohli ověřit, označujeme `[OVĚŘIT]`.

**Slovníček:** **SEO** je optimalizace pro vyhledávače. **GEO** je optimalizace pro odpovědi AI (ChatGPT, Perplexity, Google AI Overviews). **SERP** je stránka s výsledky hledání. **Kanibalizace** znamená, že si dvě naše stránky konkurují o stejné slovo. **Dlouhý chvost** jsou delší, méně hledané, ale přesnější dotazy. **NAP** je název, adresa a telefon. **Dofollow** odkaz předává webu hodnotu pro vyhledávače.

## TL;DR

1. **Lidé hledají „tvorba webu“, ne „vývoj webu“.** Stránku o webech přejmenovat na `/tvorba-webovych-stranek`. Design webu a grafický design samostatně skoro nikdo nehledá, proto potvrzuji sloučení z B01.
2. **Ceny ukazuje 8 z 11 hráčů, balíček s cenou i termínem má v ČR jen Animato.** Formulář s rozpočtem a termínem nemá nikdo. Od Webflow freelancerů, kteří ceny tají, se tu odlišíme hned.
3. **Prázdná místa na trhu:** veřejná nabídka pro agentury, měřené výsledky Webflow projektů, placený audit webu jako první krok a balíček MVP s cenou.
4. **Souhrny vyhledávačů citují ceníkové články s rokem v titulku a tabulkou rozpětí.** U otázky „kdo“ vybírají katalogy (Clutch, Webflow partneři). Webkit.Studio jsme v adresáři Webflow partnerů pro ČR nenašli.
5. **Spustit 8 stránek služeb, MVP zatím jako sekci stránky aplikací.** Hledanost MVP je minimální, stránky by si konkurovaly a chybí nám reference MVP.

### Rozhodnutí pro Lukáše

| # | Otázka | Doporučení | Proč |
|---|---|---|---|
| 1 | Přejmenovat `/vyvoj-webovych-stranek` na `/tvorba-webovych-stranek`? | **Ano** | „Vývoj webu“ má v Trends index pod 1 a Suggest ho nabídne jen bez variant. „Tvorba webových stránek“ má hledanost vysokou (kapitola 2). U aplikací zůstává „vývoj“, tam je to naopak. |
| 2 | Sloučit `/design-webovych-stranek` do tvorby webu a `/graficky-design` s `/vizualni-identita` do jedné stránky `/logo-a-vizualni-identita`? | **Ano** | Potvrzuje B01. „Design webových stránek“ má desetinu až pětinu hledanosti „tvorby webu“. „Grafický design“ hledají hlavně studenti a uchazeči o práci. Obchodní poptávka jde přes „tvorba loga“. |
| 3 | Spustit MVP zatím jako sekci stránky `/vyvoj-webovych-aplikaci` a samostatnou stránku přidat, až bude reference MVP? | **Ano** | „Vývoj MVP“ Suggest nezná a Trends ukazuje 0. Dvě stránky by soutěžily o stejná slova. Balíček MVP s cenou je ale na trhu volný, proto ho v sekci ukázat. |
| 4 | Zveřejnit ceník s rozpětím a termínem u každé služby a CTA „Ceník“ hned v úvodu webu? | **Ano** | Potvrzuje B01. Balíček s cenou i termínem má v ČR jen Animato, úrovně s cenou Semibold. Souhrny vyhledávačů přebírají tabulky cen doslova (8 z 18 testovaných dotazů je cenových). |
| 5 | Mít stránku pro agentury jen česky a anglickou verzi odložit? | **Ano** | Anglická verze je mimo rozsah v2. Česky nikdo „white label Webflow“ nenabízí, i malá stránka tak má šanci. Anglické dotazy dnes drží zahraniční agentury a tržiště. |

### Na Lukášovi (fakta, ne rozhodnutí)

| Co | Proč |
|---|---|
| Ověřit, jestli je Webkit.Studio aktivní Webflow Certified Partner, a poslat URL profilu `webflow.com/@…` | Zadání počítá s odznakem Webflow Partner. V adresáři `webflow.com/hire/webflow/cz` (16 partnerů) jsme Webkit.Studio nenašli a odhadnuté adresy profilu vrací 404. Bez profilu odznak nemá oporu. |
| Potkáváte se s klienty osobně u nich? | Podmínka Google Business Profile pro firmu bez provozovny. Čistě online firma nárok nemá. |
| Chcete ukázat ulici v Čelákovicích? | Firmy.cz chce adresu provozovny. Jestli jde u OSVČ skrýt, je třeba ověřit u podpory. |
| Přístup ke Google Search Console, Keyword Planneru nebo Skliku | Objemy v kapitole 2 jsou relativní. Přesná čísla doplní S05 nebo M01. |

---

## 1. Jak si stojí konkurence

### Koho jsme vybrali

11 hráčů podle pozic v Seznamu, adresáře Webflow partnerů a relevance pro MSP a startupy. Vyřazení: Moravio (už nestaví weby), Orwin (staví na Pimcore), Wizzy (převádí weby z Webflow pryč). [K1–K3]

| Hráč | Typ | Ceny (jak je uvádějí) | Hlavní sdělení | Důkazy | CTA a formulář |
|---|---|---|---|---|---|
| **Semibold**, Praha [K4] | CZ Webflow studio | 3 úrovně: 80–150 tis., 150–500 tis., 0,5–2 mil. Kč | „Skvělý design, s nohama na zemi“ | „1. certifikovaný partner Webflow v ČR“, 60+ projektů, „8 z 10 klientů se k nám vrací“, citace se jménem | Bez formuláře. E-mail, telefon, rezervace v kalendáři CEO |
| **Animato**, Hradec Králové [K5] | CZ full-service, Webflow i vlastní CMS | Landing „od 35 tis., hotovo za 14 dní“, web „70–150 tis., hotovo za měsíc“ | „Vývoj a kreativita pod jednou střechou“ | Google 5,0, 20+ let, 33 lidí | Kvíz „stačí 10 vteřin“, volitelné pole rozpočtu, „Ozveme se do pár hodin“ |
| **Galandr**, Zlín [K6] | CZ marketingová agentura s Webflow | Neuvádí | „Tvorba Webflow webů na míru pro marketing, SEO a rychlý rozvoj“ | 3 Webflow reference, Google Partner | Dvoukrokový formulář, bez rozpočtu a termínu v 1. kroku |
| **Softmedia** [K7] | CZ studio, hlavně WordPress | Webflow „od 25 000 Kč“, 40–150 tis., hodinovky 1 200–2 000 Kč, správa 1 990 a 3 900 Kč/měs | „Architekti webových aplikací, automatizací a AI systémů“ | 66 recenzí Google, průměr 4,9, 500+ webů | AI formulář, orientační cena a termín za pár minut |
| **Jan Vodvárka**, Hradec Králové [K8] | Freelancer, Webflow Premium Partner | Neuvádí | „Webflow projekty pro značky, které to myslí vážně.“ | Premium Partner, case studies Výzva / Řešení / Výsledek (bez čísel) | Rozpočet v pásmech od „Do 80 tis.“ po „300 000 Kč a více“ |
| **Lukáš Augusta**, Olomouc [K9] | Freelancer, design a Webflow | Design 69–99 tis., design a vývoj 129–189 tis., 1 800 Kč/h, 29 000 Kč/měs | „Weby od designu po spuštění“ | Slabé, bez jmen a čísel | Jen e-mail. Agentury výslovně odmítá |
| **Simon Koran**, Praha [K10] | Freelancer, Webflow vývoj, Certified Partner | Neuvádí | „Webflow weby postavené správně, včas a připravené na růst“ | 60+ klientů, loga (Liftago, Investown), asi 15 citací | Jméno, e-mail, zpráva. **Cílí na firmy, startupy i agentury**, tedy stejně jako my |
| **Le Artist**, Ostrava [K11] | Studio jednoho člověka, Next.js | Web „od 20 000 Kč“, redesign „od 15 000 Kč“, „Fixní cena a termín ve smlouvě“ | „Weby a e-shopy, navržené pro poptávky a růst.“ | **Jediný s čísly:** +160 % a +125 % organických kliknutí u klientů | „Chci odhad do 24 hodin“, kontrola webu zdarma |
| **Flow Ninja** [K12] | Zahraniční, Webflow enterprise | „$25,000+“, ve FAQ minimum $30–45K, retainer $6K/měs | „Your WebOps team for Webflow“ | Clutch 4.9 (51 recenzí), ocenění Webflow | Hovor zdarma, AI audit webu podle URL |
| **Broworks** [K13] | Zahraniční, Webflow pro B2B a SaaS | Balíčky $10K / $15K / $20K+, měsíčně $3,9K / $6,5K / $10K+ | „Turn Your Website Into a Revenue Engine“ | 150+ klientů, case studies s čísly | „Schedule a call“ a „Check our pricing“ vedle sebe v úvodu |
| **Flowout** [K14] | Zahraniční, Webflow předplatné | $5,9–9,9K měsíčně, hodinové balíčky 25 / 50 / 100 h | „The Webflow partner behind names that move markets“ | Enterprise Partner, 460+ klientů | „Schedule a call“ a „See pricing“ |

**Nabídka, silné a slabé stránky** (z pohledu MSP zákazníka)

| Hráč | Nabídka | Silné | Slabé |
|---|---|---|---|
| Semibold | Webflow design a vývoj, správa, migrace z WordPressu, branding | rozpětí cen, autorita prvního partnera, velké značky | spodní hranice 80 tis. odradí menší firmy, bez formuláře, bez čísel výsledků |
| Animato | weby, e-shopy, branding, UX, marketing, Webflow | balíček s cenou i termínem, rychlá odezva, konkrétní člověk | široký záběr rozmělňuje Webflow profil, rozpočet jako volný text |
| Galandr | PPC, SEO, weby na Webflow a WordPressu | nejlepší český obsah o Webflow, řekne, kdy Webflow nedoporučí | bez cen, hodně žargonu, Webflow je vedlejší služba |
| Softmedia | weby, e-shopy, aplikace, AI, správa, Webflow | nízký vstupní práh, ceny i za správu, okamžitý odhad | Webflow jen okrajově, profil WordPress studia |
| Jan Vodvárka | Webflow vývoj, UI/UX, animace, migrace, automatizace | Premium Partner, rozpočet v pásmech, práce pro agentury | bez cen, menší firma se v „prémiových značkách“ nenajde |
| Lukáš Augusta | design a Webflow, měsíční partnerství, konzultace | nejjasnější ceny freelancera | bez důkazů a formuláře, odmítá agentury |
| Simon Koran | Webflow vývoj, redesign, správa | míří na stejné 3 skupiny, silné citace, důraz na termín | bez cen, jen vývoj, obecný formulář |
| Le Artist | weby Next.js, e-shopy, redesign, SEO | ceny, termín ve smlouvě, čísla výsledků | regionální (Ostrava), jeden člověk, nestaví na Webflow |
| Flow Ninja | transformace webu, vývoj, průběžná péče, SEO | srovnání nákladů s vlastním týmem, audit zdarma | ceník si protiřečí ($25K+ proti minimu $30–45K) |
| Broworks | Webflow vývoj, redesign, SEO, CRO, branding | balíčky s „pro koho“, CTA na ceník v úvodu | cílí na SaaS, pro české MSP drahé |
| Flowout | Webflow jako měsíční předplatné | pevná měsíční cena, hodinové balíčky | enterprise, mimo dosah MSP |

### Kdo ukazuje ceny a jak

| Forma | Kdo | Počet |
|---|---|---|
| Balíčky nebo úrovně s rozpětím | Semibold, Animato, Augusta, Broworks, Flowout | 5 |
| Jen „od“ nebo rozpětí | Softmedia, Le Artist, Flow Ninja | 3 |
| Nic | Galandr, Vodvárka, Koran | 3 |
| **Termín dodání u ceny** | Animato, Le Artist, Flow Ninja | 3 |

**Co z toho plyne pro rozhodnutí 2 z B01 (cenová rozpětí):** ceny ukazuje 5 z 8 českých hráčů a všichni 3 zahraniční. Ceny tají právě dva nejsilnější Webflow freelanceři. Rozpětí s termínem nás proto odliší od nejbližší konkurence, ne od trhu obecně.

### Co dělají všichni stejně

1. **Úvod slibuje kvalitu, ne výsledek.** Na poptávky nebo obchod míří jen Le Artist a Broworks.
2. **Důkazem jsou loga a citace, ne čísla.** Měřené výsledky klientských Webflow webů neukazuje žádný český hráč.
3. **Odznak Webflow partnera je vpředu, ale nikdo nevysvětlí, co z něj má zákazník.**
4. **Formuláře jsou obecné.** Na termín se neptá nikdo. Rozpočet v pásmech má jen Vodvárka.
5. **„Webflow vs WordPress“ a „Kolik stojí Webflow“** mají skoro všichni jako článek.
6. **Bezplatný audit** jako lákadlo: automatický u Flow Ninja a Le Artist, marketingový u agentury SHEAN (Webflow partner z Blanska, mimo výběr).

### Kde je na trhu prázdné místo

| # | Prázdné místo | Důkaz z rešerše | Co to znamená pro nás |
|---|---|---|---|
| 1 | **Veřejná nabídka pro agentury** s podmínkami | Koran oslovuje agentury obecně, Vodvárka pro ně pracuje („w/ Yiskra“, „w/ Olii“), ale nikdo nezveřejní sazbu, NDA ani pravidla. Augusta agentury odmítá. [K8–K10] | Stránka pro agentury s pravidly spolupráce a sazbou (B01 rozhodnutí 5). |
| 2 | **Měřené výsledky Webflow projektů** | Čísla ukazuje jen Le Artist, který na Webflow nestaví. [K11] | Case study „před a po“ s čísly. `[DOPLNIT: čísla z projektů se souhlasem klienta]` |
| 3 | **Formulář s rozpočtem a termínem** a rezervací hovoru | Termín nikdo, rozpočet v pásmech jen Vodvárka, kalendář jen Semibold. [K4, K8] | Potvrzuje B01 rozhodnutí 4. |
| 4 | **Placený lidský audit webu s pevnou cenou** | Ve vzorku Webflow hráčů jsou jen audity zdarma, nebo rovnou projekt. Na širším trhu audity od 20–39 tis. Kč existují (B01, Z12a–Z12d). | Odlišení je odečet ceny auditu z projektu (B01 rozhodnutí 3). |
| 5 | **Balíček MVP pro startupy s cenou a termínem** | Startupy zmiňují Koran, Galandr a Broworks, balíček s cenou nemá nikdo. Zahraniční hráči začínají na $10–45K. [K6, K10, K12, K13] | Sekce MVP s cenou a termínem na stránce aplikací (rozhodnutí 3). |

**Nejbližší konkurent je Simon Koran.** Míří na stejné tři skupiny, ale neukazuje ceny, nemá audit a nezveřejňuje podmínky pro agentury. Odlišit nás může transparentnost a vstupní produkty, ne samotný Webflow.

---

## 2. Co zákazníci hledají

### Jak jsme měřili

Keyword Planner ani Sklik nemáme, **všechny objemy jsou relativní.** Kombinovali jsme tři signály:

| Signál | Co ukazuje | Omezení |
|---|---|---|
| Google a Seznam Suggest | Po kolika znacích našeptávač nabídne celé slovo a kolik má variant | Seznam míchá názvy firem |
| Google Trends CZ | Poměr hledanosti proti kotvě „tvorba webu“ = 100 | U malých slov hlásí 0. „Tvorba webových stránek“ má od 9/2025 nevysvětlený skok asi 10×. |
| Pořadí v Seznamu, WebSearch | Kdo dnes rankuje | Google CZ se scrapovat nedá, WebSearch hledá z USA. První 1–2 místa v Seznamu bývají reklama. |

Stupnice: **vysoký** (index 50+), **střední** (10–50), **nízký** (1–10), **minimální** (pod 1). U slov s převážně informačním záměrem to píšeme k objemu, protože takové hledání poptávky nenosí.

### Tvorba, vývoj, nebo design?

| Dotaz | Index (tvorba webu = 100) | Stupeň |
|---|---|---|
| tvorba webových stránek | nad 100 | vysoký |
| tvorba webu | 100 | vysoký |
| webdesign, web design | asi 70 | vysoký, ale **hlavně informační a anglický** |
| design webových stránek | asi 8–20 | nízký |
| vývoj webových stránek, vývoj webu | pod 1 | minimální |
| vývoj aplikací | asi 50 | vysoký, ale i mobilní aplikace (u aplikací vyhrává „vývoj“, asi 20× nad „tvorba aplikací“) |

### Slova podle stránek

Záměr: I = informační, K = komerční, T = transakční. Objem podle stupnice výše. Hlavní slovo je u každé stránky první a tučně.

| Stránka (návrh URL) | Slovo | Záměr | Objem |
|---|---|---|---|
| `/tvorba-webovych-stranek` | **tvorba webových stránek** | K | vysoký |
| | tvorba webu | K | vysoký |
| | tvorba webových stránek cena, ceník | T | střední |
| | kolik stojí webové stránky | I s nákupním úmyslem | nízký až střední |
| | tvorba webových stránek Praha | K | střední |
| | tvorba webu pro firmy, pro podnikatele | K | nízký |
| | tvorba webových stránek na míru, web na míru | K | nízký |
| | tvorba webových stránek poptávka | T | nízký |
| | design webových stránek (sekce) | smíšený | nízký |
| `/redesign-webu` | **redesign webu** | K | nízký |
| | redesign webu cena | T | minimální |
| | redesign webových stránek | K | minimální |
| | modernizace webu | K | minimální |
| | předělání webu | K | minimální |
| | nový web | smíšený | nepoužitelné (hlavně zprávy o cizích webech) |
| `/webflow` | **tvorba webu ve Webflow** | K | minimální |
| | Webflow agentura | K | minimální, Suggest nenabízí |
| | webflow cena, webflow pricing | I | nízký |
| | webflow šablony | I | nízký |
| | webflow developer, webflow expert | K, anglicky | nízký |
| | webflow vs wordpress (článek) | I | nízký |
| | webflow vs framer (článek) | I | nízký |
| `/landing-page` | **landing page cena** | T | nízký |
| | tvorba landing page | T | minimální |
| | landing page co to je (FAQ) | I | střední |
| | jednostránkový web | K | minimální |
| | prodejní stránka | smíšený | minimální |
| | microsite | smíšený | minimální |
| `/ux-audit` | **UX audit webu** | K | nízký |
| | audit webu | K | nízký |
| | audit webu zdarma | T | minimální |
| | ux audit cena | T | minimální |
| | analýza použitelnosti webu | K | minimální |
| | uživatelské testování webu | K | minimální |
| `/vyvoj-webovych-aplikaci` | **vývoj webových aplikací** | K | nízký |
| | vývoj aplikací na míru | K | nízký |
| | software na míru | K | nízký |
| | webová aplikace na míru | K | minimální |
| | vývoj aplikací Praha | K | nízký |
| | co je MVP, MVP aplikace (sekce) | I | minimální až nízký |
| | prototyp aplikace | K | minimální |
| `/logo-a-vizualni-identita` | **tvorba loga** | K | vysoký (index 60–80), část „zdarma“ a „AI“ |
| | tvorba loga cena, pro firmu | T | nízký |
| | logo na míru | K | nízký |
| | tvorba loga Praha | K | nízký |
| | vizuální identita firmy | K | minimální |
| | vizuální identita cena | T | minimální |
| | grafický design pro firmy | K | nízký |
| | grafické studio Praha | K | nízký |
| `/pro-agentury` | **Webflow subdodávka** | K | minimální |
| | white label Webflow | K | minimální česky |
| | Webflow vývojář | K | minimální |
| | white label web development | K, anglicky | nízký globálně |
| | webflow developer freelance | K, anglicky | nízký |
| | webflow expert hire | K, anglicky | nízký |

### Kdo na hlavní slova dnes rankuje

| Stránka | Kdo je nahoře (Seznam, WebSearch) | Síla konkurence |
|---|---|---|
| Tvorba webových stránek | webnode.cz, wix.com, webfusion.cz, webglobe.cz, webrenovace.cz | silná, drží stavebnice. **Reálný cíl jsou dlouhé varianty.** |
| Redesign webu | webrenovace.cz, smejkalpetr.cz, mytimi.cz, webvizitky.cz | **slabá**, jasně obchodní záměr |
| Webflow | webfusion.cz, animato.cz, shean.cz, janvodvarka.cz, galandr.com, semibold.cz | střední |
| Landing page | grainstudio.cz, marf.cz, expert-dev.cz, better.cz | **slabá**, blogy a slovníčky |
| UX audit | webasist.cz, mytimi.cz, portadesign.cz, koncepto.cz, uxf.cz | střední, specializovaní UX konzultanti |
| Webové aplikace | memos.cz, pixelmate.cz, thinkeasy.cz, peach-dev.cz, eluvia.com | silná, softwarové firmy |
| Logo a identita | tvorbalogalevne.cz, artlogo.cz, tridvajedna.cz, studioaestas.cz, cognito.cz | střední |
| Pro agentury | česky nic relevantního, anglicky e2msolutions.com, fiverr.com, flowout.com | **prázdné pole** |

### Kde si stránky konkurují a jak je rozdělit

| Dvojice | Sporná slova | Řešení |
|---|---|---|
| tvorba webu × design webu | design webu, webdesign | **Sloučit.** Design jako sekce tvorby webu, 301 z `/design-webovych-stranek`. |
| tvorba webu × Webflow | tvorba webu, web na míru | Tvorba drží obecná slova. Webflow jen slova se „Webflow“. Z tvorby odkaz „Proč stavíme ve Webflow“. |
| tvorba webu × redesign | nový web, web na míru | Redesign drží „redesign“, „modernizace“, „předělání“. Jiný title i H1. |
| tvorba webu × landing page | jednostránkový web, web cena | Landing page drží „landing page“ a „jednostránkový web“. Tvorba je nepoužívá v title. |
| redesign × UX audit | audit webu, zlepšení webu | UX audit drží „audit“. Redesign na audit odkazuje jako na první krok. |
| MVP × webové aplikace | vývoj aplikace, prototyp | **Sloučit** (rozhodnutí 3). MVP jako sekce s kotvou `#mvp`. |
| vizuální identita × grafický design | logo, grafik, grafické studio | **Sloučit** do `/logo-a-vizualni-identita`. |
| Webflow × pro agentury | webflow developer, webflow expert | Webflow míří na koncové firmy. Pro agentury drží „white label“, „subdodávka“, „pro agentury“. |

### Hledají lidé web podle místa?

| Dotaz | Stupeň | Doporučení |
|---|---|---|
| tvorba webových stránek Praha | střední (index asi 28–50) | Zmínka v title a textu tvorby webu. Samostatná stránka jen s pražskými referencemi. |
| tvorba webových stránek Brno | nízký až střední | Nedělat, nemáme tam přítomnost. |
| tvorba webu Čelákovice, Praha-východ, Brandýs | minimální, Suggest nenabízí | **Vlastní stránku nedělat.** Stačí adresa v patičce, Firmy.cz, Google Business Profile a `areaServed` ve schema. |

GEO test ukázal, že vyhledávač na dotaz „kdo udělá web v Čelákovicích“ odpoví obecnou Prahou (kapitola 3). Lokální stránka by tu mezeru zaplnila. Při nulové hledanosti ale hrozí tenký obsah. Doporučujeme proto nejdřív profily v katalozích a jednu větu o působnosti na `/kontakt`.

### Jak upravit mapu URL

| Plán ze zadání | Doporučení | Nová URL |
|---|---|---|
| `/vyvoj-webovych-stranek` | přejmenovat | `/tvorba-webovych-stranek` |
| `/design-webovych-stranek` | sloučit, 301 | → `/tvorba-webovych-stranek` |
| `/redesign-webovych-stranek` | nechat, zkrátit | `/redesign-webu` |
| `/webflow-vyvoj` | nechat, zkrátit | `/webflow` |
| `/landing-page` | nechat | `/landing-page` |
| `/ux-audit` | nechat | `/ux-audit` |
| `/vyvoj-mvp` | sekce, zatím bez stránky | `/vyvoj-webovych-aplikaci#mvp` |
| `/vyvoj-webovych-aplikaci` | nechat | `/vyvoj-webovych-aplikaci` |
| `/vizualni-identita` a `/graficky-design` | sloučit | `/logo-a-vizualni-identita` |
| chybí | přidat (B01) | `/pro-agentury` |

Kratší URL (`/redesign-webu`, `/webflow`) jsou doporučení, ne nutnost. O finální struktuře rozhoduje T01.

---

## 3. Koho citují AI a vyhledávače (GEO)

### Co šlo otestovat

18 dotazů zákazníků, 29. 9. 2026. **Veřejné AI chaty bez přihlášení nešly:** Perplexity vrátil 403, Brave 429, Duck.ai a Bing Copilot nevrátily odpověď. Nejbližší náhradou byl souhrn se zdroji z vyhledávacího nástroje (WebSearch, hledá z USA) a pořadí v Seznamu. Google AI Overviews nešly načíst přímo. Závěry proto platí pro souhrny vyhledávačů jako nejbližší náhradu AI odpovědí. [G1]

### Kdo se objevil u jednotlivých dotazů

| Dotaz | Citované domény | Typ obsahu | Proč je vybral |
|---|---|---|---|
| kolik stojí web pro firmu | vcreate.cz, forge-agency.cz, pisuweby.cz, pajskr.cz, webfusion.cz | ceníkové články | „2026“ v titulku, rozpětí v Kč podle typu webu |
| kolik stojí webová stránka 2026 | le-artist.cz, webfusion.cz, pajskr.cz, webmorava.cz, designee.cz | ceníkové články | Souhrn převzal kategorie „landing 10–30 tis., firemní web 30–80 tis.“ doslova |
| Webflow agentura Praha | flowify.cz, clutch.co, pixelfield.cz, mediar.cz (článek o Semiboldu), semibold.cz, firmy.cz | stránky služeb, žebříček Clutch, katalog, PR článek | „Webflow“ a „Praha“ v titulku, fakt „první Webflow partner v ČR, 60+ projektů“, nezávislý žebříček |
| kdo udělá MVP | pixelmate.cz, memos.cz, coex.cz, rascasone.com | články „co je MVP“ a stránky služeb | definice a fakta o firmě („od roku 2003“) |
| kolik stojí MVP aplikace | pixelmate.cz, memos.cz, peach-dev.cz, le-artist.cz, devboys.cz | ceníkové články | konkrétní hranice („od 80 000 Kč“), rok v titulku |
| Webflow nebo WordPress pro firmu | cognito.cz, janvodvarka.cz, etomak.cz, semibold.cz, jgregor.cz | srovnávací články | jasný verdikt „kdy co“ |
| jak vybrat agenturu na tvorbu webu | blueghost.cz, expert-dev.cz, justdigital.cz, pixlo.cz | návody | číslovaný seznam v titulku („7 kroků“) |
| redesign webu cena | redesignwebstranek.cz, oxystudio.cz, webmorava.cz, le-artist.cz | ceníky | citovatelné pravidlo „redesign ≈ 65 % ceny nového webu“ |
| landing page cena | weblik.cz, thewild.cz, le-artist.cz, designee.cz | ceníky | pevná cena v titulku |
| UX audit webu cena | feo.cz, anfilov.cz, koncepto.cz, davidkoci.cz | stránky služeb | úrovně auditu s cenou |
| tvorba vizuální identity cena | jetome.cz, tridvajedna.cz, anfilov.cz, brainwave.cz, pixelot.cz | ceníkový článek a stránky freelancerů | titulek „přehled od 7 000 do 500 000 Kč“ (anfilov) |
| nejlepší webové studio Praha | dvojkastudio.cz, studioustal.cz, design-online.cz, firmy.cz | homepage studií, katalog | „Webové studio Praha“ v titulku, cena, roky praxe |
| webflow developer freelancer čr | contra.com, upwork.com, webflow.com/hire, linkedin.com | tržiště, katalogy | **česká stránka chybí** |
| white label webflow vývoj | e2msolutions.com, flowout.com, minutecreative.com | anglické stránky služeb | **česká stránka chybí** |
| jak dlouho trvá tvorba webu | studioustal.cz, webplatform.cz, webouky.cz | FAQ články | časy podle typu webu |
| web pro malou firmu co musí obsahovat | webouky.cz, vas-webmaster.cz, webmorava.cz, webeno.cz | kontrolní seznamy | výčet sekcí webu |
| kdo udělá web Čelákovice / Praha-východ | udelam-web.cz, pajskr.cz, tvorba-webu-praha.cz, firmy.cz | lokální stránky „Praha“ | **lokální stránka chybí**, AI spadla na Prahu |
| vývoj webové aplikace cena | pixelmate.cz, thinkeasy.cz, dostaljakub.cz | ceníkové články | pásma cen |

Tabulka ukazuje všech 18 dotazů. Nejčastěji citované domény: **le-artist.cz** (5 dotazů), **webfusion.cz** (5), **webmorava.cz** (4), **firmy.cz** (4, jen Seznam), pixelmate.cz, pajskr.cz, memos.cz, studioustal.cz (3).

### Co mají citované stránky v HTML

| Stránka | Strukturovaná data | Tabulky | Datum úpravy |
|---|---|---|---|
| le-artist.cz, kolik stojí web [G2] | BlogPosting, **FAQPage**, LocalBusiness, BreadcrumbList | 2 | 15. 9. 2026 |
| designee.cz, kolik stojí web [G3] | Article, **FAQPage**, Organization, Person | 5 | 19. 9. 2026 |
| pajskr.cz, cena webových stránek [G4] | BlogPosting, Organization | 2 | 29. 9. 2026 |
| studioustal.cz, jak dlouho trvá web [G5] | LocalBusiness, **Service a Offer**, FAQPage | 0 | 24. 9. 2026 |
| anfilov.cz, vizuální identita [G6] | Article, ProfessionalService, **AggregateRating** | 3 | 11. 4. 2026 |
| pixelmate.cz, cena aplikace [G7] | žádná | 0 | neuvedeno |
| semibold.cz, Webflow [G8] | žádná | 0 | neuvedeno |

**Schema samo citaci nezajistí**: pixelmate a Semibold ho nemají, a AI je cituje. llms.txt má 7 ze 14 testovaných studií (le-artist, webfusion, semibold, grow-up, dvojkastudio, studioustal, memos). Vliv na citace se z dat prokázat nedá. [G1]

Mimo test: podle studie Orbit Media je Clutch u Claude nejčastěji citovaná doména třetí strany, u Perplexity je to LinkedIn [C3]. ChatGPT hledá přes index Bingu [C4].

### Proč vybírají právě je

1. **Rok v titulku a tabulka rozpětí.** „Kolik stojí X v roce 2026: od A do B Kč“ vyhrává cenové dotazy.
2. **Krátká věta s číslem.** „Firemní web 3–4 týdny“, „redesign ≈ 65 % ceny“. Jde do odpovědi celá.
3. **Čerstvé datum úpravy.** Část citovaných článků (pajskr, designee, le-artist, studioustal) je upravená v posledních týdnech. Jiné (webfusion, anfilov) jsou starší [G6, G9], datum tedy pomáhá, ale nerozhoduje.
4. **Dotaz doslova v titulku.** „Webové studio Praha“, „Kdo mi udělá web“.
5. **Fakta o firmě.** „9 let“, „60+ projektů“, „první Webflow partner v ČR“.
6. **Třetí strany u otázky „kdo“.** Clutch, Webflow partneři, článek v médiích. Firmy.cz jen v Seznamu.
7. **Kde česká odpověď chybí, AI cituje zahraničí.** White label Webflow, Webflow freelancer, Čelákovice.

### Co udělat pro GEO

Seřazená podle poměru dopadu a pracnosti. Sloupec „Kdo“ říká, která session to převezme.

| # | Opatření | Dopad | Pracnost | Kdo |
|---|---|---|---|---|
| 1 | **Ceník s tabulkou rozpětí a termínů** pro všechny služby, s rokem v titulku a viditelným datem aktualizace. Čísla `[DOPLNIT: ceny Webkit.Studio]`. | vysoký | střední | T01 (kde), T03 (text) |
| 2 | **FAQ s přímými odpověďmi** na každé stránce služby (Kolik? Jak dlouho? Co od vás potřebujeme? Webflow, nebo WordPress?) a schema `FAQPage` | vysoký | nízká | T03, S05 |
| 3 | **Věta s cenou a termínem v prvním odstavci** každé služby | vysoký | nízká | T02, T03 |
| 4 | **Title se slovy dotazu**: „Tvorba webových stránek pro firmy“, „Redesign webu: cena a postup“, „UX audit webu: cena“ | vysoký | nízká | T03 |
| 5 | **Obsadit prázdné niky**: stránka pro agentury se slovy „Webflow subdodávka“ a „white label Webflow“ | vysoký | střední | T01, T03 |
| 6 | **Profily v katalozích se shodnými údaji** (kapitola 6) | střední | střední | Lukáš |
| 7 | **Schema na celém webu**: `ProfessionalService` s `areaServed` a `sameAs`, `Service` a `Offer` u služeb, `BreadcrumbList`, u článků `Article` s `dateModified` | střední | nízká | S05 |
| 8 | **Skutečné recenze** na Google a Clutch. Na webu `Review` a `AggregateRating` jen z reálných hodnocení. | střední | vysoká | Lukáš, S05 |
| 9 | **Case study s čísly** (výzva, řešení, výsledek) | střední | závisí na datech | T03, S02 |
| 10 | **Srovnání „Webflow, nebo WordPress“** s jasným verdiktem a náklady za 3 roky | střední | střední | plán obsahu |
| 11 | **llms.txt** s kým jsme, služby, ceny, působnost, odkazy na ceník a FAQ. Ve Webflow ověřit technicky `[OVĚŘIT]`. | nízký až nejistý | nízká | S05 |
| 12 | **Zmínka v médiích** (vzor Semibold v Médiáři) | střední | vysoká | mimo web, Lukáš |

---

## 4. O čem psát pro dlouhý chvost

Blog je mimo rozsah stavby. Jde o plán, na který navážou M01 a O0x. Témata jsme vybrali podle Google Suggest (vlastní sondy 29. 9. 2026), GEO testu a mezer v SERP. Pořadí = doporučené pořadí psaní.

| # | Téma | Cílový dotaz | Signál z dat | Prolinkuje na |
|---|---|---|---|---|
| 1 | Kolik stojí webové stránky v roce 2026 | kolik stojí webové stránky, cena webových stránek | Suggest na „cena webu“ nabízí 10 variant. 8 z 18 GEO dotazů je cenových. | `/tvorba-webovych-stranek`, ceník |
| 2 | Webflow, nebo WordPress pro firmu? | webflow vs wordpress | Suggest nabízí po „webflow vs“. SERP drží blogy malých studií. | `/webflow` |
| 3 | Redesign webu: cena, postup a jak nepřijít o pozice | redesign webu cena | Suggest nabízí jen „redesign webu cena“, SERP slabý | `/redesign-webu`, `/ux-audit` |
| 4 | Zákon o přístupnosti: týká se vašeho webu? | zákon o přístupnosti webových stránek | Suggest na „zákon o přístupnosti“ nabízí 8 variant. Zákon 424/2023 Sb. platí od 28. 6. 2025 pro B2C e-shopy. Mikropodniky ve službách mají výjimku. [P1, P2] | `/redesign-webu`, `/ux-audit` |
| 5 | Kolik stojí landing page a co musí obsahovat | landing page cena | Suggest nabízí „landing page cena“, SERP slabý | `/landing-page` |
| 6 | UX audit webu: co obsahuje a kdy se vyplatí | ux audit webu, audit webu | nízký objem, jasně obchodní záměr | `/ux-audit` |
| 7 | Co je MVP a kolik stojí | co je mvp aplikace, kolik stojí vytvořit aplikaci | Suggest nabízí obě. Seznam na „vývoj mvp“ vrací právě tyto články. | `/vyvoj-webovych-aplikaci#mvp` |
| 8 | Kolik stojí vývoj webové aplikace | kolik stojí vývoj aplikace | Suggest nabízí. GEO: vyhrávají pásma cen. | `/vyvoj-webovych-aplikaci` |
| 9 | Kolik stojí logo a vizuální identita | kolik stojí logo od grafika, vizuální identita cena | Suggest nabízí obě | `/logo-a-vizualni-identita` |
| 10 | Co musí obsahovat web firmy (kontrolní seznam) | co musí obsahovat webové stránky | Suggest nabízí. GEO dotaz vyhrály checklisty. | `/tvorba-webovych-stranek` |
| 11 | Jak dlouho trvá tvorba webu | jak dlouho trvá tvorba webu | GEO: vyhrávají FAQ s časy podle typu webu | `/tvorba-webovych-stranek`, ceník |
| 12 | Jak vybrat dodavatele webu: otázky, které položit | jak vybrat agenturu na tvorbu webu | GEO: vyhrávají číslované návody | `/kontakt`, `/nase-prace` |
| 13 | Webflow, nebo Framer? | webflow vs framer | Suggest nabízí po „webflow vs“ hned na 2. místě | `/webflow` |
| 14 | Kolik stojí správa webu | kolik stojí správa webu, správa webu cena | Suggest nabízí „kolik stojí správa webu“ i „správa webu cena“. Navazující služba z B01. | `/webflow`, ceník |

Pro všechny články platí: rok v titulku u cenových témat, tabulka hned pod úvodem, FAQ na konci, viditelné datum aktualizace, revize cen jednou za čtvrtletí.

---

## 5. Které služby spustit hned a které později?

Kritéria: hledanost (kapitola 2), síla konkurence v SERP, prázdné místo na trhu (kapitola 1) a důkazy, které máme (B01, kapitola 3).

| Služba | Hledanost | Konkurence v SERP | Prázdné místo | Důkaz (B01) | Verdikt |
|---|---|---|---|---|---|
| Tvorba webových stránek | vysoká | silná (stavebnice), dlouhé varianty slabší | ceny s termínem | ELDR | **Hned**, hlavní stránka |
| Redesign webu | nízká, obchodní | slabá | audit jako první krok | `[DOPLNIT: je ELDR redesign?]` | **Hned** |
| Webflow | minimální česky | střední | výsledky s čísly | odznak `[OVĚŘIT]` | **Hned**, pro konverzi, ne pro objem |
| Landing page | vysoká (info), nízká (obchod) | slabá | balíček s termínem | chybí | **Hned**, ukázku doplnit |
| UX audit | nízká, obchodní | střední | placený audit s odečtem | chybí, stačí anonymizovaný výstup | **Hned**, vstupní produkt |
| Logo a vizuální identita | vysoká (tvorba loga), část informační | střední | žádné výrazné | Arbosis | **Hned** |
| Pro agentury | minimální česky | žádná česky | největší | `[DOPLNIT: agenturní projekty]` | **Hned**, pro přímé oslovení |
| Webové aplikace | nízká | silná (softwarové firmy) | málo | Anse, CRR | **Hned**, ale cílit na dlouhé varianty |
| MVP | minimální | informační články | balíček s cenou | `[DOPLNIT: dodáváme sami?]` | **Později jako stránka**, hned jako sekce |
| Design webu, grafický design | nízká, informační | – | – | – | **Nespouštět**, sloučeno |

**Organický provoz přinese hlavně tvorba webu a ceník.** Ostatní stránky budou žít z interních odkazů, katalogů, doporučení a kampaní. Proto je důležité měřit konverzi po stránkách (T01, S04), ne jen návštěvnost.

---

## 6. Kde mít profil (katalogy)

### Co založit hned a co později

| Priorita | Katalog | Cena | SEO | GEO | Proč |
|---|---|---|---|---|---|
| **Hned** | Webflow Certified Partners (`webflow.com/@…`, `/hire/webflow/cz`) [C1] | zdarma pro partnery | odkaz z webflow.com | vysoký, objevil se v testu | 16 českých partnerů, Webkit.Studio mezi nimi není `[OVĚŘIT]` |
| **Hned** | Google Business Profile [C5] | zdarma | silný lokální | Gemini a AI Overviews | Jen jako firma, která jezdí za klienty, se skrytou adresou `[DOPLNIT: osobní schůzky?]` |
| **Hned** | Firmy.cz (Seznam, Mapy.com) [C6] | zdarma | jediný vstup do Seznamu a Mapy.com | nízký až střední | Firmy.cz v Seznamu u 4 GEO dotazů. Adresa `[OVĚŘIT u podpory]`. |
| **Hned** | Clutch [C2] | profil zdarma, telefonické recenze placené | odkaz | nejvyšší ze zahraničních | Žebříček CZ Webflow má 13 firem, žádného freelancera. Některým stačí 1–2 recenze. |
| **Hned** | LinkedIn Company Page [C7] | zdarma | slabý | vysoký pro Perplexity | pár minut práce, `sameAs` pro entitu |
| **Hned** | Bing Places a Bing Webmaster Tools [C4] | zdarma | Bing | ChatGPT hledá přes Bing | Import z Google u skryté adresy nefunguje, založit ručně |
| Později | Na volné noze [C8] | 4 900 Kč/rok bez DPH | odkaz | v českém testu první | 13 lidí v kategorii Webflow. Zvážit vážně. |
| Později | Sortlist, GoodFirms [C9] | profil zdarma | odkaz | Sortlist v testu 3× | stejné texty jako Clutch |
| Později | Behance [C10] | zdarma | odkaz | nízký | až budou case studies identit |
| Později | Awwwards, CSSDA [C11] | 65 USD a 50 USD za přihlášku | odkaz | nízký | kandidát je nový web v2 |
| Později | CzechCrunch profily [C12] | zdarma | slabý | pro startupy | až bude MVP reference |
| Později | Wikidata [C13] | zdarma | – | teoreticky silný | až budou nezávislé zdroje, jinak hrozí smazání |
| Později | Najisto, Webtrh.cz | Najisto zdarma, Webtrh `[OVĚŘIT]` | odkaz | – | jen kvůli jednotným údajům |
| Nedělat | Poptávkové portály (Poptávej, ePoptávka) [C14] | 5 990 Kč/rok a víc | – | – | malé zakázky a souboj cenou, proti cíli „lepší poptávky“ |
| Nedělat | DesignRush [C15] | profil zdarma, pořadí placené | slabý | slabý | top 10 se kupuje |
| Nedělat | Apple Business Connect, Zlaté stránky, Dribbble, StartupJobs | – | – | – | bez veřejné provozovny, nízký přínos |

### Co kde vyplnit

| Katalog | Pole |
|---|---|
| Webflow partner | lokace, jazyky (Czech, English), typ Freelancer, „Starting at“ `[DOPLNIT: min. projekt v USD]`, služby (Web Design, Web Development, Branding, No/low-code app creation, SEO a AEO Audit, Platform migrations, jen co opravdu děláme), About 2–3 věty, 3+ projekty, „Accepting new projects“ |
| Google Business Profile | název bez klíčových slov, hlavní kategorie „Website designer“ (český název `[OVĚŘIT v rozhraní]`), oblast působnosti (Praha, Středočeský kraj), služby s popisy, telefon, web, fotky prací, logo |
| Firmy.cz | název, kategorie, popis do 300 znaků bez cen a superlativů, telefon, e-mail, web, působnost v popisu, fotky. Web musí uvádět IČ a jméno podle živnostenského rejstříku. |
| Clutch | tagline, velikost týmu, minimální projekt, hodinová sazba v pásmu `[DOPLNIT]`, rozdělení služeb v %, 3–5 projektů, aspoň 3 recenze přes online formulář |
| LinkedIn | název, web, obor, velikost, typ Self-employed, lokace, popis, služby, logo |
| Bing Places | stejné údaje jako Google, ručně |

### Jak držet údaje všude stejně (NAP) a schema

- **Název všude stejně:** Webkit.Studio.
- **Adresa:** veřejně jen město a kraj. Ulici skrýt, kde to jde. Nepoužívat virtuální sídlo, Google ho zakazuje [C5].
- **Oblast:** Praha, Středočeský kraj, celá ČR online. Všude stejně.
- **Telefon a e-mail:** jeden formát, jedna adresa na doméně `[DOPLNIT]`.
- **Popis:** jedna základní věta (kdo, co, pro koho, kde), která se opakuje ve všech katalozích.
- **Schema:** `ProfessionalService` s `areaServed` a bez ulice, `sameAs` na všechny profily výše. Kostru připraví S05, hodnoty `[DOPLNIT]`.

### Jak sbírat recenze

1. Po předání projektu poslat **všem** klientům odkaz na Google recenzi. Google zakazuje žádat jen spokojené a nabízet odměnu [C16].
2. Za 2–4 týdny požádat o recenzi na Clutch přes online formulář [C2].
3. Na recenze odpovídat, na Firmy.cz i Google.
4. Na webu ukazovat jen skutečné recenze s odkazem na zdroj.

---

## 7. Co převezmou další session

| Session | Co převzít |
|---|---|
| T01 | Mapa URL z kapitoly 2, MVP jako sekce, stránka pro agentury, ceník jako samostatná stránka nebo sekce, působnost na `/kontakt`. Konverze měřit po stránkách. |
| T02, T03 | Slova z kapitoly 2 do title, H1 a prvních odstavců. Věta s cenou a termínem na začátku. FAQ na každé službě. |
| D01 | Komponenta tabulky cen a termínů, FAQ, CTA „Ceník“ v úvodu. (D01 běží souběžně, jen informace.) |
| S02 | Case study se strukturou výzva, řešení, výsledek a místem pro čísla. |
| S04 | Formulář s rozpočtem v pásmech a termínem (B01 rozhodnutí 4), měřit dopad. |
| S05 | Schema (`ProfessionalService`, `Service`, `Offer`, `FAQPage`, `BreadcrumbList`), 301 ze sloučených URL, llms.txt, Bing Webmaster Tools. |
| M01 | Doplnit přesné objemy (Keyword Planner, Sklik, Search Console) a opakovat GEO test 18 dotazů. Plán obsahu z kapitoly 4. |

## 8. Co rešerše neumí

- **Objemy jsou relativní.** Keyword Planner, Sklik ani Search Console nebyly k dispozici.
- **Google CZ se nedal načíst přímo.** Pořadí je ze Seznamu a z WebSearch, který hledá z USA.
- **Veřejné AI chaty nešly bez přihlášení** (Perplexity 403, Brave 429, Duck.ai a Copilot bez odpovědi). GEO test stojí na souhrnech vyhledávače a pořadí v Seznamu.
- **Reklamy v Seznamu** skript neodliší. U podezřelých výsledků (david-pavelka.cz, orwin.cz, grow-up.cz, eluvia.com) je poznámka.
- **Formuláře** Flow Ninja a Flowout se načítají skriptem, jejich pole jsme nezjistili.
- **Google Trends** má u „tvorba webových stránek“ nevysvětlený skok od 9/2025. Na doporučení „tvorba“ místo „vývoj“ to vliv nemá.

## 9. Zdroje

Přístup 29. 9. 2026.

**Konkurence**

| # | Zdroj |
|---|---|
| K1 | [moravio.com/cs](https://www.moravio.com/cs) |
| K2 | [orwin.cz](https://www.orwin.cz/) |
| K3 | [wizzy.cz](https://www.wizzy.cz/) |
| K4 | [semibold.cz/cs/webflow](https://www.semibold.cz/cs/webflow), [semibold.cz/cs/kontakt](https://www.semibold.cz/cs/kontakt), [Médiář o Semiboldu](https://www.mediar.cz/webflow-nastroj-budoucnosti-designeri-ze-studia-semibold-prvnimi-experty-na-jeho-pouzivani-v-cesku/) |
| K5 | [animato.cz](https://www.animato.cz/), [animato.cz/o-webflow](https://www.animato.cz/o-webflow) |
| K6 | [galandr.com/webflow-weby](https://www.galandr.com/webflow-weby), [galandr.com/poptavka](https://www.galandr.com/poptavka) |
| K7 | [softmedia.cz/webflow-tvorba-a-sprava-webu](https://softmedia.cz/webflow-tvorba-a-sprava-webu/), [AI poptávkový formulář](https://softmedia.cz/novinky-ze-softmedia/ai-poptavkovy-formular/) |
| K8 | [janvodvarka.cz](https://www.janvodvarka.cz/), [Webflow vs WordPress](https://www.janvodvarka.cz/blog/webflow-vs-wordpress) |
| K9 | [lukasaugusta.cz](https://www.lukasaugusta.cz/), [lukasaugusta.cz/kontakt](https://www.lukasaugusta.cz/kontakt) |
| K10 | [simonkoran.com/cs](https://www.simonkoran.com/cs) |
| K11 | [le-artist.cz](https://le-artist.cz/), [le-artist.cz/kontakt](https://le-artist.cz/kontakt) |
| K12 | [flow.ninja](https://www.flow.ninja/), [flow.ninja/pricing](https://www.flow.ninja/pricing) |
| K13 | [broworks.net](https://www.broworks.net/), [broworks.net/pricing](https://www.broworks.net/pricing) |
| K14 | [flowout.com](https://www.flowout.com/), [flowout.com/pricing](https://www.flowout.com/pricing) |

**Klíčová slova:** Google Suggest (`suggestqueries.google.com`, hl=cs, gl=cz), Seznam Suggest (`suggest.seznam.cz`), Google Trends CZ, výsledky `search.seznam.cz`, vše 29. 9. 2026. Pořadí domén je v tabulce kapitoly 2.

**GEO**

| # | Zdroj |
|---|---|
| G1 | Vlastní test 18 dotazů přes WebSearch a `search.seznam.cz`, 29. 9. 2026. Výsledky jsou v tabulce kapitoly 3. |
| G2 | [le-artist.cz/blog/kolik-stoji-web](https://www.le-artist.cz/blog/kolik-stoji-web) |
| G3 | [designee.cz/blog/kolik-stoji-webove-stranky](https://designee.cz/blog/kolik-stoji-webove-stranky/) |
| G4 | [pajskr.cz/cena-webovych-stranek](https://pajskr.cz/cena-webovych-stranek/) |
| G5 | [studioustal.cz/jak-dlouho-trva-tvorba-webu](https://studioustal.cz/jak-dlouho-trva-tvorba-webu/) |
| G6 | [anfilov.cz/clanky/kolik-stoji-vizualni-identita](https://anfilov.cz/clanky/kolik-stoji-vizualni-identita) |
| G7 | [pixelmate.cz/vyvoj-aplikace-cena](https://pixelmate.cz/vyvoj-aplikace-cena) |
| G8 | [semibold.cz/en/webflow](https://www.semibold.cz/en/webflow) |
| G9 | [webfusion.cz: Kolik stojí webové stránky 2026](https://webfusion.cz/kolik-stoji-webove-stranky-v-roce-2026/) (upr. 28. 1. 2026), [webmorava.cz: Kolik stojí webové stránky 2026](https://webmorava.cz/kolik-stoji-webove-stranky-v-roce-2026/) (upr. 3. 6. 2026) |

**Katalogy**

| # | Zdroj |
|---|---|
| C1 | [webflow.com/hire/webflow/cz](https://webflow.com/hire/webflow/cz), [Certified Partners browse](https://webflow.com/certified-partners/browse), [apply](https://webflow.com/certified-partners/apply) |
| C2 | [clutch.co/cz/developers/webflow](https://clutch.co/cz/developers/webflow), [Clutch Help: get listed](https://help.clutch.co/en/knowledge/get-listed-on-clutch), [Clutch Help: online review](https://help.clutch.co/en/knowledge/leave-an-online-review-on-clutch) |
| C3 | [Orbit Media: AI citation sources](https://www.orbitmedia.com/blog/ai-citation-sources/) |
| C4 | [Search Engine Land: ChatGPT local searches](https://searchengineland.com/how-does-chatgpt-conduct-local-searches-454894), [Dalton Luka: Bing Places a Google](https://daltonluka.com/blog/sync-bing-places-with-google-my-business) |
| C5 | [Google Business Profile: pravidla](https://support.google.com/business/answer/3038177?hl=en) |
| C6 | [Firmy.cz: pravidla profilů](https://napoveda.firmy.cz/obecna-pravidla-pro-profily/), [Firmy.cz: adresa](https://napoveda.firmy.cz/faq/adresa-firmy/), [Firmy.cz: kde se profil zobrazuje](https://napoveda.firmy.cz/zaciname/kde-se-profil-zobrazuje/) |
| C7 | [LinkedIn Help: Company Page](https://www.linkedin.com/help/linkedin/answer/a543852) |
| C8 | [navolnenoze.cz/katalog/webflow](https://navolnenoze.cz/katalog/webflow/), [registrace](https://navolnenoze.cz/registrace/) |
| C9 | [Sortlist CZ web design](https://www.sortlist.com/web-design/czech-republic-cz), [GoodFirms CZ](https://www.goodfirms.co/directory/country/top-web-design-companies/czech-republic) |
| C10 | [Gautam Khorana: Dribbble vs Behance](https://gautamkhorana.com/blog/dribbble-vs-behance/) |
| C11 | [Awwwards: submit](https://www.awwwards.com/submit/), [Web Design Awards: CSSDA](https://www.webdesignawards.io/awards/cssda) |
| C12 | [cc.cz/profily](https://cc.cz/profily/) |
| C13 | [Wikidata: Notability](https://www.wikidata.org/wiki/Wikidata:Notability) |
| C14 | [Poptávej: ceník](https://www.poptavej.cz/cenik), [Webtrh: nejlepší poptávkový web](https://webtrh.cz/diskuse/nejlepsi-poptavkovy-web/) |
| C15 | [DesignRush: methodology](https://www.designrush.com/methodology) |
| C16 | [Google Business Profile: zakázaný obsah (recenze)](https://support.google.com/business/answer/7400114?hl=en) |

**Legislativa (plán obsahu)**

| # | Zdroj |
|---|---|
| P1 | [MPO: zákon č. 424/2023 Sb.](https://mpo.gov.cz/cz/podnikani/standardizace/pristupnost-vyrobku-a-sluzeb/zakon-c--424-2023-sb---o-pozadavcich-na-pristupnost-nekterych-vyrobku-a-sluzeb--279601/), [zakonyprolidi.cz/cs/2023-424](https://www.zakonyprolidi.cz/cs/2023-424) |
| P2 | [ČOI: přístupnost výrobků a služeb](https://coi.gov.cz/pro-podnikatele/pristupnost-vyrobku-a-sluzeb-pro-podnikatele/), [shop5.cz: na koho se zákon vztahuje](https://www.shop5.cz/clanek/faq-pristupnost-e-shopu-a-zakon-c-424-2023-sb-na-koho-se-skutecne-vztahuje/) |
