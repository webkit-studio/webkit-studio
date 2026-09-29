#!/bin/bash
# Jeden běh pro jeden obor: hledání → měření → přeměření → shortlist → přehled screenshotů.
# Použití: SKIP=5 NA_DOTAZ=7 ./beh.sh <slozka> "<Obor>" "dotaz 1;dotaz 2;..."
# Používá noční rutina (rutiny/nocni-hledani.md), jde pustit i ručně.
set -u
cd "$(dirname "$0")"
: "${PSI_API_KEY:?Nastav PSI_API_KEY (Google PageSpeed Insights API klíč), viz README → Klíč PSI}"
[ $# -eq 3 ] || { echo "Použití: SKIP=5 ./beh.sh <slozka> \"<Obor>\" \"dotaz 1;dotaz 2\""; exit 1; }
[ -d node_modules/playwright ] || npm install --no-audit --no-fund --silent
printf '%s|%s|%s\n' "$1" "$2" "$3" > jobs.txt
./queue.sh jobs.txt
./repsi.sh
python3 shortlist.py C
node sheet.mjs shortlist.json "runs/$1/prehled"
echo "HOTOVO: runs/$1, shortlist.json, runs/$1/prehled-*.png"
