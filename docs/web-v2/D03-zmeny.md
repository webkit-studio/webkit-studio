# D03: Návrh se šťávou

_Session D03 · 14. 10. 2026 · issue #52 · náhled: https://claude.ai/artifact/3rGAWQ952JovDCbNPHzFM1 · kopie: `docs/web-v2/navrh/index.html` · snímky: `docs/web-v2/navrh/snimky/`_

## TL;DR

- **Šťáva:** stránky střídají čtyři barevné bloky (bílá, světle modrý tón, tmavý ink, sytě modrá). Pravidlo „jedna modrá plocha“ je zrušené.
- **Wow hero:** velké interaktivní pole z dlaždic loga. Dlaždice se natáčí ke kurzoru, bez myši běží pomalá vlna. Lehký canvas, bez knihoven.
- **Velký text místo seznamů:** statement s odhalením po slovech, výroky na tmavém bloku, výsledky projektů jako medium text.
- **Náhled se zúžil** na Homepage, Webflow vývoj (vzorová produktová stránka) a Komponenty. U každé komponenty je napsané, co se na jiné službě mění.
- **Konverzní flow:** formulář → kalendář → volitelný dotazník. Každý krok jde přeskočit, každý má událost GA4.

## Na Lukášovi (ano/ne)

| # | Otázka | Doporučení |
|---|---|---|
| 1 | **Délky a nástroje v postupu** jsou návrh (tečkovaně podtržené): 50minutový hovor, dvouhodinový workshop, připomínky ve Figmě. Platí? | Ano, když to tak děláš. Jinak napiš skutečné hodnoty. |
| 2 | **MVP „za týdny, ne měsíce“.** Můžeme slíbit konkrétně „první verze do 2 týdnů“? | Jen když to zvládneš u většiny projektů. Jinak nech „za týdny“. |
| 3 | **Anse:** logo je z anse.cz (stínicí technika, FWDS Europe). Je to ten správný klient? | Potvrď. Když ne, pošli logo. |
| 4 | **Loga v hero jsou jednobarevná** (tmavá, přebarvená z webů klientů). MARV a ELDR jsou jen PNG z webu. Stačí, nebo chceš od klientů SVG? | Stačí pro náhled. Pro S01 si řekni o SVG. |
| 5 | **Kalendář před dotazníkem** (domluvený hovor má přednost, dotazník je dobrovolný). Souhlasíš? | Ano. Víc rezervací, dotazník nikoho nezdrží. |

Chybí dál (žluté `[DOPLNIT]` v náhledu): citace Marka K., druhá věta s výsledkem u CRR a Arbosis, odkaz na profil Webflow partnera, rezervační nástroj, IČ. Podklady pro 20s video smyčky projektů dodáš do samostatné session.

## Globální zpětná vazba → co se změnilo

| Bod | Co se změnilo | Kde to vidět |
|---|---|---|
| Stránkám chybí šťáva | Rytmus barevných bloků: bílá → tón → bílá → ink → bílá → modrá → tón → modrá → ink. Interakce: pole dlaždic, odhalení výroku, fullscreen projekty, kurzor „Prozkoumat“, krok za krokem, ikony měnící se na čtvrtkruh, tok dat v Napojení. | Celý náhled, lišta nahoře ukazuje barvu každé sekce |
| Velký vysvětlující text (statement) víc používat | Statement hned po hero na homepage i na Webflow vývoji. Nový stupeň písma Statement (až 72 px) a Medium (až 42 px). | Homepage, Webflow vývoj, Komponenty → Písmo |
| Produktové stránky: méně textu a seznamů | Seznam „Co dostanete“ nahradily **Výroky**: 4 velké řádky na tmavém bloku. Srovnání tabulkou je pryč. | Webflow vývoj |
| Jedna luxusní produktová stránka místo čtyř | Přepínač má jen Homepage, Webflow vývoj, Komponenty. Tabulka komponent má sloupec „Na jiné službě“. | Komponenty → Sekční komponenty |
| Zapracovat systémově | Pravidla bloků, typová škála, interakce a flow jsou v knihovně a v `D01-design-system.md`. Platí pro všechny stránky, ne jen pro komentovaný prvek. | Komponenty |

