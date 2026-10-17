---
name: motion-video
description: Výroba animovaného videa z kódu – logo animace, explainer, launch video, video k příspěvku, UI demo, animovaný graf. Postup zadání → storyboard → stavba (Remotion, HyperFrames, nebo čistý JS s Playwright a FFmpeg) → kontrolní smyčka přes kontaktní list snímků → zvuk (ElevenLabs, Higgsfield) → render a cílené úpravy. Použij vždy, když Lukáš chce video, animaci loga, motion grafiku, explainer, reels nebo shorts, GIF, animovaný graf nebo „něco jako ta Opus videa na X", i když nástroj nejmenuje.
---

# Motion video z kódu

Claude video nemaluje. **Píše kód, který vykreslí každý snímek, a FFmpeg snímky složí.** Proto jde změnit jedno slovo a zbytek videa zůstane stejný. Plná verze a rozhodnutí studia: uzel mapy `projekty-motion`.

## Volba cesty

| Cesta | Kdy |
| --- | --- |
| **Remotion** (výchozí) | Skoro vždy. Kompozice v Reactu, náhled ve Studiu, render MP4 |
| HyperFrames | Když je přirozenější HTML a CSS |
| Čistý JS + Playwright + FFmpeg | Krátké a jednoduché věci bez závislostí |
| Higgsfield (MCP) | Realistický záběr, fotka, přechod z grafiky do reality. Čerpá kredity |
| ElevenLabs (MCP) | Komentář a hlas. Hlas vyber podle značky a řekni, který |

Delší video nikdy „od nuly bez frameworku“. AI si pak staví vlastní render a výsledky jsou nevyrovnané. Když je k dispozici oficiální Remotion skill nebo plugin, načti ho.

## Postup

1. **Zadání** podle `references/zadani.md`. Chybí účel, kanál, délka, poměr stran, brand nebo zvuk? Griluj (skill `grilovani`), nejvýš jedno kolo.
2. **Brand.** Design systém klienta nebo studia. Žádné výchozí barvy Clauda. Logo jen jako SVG. Bez design systému se zeptej.
3. **Scénář po beatech** v sekundách. S komentářem nejdřív audio (MP3), vizuál se časuje na něj. Časy slov získáš přepisem (faster-whisper).
4. **Storyboard.** 5–8 klíčových snímků jako PNG, vyrenderovaných z kompozice. Ukaž a počkej na schválení. **Bez schváleného storyboardu nestav celé video.**
5. **Stavba.** Délky scén a časování v konstantách nahoře, ať jdou snadno upravit. Fonty lokálně. Easing nikdy lineární.
6. **Kontrolní smyčka** (povinná):
   - vyrenderuj video,
   - spusť `scripts/kontaktni-list.sh video.mp4` a prohlédni mřížku snímků,
   - zvlášť prohlédni začátek, přechody a poslední snímek (`ffmpeg -sseof -0.1 -i video.mp4 -frames:v 1 konec.png`),
   - hledej oříznutý nebo přetékající text, překryv, slabý kontrast, prázdný snímek, skok, chybějící font, text mimo bezpečnou zónu (u 9:16 horních a dolních 15 %),
   - oprav, vyrenderuj znovu, opakuj, dokud list nevypadá dobře.
7. **Zvuk.** Hudba a efekty načasované na beaty. Generovaný (Python, ElevenLabs, Higgsfield) nebo dodaný. Licenci ověř.
8. **Render.** MP4 H.264 (`-pix_fmt yuv420p -movflags +faststart`), WebM pro web, GIF jen krátký a malý. 30 fps běžně, 60 fps pro plynulé UI.
9. **Úpravy.** Cíleně, jedna změna na prompt. Na zbytek nesahej.

## Logo animace

Bez zadání pohybu navrhni vlastní koncept. Vyrob 3 varianty v **odlišných stylech** (`references/styly.md`). Délka 2–4 s, konec na statickém logu. Animuj skutečné tvary ze SVG, logo nepřekresluj.

## Pravidla

- Žádná vymyšlená čísla, loga klientů ani citace v grafice.
- Text čitelný na telefonu: při šířce 1080 px aspoň 48 px.
- Dlouhé běhy čerpají limity předplatného. Storyboard před stavbou je největší úspora. Před dlouhým renderem nebo generováním za kredity řekni odhad.
- Zdroj videa patří do repa nebo složky projektu, hotový render do podkladů projektu v Dashboardu.

## Rychlý start (Remotion)

```bash
npx create-video@latest --yes --blank video && cd video
npx remotion studio                                                  # náhled
npx remotion still src/index.ts <Kompozice> out/f090.png --frame=90  # snímek pro storyboard
npx remotion render src/index.ts <Kompozice> out/video.mp4           # render
```

Šablona `--three` je pro 3D (three.js).
