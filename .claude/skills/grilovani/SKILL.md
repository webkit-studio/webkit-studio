---
name: grilovani
description: Grilování zadání před prací – Claude se po kolech ptá na všechna otevřená rozhodnutí (u každého doporučená odpověď), fakta si dohledá sám, pak sepíše spec a podle potřeby ji rozřeže na kusy do čerstvých session. Použij vždy, když Lukáš napíše „griluj mě", „vyzpovídej mě", „než začneš", „sepiš spec", „rozřež to", nebo když zadání (funkce, web, sekce, aplikace, VI, text, automatizace, video) má mezery, které by AI jinak zaplnila odhadem – i když grilování výslovně nezmíní. Nepoužívej na drobnosti s jediným rozumným řešením.
---

# Grilování

Jedna věta zadání skrývá desítky rozhodnutí. Co Lukáš neřekne, AI doplní odhadem a jede dál. Grilování ta rozhodnutí najde dřív, než vznikne kód, text nebo video. Plná verze cyklu práce: uzel mapy `standardy-ai`.

## Fakta a rozhodnutí

- **Fakt** (co je v repu, v mapě Dashboardu, na webu klienta, v dřívějším rozhodnutí) → dohledej sám. Na větší hledání pošli pomocného agenta. Na fakta se neptej.
- **Rozhodnutí** (co se stane, když…, jak se to jmenuje, co je hotovo, co je mimo) → patří Lukášovi. Ptej se.
- Než se začneš ptát, načti kontext: `CLAUDE.md`, `docs/decisions.md`, relevantní uzly mapy (`get_map`, pak `get_node`). Co už je rozhodnuté, znovu neotvírej.

## Strom rozhodnutí

Práci si představ jako strom. Nahoře hlavní rozhodnutí, pod ním ta, která na něm závisí. **Hranice** jsou rozhodnutí, jejichž rodič už je rozhodnutý.

Každé kolo:

1. Projdi hranici. Vyber otázky, které mění výsledek, ne kosmetiku.
2. Polož je **všechny najednou, číslovaně**. U každé **doporučená odpověď** a jedna věta proč.
3. Formát: `3. Pauza začíná hned, nebo od dalšího období? → Doporučuju: od dalšího období (zaplacené se nevrací).`
4. Lukáš odpoví stručně („ano, ano, ne, 3 jinak: …“). Zapiš, posuň hranici, další kolo.

Když jsou v kole nejvýš 4 výběrové otázky a máš nástroj na otázky s tlačítky, použij ho. Jinak číslovaný text.

**Hloubka podle velikosti:** drobnost 0–3 otázky, běžná věc kolem 6, funkce nebo web kolem 20. Přes 40 znamená, že je práce moc velká. Navrhni ji rozdělit.

**Kde se ptát nejvíc:** hraniční situace. Co když to selže, co když je prázdno, co když uživatel udělá X uprostřed Y, kdo to uvidí, co se stane se starými daty, kdo dostane upozornění.

## Jedno slovo pro jednu věc

- Padne nový pojem? Zeptej se, jestli je to totéž jako existující („přeskočit = pozastavit?“).
- Pojmy zapiš do glosáře projektu: jedna věta definice a slova, která nepoužívat. U webu uzel `standardy-web-slovnik`, jinak Zadání nebo `docs/`.
- Lukáš napíše „cože?“ nebo „nerozumím“: zopakuj poslední zprávu jednoduše, slovy z glosáře, bez žargonu.

## Co se slovy rozhodnout nedá

Vzhled, tok obrazovek, „jak to bude působit“: připrav 2–3 **výrazně odlišné** rychlé prototypy (HTML, storyboard, skica). Lukáš proklikne a vybere. Výsledek vrať do grilování jako rozhodnutí.

## Když Lukáš u session není

Štafeta a rutiny: otázky napiš do issue, každou s doporučenou odpovědí. Pokračuj na tom, co na odpovědích nezávisí. Nehádej rozhodnutí, která mění, co se staví.

## Konec grilování

Nestav, dokud hranice není prázdná **a** Lukáš nepotvrdí, že jste na stejné stránce. Pak bez dalších otázek sepiš spec.

### Spec

```markdown
## Problém
## Řešení
Jedna věta, pak detail.
## Uživatelské příběhy
1. Jako [kdo] v situaci [kdy], chci [co], abych [proč].
## Mimo rozsah
## Kde se to testuje
Místa, kde testy nebo kontrola sahají do výsledku. Ideálně jedno.
## Glosář
## Rozhodnutí
Číslovaně, s datem a „Lukáš“.
```

Kam: issue (štafeta), Zadání projektu v Dashboardu, nebo uzel mapy. Spec je obraz rozhodnutí. Po dodání žijí rozhodnutí v kódu, testech a glosáři a spec se zavře.

### Řezy (u větší práce)

- Odhadni tokeny celé práce a vyděl 150 000. Vyjde počet řezů. Každý se vejde do jedné čerstvé session, kde model ještě dobře uvažuje.
- Řez jde napříč vrstvami (data → logika → UI) a funguje sám. Ne „nejdřív celá databáze, pak celé UI“.
- U každého řezu: co dodá, „Hotovo znamená“ (ověřitelně), na čem závisí.
- Ve štafetě je řez issue (skill `stafeta`).

## Mimo kód

Stejný postup platí všude. Liší se jen otázky na hranici:

| Typ | Na co se ptát |
| --- | --- |
| Web | Jádrová touha, registr, námitka č. 1, primární CTA (`standardy-web-otazky`) |
| VI | Kde se značka používá, co nesmí připomínat, co zůstává ze staré |
| Text | Kdo čte, co má udělat po přečtení, co nesmí zaznít |
| Automatizace | Spouštěč, co když selže, kdo dostane upozornění, co se stane s duplicitou |
| Video | Kanál, délka, poměr stran, jedno poselství, zvuk |