## Odpovědi na otázky z D02 → co se změnilo

| Bod | Co se změnilo | Kde to vidět |
|---|---|---|
| GDPR odkaz pod formulářem, hodně neviditelně | Drobný šedý odkaz „Jak nakládáme s osobními údaji“ (12 px) pod tlačítkem. Kontrast drží AA. | CTA → formulář |
| Logo SVG | V repu SVG loga Webkit.Studio není. Zůstává současné řešení (symbol jako vektor + nápis). | Navbar, patička |
| Služby v hero ne, místo nich loga | Řádek služeb je pryč. Pod hero je pás 5 log klientů. | Hero |

## Homepage: 27 bodů → co se změnilo

| # | Bod zpětné vazby | Co se změnilo | Kde to vidět |
|---|---|---|---|
| 1 | Hero chce víc wow, „větší než my“, jen grafika | Pole z desítek dlaždic loga přes celou pravou polovinu až k okraji obrazovky. Dlaždice se natáčí ke kurzoru a zmenšují se kolem něj, bez myši běží vlna. Nadpis a podnadpis beze změny. CTA dopilované: „Probrat váš projekt“ + zelená tečka „Ozveme se do 24 hodin“. | Homepage → Hero |
| 2 | Loga klientů místo řádku služeb | Loga MARV Travel, ELDR, CRR, Arbosis a Anse z jejich webů, jednobarevně, po najetí zesílí. | Homepage → Hero |
| 3 | 5+ let a 30+ projektů v hero | Dvě velká čísla pod CTA: „5+ let zkušeností“, „30+ úspěšných projektů“. | Homepage → Hero |
| 4 | Jemný reveal textu při scrollu | Slova statementu se při scrollu po jednom rozsvěcují ze světlé do plné barvy. | Homepage → Statement |
| 5 | Modré zvýraznění, začít otázkou „proč“ | „Proč? Tou otázkou začíná každý náš projekt. **Co má vaší firmě přinést** a jak poznáte, že to funguje. Teprve potom řešíme design a kód.“ Zvýraznění modře. | Homepage → Statement |
| 6 | Tři body strojové, bez lidskosti | Nově: „Nejdřív posloucháme“, „Mluvíme narovinu“ („…i když to zrovna není to, co chcete slyšet“), „Dotahujeme věci“ („…víte, komu napsat“). | Homepage → Statement |
| 7 | Nadpis „Vyberte, s čím vám pomůžeme“ je divný | „S čím firmám pomáháme“. | Homepage → Služby |
| 8 | Text pod nadpisem | „Nevíte, co vybrat? [Pomůžeme vám přijít na to, jaký problém řešíte.]“ Druhá věta je podtržený odkaz na formulář. | Homepage → Služby |
| 9 | Podnadpisy služeb amatérské | Všech 8 vět přepsaných na pozicování: cíl, výsledek, jak pracujeme. Žádné vysvětlování, co je web. | Homepage → Služby |
| 10 | Webflow: techstack, napojení, partner | „Webflow partner. Čistá struktura, napojení na CRM a automatizace, vlastní kód tam, kde Webflow nestačí.“ Slovo „certifikovaný“ nikde, dokud certifikace není. | Homepage → Služby |
| 11 | Redesign: smysl, ne vzhled | „Redesign, který vychází z dat a cílů firmy. Nový vzhled je výsledek, ne zadání.“ | Homepage → Služby |
| 12 | Landing page: rychlost a konverze | „Stránka pro kampaň nebo produkt, spuštěná rychle a postavená na konverze. Měříme ji od prvního dne.“ | Homepage → Služby |
| 13 | MVP: rychlost | „První funkční verze produktu za týdny, ne měsíce.“ Konkrétní „do 2 týdnů“ je otázka 2. | Homepage → Služby |
| 14 | Aplikace: interní i externí, testování, zpětná vazba, servis | „Interní nástroje i aplikace pro vaše zákazníky. Od přechodu z tabulek přes testování a zpětnou vazbu po provoz.“ | Homepage → Služby |
| 15 | Identita: systém, ne logo, pro firmy | „Vizuální systém, který váš tým snadno používá. Na webu, v prezentacích i na sociálních sítích.“ | Homepage → Služby |
| 16 | „Jste agentura?“ smazat | Smazané ze Služeb i z navigace. Odkaz Pro agentury je jen v patičce. | Homepage → Služby, Footer |
| 17 | Nadpis „Projekty, na které jsme hrdí“ | Hotovo. | Homepage → Naše práce |
| 18 | Fullscreen při scrollu, medium nadpis 2 věty, logo + odkaz, bez štítků, interakce, video | Karty se při scrollu roztáhnou přes celou obrazovku a další projekt předchozí překryje. Každá karta má jinou barvu (ink, tmavě modrá, modrá). Logo klienta, výsledek ve 2 větách („Nový web, který vedl růst na německý trh. Navrhli jsme ho a postavili ve Webflow.“), odkaz na web. Štítky zrušené. Nad ukázkou se kurzor změní na kolo „Prozkoumat projekt“ a ukázka se natočí k myši. Komponenta počítá s videem MP4/WebM + poster, v náhledu je zástupná smyčka ze snímku. Anse v náhledu zatím není (grafika s částkami, rozhodnutí z 1. 10.). | Homepage → Naše práce |
| 19 | Nadpis „Proč nám klienti důvěřují“ | Hotovo. | Homepage → Proč s námi |
| 20 | 6 důvodů 1:1 Halo Lab, naše pravda, ikony a interakce, bez cen | 5+ let a 30+ projektů / Strategie před designem / Žádné šablony / Složité srozumitelně / Jasný postup / Rozsah podle potřeby (bez cen). Forma: **krátký nadpis + jedna věta**, protože samotných 6 medium textů se hůř skenuje. Ikona po najetí změní čtverec na čtvrtkruh z loga a zmodrá, karta se zvedne. | Homepage → Proč s námi |
| 21 | Citace Marek K., logo Anse | Citace na modrém bloku, velký text. Pod ní logo Anse a „Marek K.“. Text citace `[DOPLNIT]`. | Homepage → Reference |
| 22 | Webflow partner podle chatu | SVG logo Webflow + „Webflow Foundations Partner“. Odkaz na profil čeká na URL. | Homepage → Reference |
| 23 | Postup čistší, launchkit, velká čísla, animace | Nadpis „Náš osvědčený postup, který přináší výsledky“. 6 kroků jako medium text s jednou větou. Vlevo velké číslo aktivního kroku a ukazatel postupu, aktivní krok se rozsvítí. Univerzální kroky: Úvodní hovor, Workshop, Návrh, Připomínky, Spuštění, Rozvoj. Délky a nástroje jsou návrh (otázka 1). | Homepage → Postup |
| 24 | FAQ skrýt | Sekce je vyvinutá a skrytá (v liště přeškrtnutá). Ukázka je v Komponenty → FAQ homepage. | Homepage, Komponenty |
| 25 | Větší fotka Lukáše v sekci | Fotka 148 až 220 px se zaoblenými rohy, pod ní jméno s odkazem na osobní LinkedIn a role Studio Lead. | Homepage → CTA |
| 26 | Formulář s menšími okraji | Menší vnitřní odsazení karty, pole 46 px místo 52 px, tenčí rámeček, menší mezery. | Homepage → CTA |
| 27 | Blok na stránce, nebo samostatná stránka? Mini dotazník | **Formulář zůstává přímo na stránce.** Každý klik navíc ztrácí část lidí a na stránce se líp měří, ze které sekce lidé přišli. Po odeslání: kalendář → volitelný dotazník (web, velikost firmy, téma, 3 otázky k tématu) → hotovo. Detail níže. | Homepage → CTA (vyplňte a odešlete) |

