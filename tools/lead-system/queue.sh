#!/bin/bash
# Spustí všechny běhy z jobs.txt, 3 najednou (víc zahltí minutovou kvótu PSI).
# Řádek jobs.txt: slozka|Obor|dotaz 1;dotaz 2;...
cd "$(dirname "$0")"
: "${PSI_API_KEY:?Nastav PSI_API_KEY (Google PageSpeed Insights API klíč)}"
export PREFILTER=1
# Kolik výsledků Firmy.cz na dotaz (po SKIP). 7 = s SKIP=5 místa 6.–12.
export NA_DOTAZ=${NA_DOTAZ:-7}
JOBS=${1:-jobs.txt}
echo "START $(date +%H:%M)"
run_job() { IFS='|' read -r dir label queries <<< "$1"; IFS=';' read -ra Q <<< "$queries"; node pipeline.mjs "runs/$dir" "$NA_DOTAZ" "$label" "${Q[@]}" > "runs_$dir.out" 2>&1; echo "DONE $dir $(date +%H:%M) $(tail -n 1 runs/$dir/log.txt)"; }
export -f run_job
grep -v '^#' "$JOBS" | grep -v '^$' | tr '\n' '\0' | xargs -0 -P 3 -I{} bash -c 'run_job "$1"' _ {}
echo "ALL DONE $(date +%H:%M)"
