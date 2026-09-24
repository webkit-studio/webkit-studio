#!/bin/bash
# Přeměří v PSI jen weby, kde měření selhalo (kvóta, timeout). Max 5 najednou.
cd "$(dirname "$0")"
: "${PSI_API_KEY:?Nastav PSI_API_KEY}"
export PSI_ONLY=1
python3 - <<'PY' > repsi_list.txt
import json,glob
for f in sorted(glob.glob('runs/*/sites/*/result.json')):
    r=json.load(open(f)); p=r.get('psi',{})
    if any(('error' in (p.get(k) or {'error':1})) for k in ('mobile','desktop')): print(r['url'], f.rsplit('/',1)[0])
PY
echo "k přeměření: $(wc -l < repsi_list.txt)"
cat repsi_list.txt | xargs -P 5 -L 1 bash -c 'sleep $((RANDOM % 8)); node verify2.mjs "$0" "$1" | cut -c1-160'
echo HOTOVO_REPSI