## Webflow vývoj: vzorová produktová stránka

| Sekce | Blok | Co ukazuje |
|---|---|---|
| Hero (Služba) | bílá | Odznak Webflow partner + Foundations Partner, H1 „Webflow web, který drží i pod povrchem“, 4 až 8 týdnů, 5+ a 30+, pole dlaždic, loga |
| Statement | tón | „Výhody Webflow znáte. Rozdíl dělá, kdo ho postaví…“ |
| Výroky | ink | Čistá struktura (Client-First), napojení (CRM, Make, GTM, GA4), vlastní kód, správa bez nás |
| Podpis: Napojení | bílá | Schéma formulář / objednávka / návštěvnost → Make a API → CRM / e-mailing / reporty, s putujícími body |
| Naše práce | ink | ELDR fullscreen |
| Reference | modrá | Citace + partner |
| Postup | tón | 6 kroků za 4 až 8 týdnů |
| FAQ | bílá | 4 krátké otázky |
| CTA | modrá | Téma dotazníku je předvybrané na Webflow |

Co se mění na jiných službách, je v náhledu v Komponenty → Sekční komponenty (sloupec „Na jiné službě“) a v `D01-design-system.md`.

## Konverzní flow a události GA4

**Pořadí:** formulář → kalendář → dotazník. Lead je zachycený hned v kroku 1. Domluvený hovor je nejcennější další krok, proto jde kalendář před dotazník. Dotazník nabízíme jako „Chcete, abychom byli na hovor připravení?“. Kdo ho vynechá, o nic nepřijde. Každý krok jde přeskočit.

