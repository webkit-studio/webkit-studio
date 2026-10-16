# Zadání motion videa

Čím víc detailu, tím blíž výsledek. Tuhle šablonu může vyplnit i Claude z rozhovoru s Lukášem a pak ji pustit v čerstvé session.

```
CÍL A KANÁL
[launch video na LinkedIn | logo animace | explainer do hero na webu | video k příspěvku | UI demo]
Co má divák po zhlédnutí udělat nebo si zapamatovat: [jedna věta]

PRODUKT NEBO TÉMA
Co to je: [ ]
Pro koho: [ ]
Jedno poselství: [ ]
Fakta, která smí zaznít (jen ověřená): [ ]

PŘÍBĚH PO BEATECH
0–2 s   háček: [ ]
2–6 s   problém nebo situace: [ ]
6–14 s  řešení, 2–3 momenty: [ ]
14–18 s důkaz nebo detail: [ ]
18–20 s logo a výzva: [ ]

FORMÁT
Délka [ ] s · poměr [16:9 | 9:16 | 1:1 | 4:5] · [30 | 60] fps · [1080p | 4K]

VZHLED
Design systém nebo tokeny: písma [ ], barvy [hex], logo [cesta k SVG]
Styl: [název z references/styly.md, nebo reference]
Zakázané: výchozí barvy Clauda, fialové gradienty, text na střed bez důvodu

STYL POHYBU
Tempo: [rychlé střihy | plynulé morfování | stop motion 12 fps]
Easing: [ostrý nástup, měkký dojezd | pružina]
Přechody mezi scénami: [ ]

ZVUK
Hudba: [nálada, tempo v BPM, nebo dodaný soubor]
Efekty: synchronizované s beaty a pohyby
Hlas: [text komentáře | dodaná MP3 | bez hlasu]

TECHNIKA
Remotion. Render MP4 (H.264, yuv420p) přes FFmpeg.
Nejdřív storyboard 5–8 klíčových snímků jako PNG, počkej na schválení.

KONTROLA KVALITY
Před odevzdáním vytáhni kontaktní list snímků, najdi vady
(oříznutý text, překryv, kontrast, prázdný snímek, skok, bezpečná zóna),
oprav a opakuj. Zvlášť zkontroluj první a poslední snímek.

PRAVIDLA
Žádná vymyšlená čísla ani loga klientů. Text čitelný na telefonu.
Každá scéna má jeden hlavní prvek.
```

## Logo animace bez představy o pohybu

Sekce Příběh a Styl pohybu vynech a místo nich napiš:

```
Navrhni vlastní koncept animace loga. Vycházej z tvarů v SVG
a z toho, co značka říká. Vyrob 3 varianty v odlišných stylech,
každá 2–4 s, konec na statickém logu. U každé jedna věta, proč sedí ke značce.
```

Pak klidně „ještě 2, úplně jiný styl“. Prototypovat koncepty je levné, rozhodnutí až potom.
