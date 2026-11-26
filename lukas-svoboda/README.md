# Osobní stránka Lukáše Svobody

Samostatný projekt. S webem studia ani s projektem v2 nesouvisí, jen sdílí repo kvůli jsDelivr.

Stránky `webkit.studio/lukas-svoboda` (CZ) a `webkit.studio/en/lukas-svoboda` (EN). Obě jsou `noindex` a nejsou v mapě webu.

## Co tu je

| Soubor | K čemu |
|---|---|
| `lukas-svoboda.css` | všechny styly stránky |
| `lukas-svoboda.js` | chování stránky: scroll scény, menu, role, proces, kopírování kontaktů |

Soubory se nesestavují. Co je tady, to si Webflow načte. Skript `site/webflow/build.py` se jich netýká.

## Jak je to oddělené od webu studia

- Vlastní složka mimo `site/`.
- Každý selektor v CSS začíná `.ls-page` nebo třídou s předponou `ls-`. Stylů webu se nedotkne.
- JS je jedna uzavřená funkce bez závislostí. Hledá jen prvky s třídami `ls-`.
- Vlastní Action na čištění cache: `.github/workflows/jsdelivr-purge-lukas-svoboda.yml`.

## Co je vložené ve Webflow

Jen na těch dvou stránkách, ne v nastavení webu.

Hlavička stránky:

```html
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/webkit-studio/webkit-studio@main/lukas-svoboda/lukas-svoboda.css">
```

HTML Embed na konci stránky:

```html
<script defer src="https://cdn.jsdelivr.net/gh/webkit-studio/webkit-studio@main/lukas-svoboda/lukas-svoboda.js"></script>
```

## Jak se nasazuje změna

```
uprav .css nebo .js   →   git push do main
```

Action po pushi vyčistí cache jsDelivru. Kdyby se změna neprojevila, ručně:
`https://purge.jsdelivr.net/gh/webkit-studio/webkit-studio@main/lukas-svoboda/lukas-svoboda.css`

## Kde je zbytek

Prototyp, struktura stránek, popis tříd a fotky jsou v soukromém repu projektu. Sem patří jen to, co musí být veřejné kvůli CDN.