| Krok | Událost GA4 | Parametry | Poznámka |
|---|---|---|---|
| 1 Formulář odeslán | `generate_lead` | `form_name`, `page_type` | Hlavní konverze. Doporučená událost GA4. |
| 2 Kalendář zobrazen | `booking_view` | – | |
| 2 Termín vybrán | `booking_complete` | `slot_day` | Sekundární konverze. |
| 2 Přeskočeno | `booking_skip` | – | |
| 3 První odpověď | `questionnaire_start` | – | |
| 3 Odesláno | `questionnaire_complete` | `topic`, `company_size` | |
| 3 Přeskočeno | `questionnaire_skip` | – | |

Názvy formulářových polí (`co-resite`, `name`, `firma`, `email`) a název „Poptávka z homepage“ zůstávají kvůli Make. Odpovědi z dotazníku musí S04 doplnit do Make scénáře jako druhý webhook ke stejnému leadu.

**Otázky dotazníku podle tématu (3 na téma):**

| Téma | Otázky |
|---|---|
| Nový web | Kolik stránek zhruba čekáte? · Máte texty a fotky? · Co má web hlavně přinášet? |
| Webflow | Máte už web ve Webflow? · Na co ho chcete napojit? · Kdo bude web spravovat? |
| Redesign | Co vám na současném webu nejvíc vadí? · Máte data z analytiky? · Mění se s redesignem i značka? |
| Landing page | Pro jakou kampaň nebo produkt? · Odkud přijdou návštěvníci? · Máte grafiku kampaně? |
| UX audit | Co vás trápí nejvíc? · Máte přístup do analytiky? · Je to web, nebo aplikace? |
| MVP | V jaké fázi je nápad? · Kdo budou první uživatelé? · Máte vlastní vývojáře? |
| Webová aplikace | Pro koho je aplikace? · Jak to řešíte dnes? · Kolik lidí ji bude používat? |
| Vizuální identita | Máte už logo? · Kde se značka nejvíc používá? · Kdo bude podklady tvořit? |

Rozpočet ani termín se neptáme (rozhodnutí z 30. 9.).

## Výkon a přístupnost

- Vlastní JS náhledu je nad rozpočtem D01, protože obsahuje i lištu náhledu, knihovnu a obsah stránek. Produkční interakce (pole dlaždic, odhalení, fullscreen, krok za krokem, kurzor) mají dohromady odhadem 4 až 5 kB gzip a vejdou se do rozpočtu 6 kB. Ověří P01.
- Canvas se kreslí jen ve viditelné části obrazovky, na dotykových zařízeních bez sledování prstu, při omezeném pohybu stojí.
- `prefers-reduced-motion` (a přepínač „Bez animací“ v liště) vypne všechny animace. Statement je celý v plné barvě, projekty jsou pod sebou, kroky plně vidět.
- Kontrast: bílá na ink 19,2 : 1, bílá na modré 8,2 : 1, `#8FA8FF` na ink 8,4 : 1, modrá na tónu 7,3 : 1, šedý GDPR odkaz `#6F7488` na bílé 4,6 : 1.
