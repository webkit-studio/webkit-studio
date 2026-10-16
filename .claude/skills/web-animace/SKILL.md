---
name: web-animace
description: Výběr, zadání a implementace animací na webu – pět typů od jemných po dramatické (odkrytí, parallax, intro, pohyb po dráze, video na scroll), kdy neanimovat, napojení na stylový registr, Webflow Interactions vs. vlastní kód, výkon a prefers-reduced-motion. Použij vždy, když se na webu nebo v UI řeší animace, pohyb, scroll efekty, mikrointerakce, hover, načítání, intro, parallax, „ať to žije", „prémiovější pocit" nebo „wow efekt", i když slovo animace nepadne.
---

# Animace na webu

Animace řídí pozornost. **Když se hýbe všechno, nevyčnívá nic.** Plná verze: uzel mapy `standardy-web-animace`.

## Nejdřív rozhodni, jestli vůbec

U každé navržené animace napiš jednou větou, co dělá: ukazuje hierarchii, stav, směr, nebo nese značku. Když to nejde napsat, neanimuj.

Míra podle stylového registru (`standardy-web-registr`):

| Registr | Co sedí |
| --- | --- |
| Jobs, Huang | Skoro nic. Jemné odkrytí, u Jobse parallax obrázku v rámu |
| Barrymore | Měkké odkrytí, jemná reakce na hover |
| Zendaya | Odkrytí textu, parallax vrstev |
| Abloh | Jeden pohyb vázaný na hlavní prvek, opakovaný celým webem |
| Nolan | Pohyb po dráze, video na scroll, intro. Jen s rozpočtem na vývoj |

## Pět typů

| Typ | Kdy ano | Kdy ne | Jak zadat |
| --- | --- | --- | --- |
| Odkrytí | Text, mřížka, sekce. Skoro všude | Web, který už je rušný | Typ (fade, wipe, slide), směr, prvky, rozestup mezi položkami |
| Parallax | Minimalistický web, portfolio, obrázek v rámu | Mobil, obrázek bez místa kolem | Která vrstva a jak silně (10–20 % pohybu) |
| Intro | Umělecký a zábavní web | Web pro informace: služby, menu, kontakt | Sekvence krok za krokem a předání na homepage. Pár sekund, jen první návštěva, jde přeskočit |
| Pohyb po dráze | Hodně obrázků, portfolio | Video v dráze, slabé připojení | Dráha (orbita, spirála, koule, k divákovi), rychlost, plynule nebo podle scrollu |
| Video | Launch produktu, značka s ambicí | Většina webů | Spuštění: po načtení, spouštěčem, nebo scrollem. Koncový snímek = počáteční snímek dalšího |

## Reakce na akci

Každá akce má odezvu: hover, stisk, načítání, odeslání, chyba. Odezva začne do 100–200 ms a odpovídá váze akce. Pracovní nástroj reaguje stroze, prezentační web smí víc.

## Implementace

1. **Webflow: nativně přes Interactions (GSAP).** Vlastní kód jen když to nativně nejde, podle `standardy-kod` (GitHub → Cloudflare → `<script defer>`, podpis).
2. Mimo Webflow: CSS transition a `@keyframes` na jednoduché věci, IntersectionObserver na odkrytí, GSAP se ScrollTriggerem na řízení scrollem.
3. Animuj jen `transform` a `opacity`. Nic, co posouvá layout.
4. **`prefers-reduced-motion: reduce`** dostane statickou verzi nebo krátký fade. Vždy.
5. Parallax na mobilu (pod 768 px) vypni.
6. Obrázky v dráze zmenši na zobrazenou velikost, WebP nebo AVIF, lazy.
7. Video po načtení nebo spouštěčem: WebM se zálohou MP4, `muted playsinline`, `poster`. Video na scroll: sekvence WebP kreslená do `<canvas>`, ne `<video>`. Scrubuje plynuleji.
8. Ověř Core Web Vitals po přidání animací (PageSpeed Insights, ne měření z cloud kontejneru). Výsledek nesmí být horší než předtím.

## Vzor: odkrytí při scrollu (vlastní kód mimo Webflow)

Obsah zůstane vidět, když JavaScript selže nebo má uživatel omezený pohyb. Skript patří do `<head>`, aby třída přišla před prvním vykreslením.

```html
<style>
  .wk-motion [data-reveal] {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity .6s ease, transform .6s cubic-bezier(.2, .7, .2, 1);
  }
  .wk-motion [data-reveal].is-in { opacity: 1; transform: none; }
</style>
<script>
  (() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('wk-motion');
    addEventListener('DOMContentLoaded', () => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const i = [...el.parentElement.children].indexOf(el);
          el.style.transitionDelay = Math.min(i, 6) * 60 + 'ms';
          el.classList.add('is-in');
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -10% 0px' });
      document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    });
  })();
</script>
```

## Anti-vzor

- **Všechno vyjíždí zdola.** Nejčastější znak AI webu.
- **Intro na webu služeb.** Každá sekunda čekání je šance, že návštěvník odejde.
- **Levný Nolan.** Rozbité 3D působí hůř než žádné. Prodej jeden silný pohyb.
