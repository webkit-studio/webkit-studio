# Rozhodnutí

| Datum | Rozhodnutí | Proč |
|---|---|---|
| 29. 9. 2026 | Texty a analýza v2 vznikají od nuly, staré podklady se nečtou (seznam v `CLAUDE.md`). | Staré texty opakovaně stáhly nové zpátky ke starému směru. |
| 29. 9. 2026 | Hlas webu je čisté „my“ studio. Cílovky: MSP, startupy, agentury (white-label). | Rozhodnutí Lukáše. |
| 29. 9. 2026 | Písma zůstávají (Bricolage Grotesque, Instrument Sans, IBM Plex Mono). Barvy: bílá a modrá `#1D2BE8`, bez lilac a fialové. | Rozhodnutí Lukáše. |
| 29. 9. 2026 | Stavba výhradně z nativních Webflow prvků a komponent (props, varianty). Relume jen jako předloha rozvržení. | Rozhodnutí Lukáše. Relume MCP dává React, ne Webflow. |
| 29. 9. 2026 | Jedno CMS „Projekty“. Filtr podle služby přes přepínače (Switch), ne druhou kolekcí. | Požadavek „jedno CMS“. Webflow nemá pole s více možnostmi. |
| 29. 9. 2026 | Repo i issues zůstávají veřejné. Nic interního do nich nepatří. | jsDelivr servíruje jen z veřejného repa. |
| 29. 9. 2026 | Na produkční doménu publikuje jen L01 po schválení. Ostatní session publikují jen na staging `webkit-studio.webflow.io`. | Živý web nesmí spadnout během přestavby. |
| 29. 9. 2026 | Lighthouse: přístupnost, best practices a SEO musí mít 100. Výkon na mobilu aspoň 95, cíl je 100. | Webflow vždy načítá jQuery a webflow.js (~350 kB), 100 na mobilu nelze slíbit předem. |
| 29. 9. 2026 | B01: ceny v analýze jsou tržní rozpětí se zdrojem, naše balíčky jen jako návrh do potvrzení Lukášem. Čísla z mockupů projektů se nepoužívají. | Fakta o nás se nevymýšlejí, mockupy nemusí ukazovat skutečná data. |
| 29. 9. 2026 | B02: objemy hledanosti v analýze jsou relativní (Suggest, Trends, Seznam), přesná čísla doplní M01 z Keyword Planneru, Skliku a Search Console. | Placené nástroje nejsou v session dostupné. Čísla se nevymýšlejí. |
| 29. 9. 2026 | B02: návrhy URL (`/tvorba-webovych-stranek`, sloučení designu, grafiky a MVP) jsou doporučení do ✋A, ne schválená struktura. Finální strukturu určí T01. | Rozhoduje Lukáš na bráně ✋A. |
| 30. 9. 2026 | D01: tokeny v2 (bílá, povrch, ink ve 3 stupních, modrá `#1D2BE8` a chladné světlé odstíny), fluidní typová škála, radiusy 6/10/16/24/pill. Detail v `docs/web-v2/D01-design-system.md`. | Návrh ke schválení na ✋B. Světlé odstíny modré posunuté k 225°, aby nepůsobily fialově. |
| 30. 9. 2026 | D01: stránky služeb sdílí 21 sekčních komponent, liší se pořadím, vynechanými sekcemi a jednou podpisovou sekcí (Srovnání, Před a po, Pro koho to je). | Princip Halo Lab ze zadání. Pořadí podle obavy zákazníka dané služby. |
| 30. 9. 2026 | D01: jediná sytě modrá plocha na stránce je velké CTA s formulářem. Stíny jen u plovoucích prvků, gradient jen jako maska marquee. | Premium flat, pozornost na poptávku. |
| 30. 9. 2026 | D01: interakce jen transform a opacity, vanilla JS, rozpočet vlastní CSS ≤ 12 kB a JS ≤ 6 kB gzip. | Lighthouse mobil ≥ 95 vedle povinného jQuery a webflow.js. |
| 30. 9. 2026 | ✋A od Lukáše: 8 stránek služeb (design webu pod tvorbu webu, grafika pod vizuální identitu) + stránka pro agentury. | Lukáš: „ok“. |
| 30. 9. 2026 | ✋A: URL `/tvorba-webovych-stranek` místo `/vyvoj-…`. | Lukáš: „ok, jestli říkáš“ (data z B02). |
| 30. 9. 2026 | **Ceny nikde a nikdy.** Žádné částky, rozpětí ani „od“. Termíny ano (web 4–8 týdnů podle velikosti). | Lukáš: cenový model je neveřejný a pohyblivý podle hodnoty pro zákazníka. Návrhy B01/B02 o cenách jsou zamítnuté. |
| 30. 9. 2026 | **Žádný audit s pevnou cenou ani odečtem.** Audit je služba, web může následovat, rozhodnutí je na zákazníkovi. | Lukáš: „prostě ne, tečka“. Opakovaný návrh, už nenavrhovat. |
| 30. 9. 2026 | Formulář bez polí rozpočet a termín. Pole Firma je povinné. Po odeslání se otevře rezervační kalendář, rezervace je na zákazníkovi. | Lukáš: ✋A bod 5 „ne“. Konverze = odeslaný formulář. |
| 30. 9. 2026 | Fakta: 30+ digitálních projektů. Google recenze nemáme, sekce s hodnocením Google se skryje. Webflow Partner: Lukáš pošle odkaz. | Lukáš. |
| 30. 9. 2026 | **Zakázaný argument „jeden člověk / projekt vede jeden člověk“.** Nanejvýš „jeden dodavatel“. | Lukáš: tahle zkostnatělost z předchozích chatů sem nepatří. |
| 30. 9. 2026 | Homepage je obecná a buduje důvěru, není o webech. Služby definují až stránky služeb. FAQ na homepage obecné. | Lukáš opakovaně. |
| 30. 9. 2026 | Kontakt na webu: všude jen `inbox@webkit.studio`. Jediná osoba: v závěrečném CTA slabě „Lukáš Svoboda, Studio Lead“ + LinkedIn + fotka (`docs/web-v2/assets/lukas-*.webp`). Slib „Ozveme se do 24 hodin“, nic dalšího. | Lukáš. |
| 30. 9. 2026 | Princip „Simple“ (Apple: ~~simplicity~~ ~~simply~~ simple). Začít minimem, přidávat jen to, co uživatel udrží. Texty skoro 1:1 styl Halo Lab, tah na branku (inspirace i pixelmate.cz). Obrázky jen jako grafické doplňky (organické, 3D, ilustrace, interaktivní prvek), žádné fotky obsahu. Bez štítků (eyebrow) nad sekcemi. | Zpětná vazba Lukáše k D01. |
