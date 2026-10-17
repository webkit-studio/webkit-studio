# karta-doplnit.py [--apply] [--znamky A,B] — doplní kartu webu (karta.mjs) k leadům ve stavu K oslovení.
# Bez --apply jen vypíše barvy, nic nezapisuje. Měření (verify2) se ukládá do out2/karta/<host> a znovu se nepouští.
# Karta jde na začátek textu leadu, za řádek [kontrola …] Kat., starou kartu nahradí. Potřebuje WKD_TOKEN a PSI_API_KEY.
import json, os, re, subprocess, sys, concurrent.futures as cf
from urllib.parse import urlparse
LS = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(LS, 'out2', 'karta'); os.makedirs(OUT, exist_ok=True)
TOK = os.environ['WKD_TOKEN']; API = 'https://webkit.studio/dashboard/api'
ZNAMKY = (sys.argv[sys.argv.index('--znamky') + 1] if '--znamky' in sys.argv else 'A,B').split(',')
APPLY = '--apply' in sys.argv

def curl(args, data=None):
    # Cloudflare blokuje Python urllib (chyba 1010), proto curl.
    return subprocess.run(['curl', '-sS', '-H', 'Authorization: Bearer ' + TOK] + args, input=data, capture_output=True, text=True).stdout

def nacti():
    return [l for l in json.loads(curl([API + '/leads']))['leads'] if l['status'] == 'k_osloveni' and l.get('grade') in ZNAMKY and l.get('web')]

host = lambda u: urlparse(u if u.startswith('http') else 'https://' + u).hostname
domena = lambda u: re.sub(r'^www\.', '', host(u))
leads = nacti(); print('leadů', len(leads), flush=True)

def zmer(l):
    od = os.path.join(OUT, host(l['web']))
    if os.path.exists(od + '/result.json'): return host(l['web']), 'už změřeno'
    subprocess.run(['timeout', '420', 'node', 'verify2.mjs', l['web'], od], cwd=LS, capture_output=True, text=True)
    return host(l['web']), 'ok' if os.path.exists(od + '/result.json') else 'chyba'
with cf.ThreadPoolExecutor(4) as ex:
    for h, st in ex.map(zmer, leads): print('měření', h, st, flush=True)

g30 = {}
domeny = sorted({domena(l['web']) for l in leads})
for i in range(0, len(domeny), 15):
    r = subprocess.run(['timeout', '600', 'node', 'inzeruje.mjs', *domeny[i:i + 15]], cwd=LS, capture_output=True, text=True)
    for radek in r.stdout.splitlines():
        try: x = json.loads(radek); g30[x['domena']] = x['google30']
        except ValueError: pass

cerstve = {x['id']: x for x in nacti()}  # měření trvá dlouho, verze leadu se mezitím mohla změnit
for l in [cerstve.get(l['id'], l) for l in leads]:
    rj = os.path.join(OUT, host(l['web']), 'result.json')
    if not os.path.exists(rj): print('přeskočeno, bez měření:', l['name'], flush=True); continue
    note = l.get('note') or ''
    plati = bool(re.search(r'Platí:[^\n]*Firmy\.cz', note)) or 'placený profil' in (l.get('proof') or '').lower()
    g = g30.get(domena(l['web']))
    r = subprocess.run(['node', 'karta.mjs', rj] + (['--platiProfil'] if plati else []) + ['--google30', 'null' if g is None else str(g), '--json'], cwd=LS, capture_output=True, text=True)
    try: k = json.loads(r.stdout)
    except ValueError: print('karta selhala:', l['name'], r.stderr[-200:], flush=True); continue
    bez = re.sub(r'\*\*Karta webu\*\*.*?(?=\n## |\Z)', '', note, flags=re.S).strip('\n')
    m = re.match(r'(\[kontrola[^\n]*\n)', bez)
    novy = (m.group(1) + '\n' + k['md'] + '\n\n' + bez[m.end():].lstrip('\n')) if m else (k['md'] + '\n\n' + bez)
    if not APPLY:
        print('náhled', l['name'], ' '.join(x['barva'] for x in k['radky']), flush=True); continue
    telo = {'akce': 'upravit', 'id': l['id'], 'verze': l['verze'], 'note': novy}
    psi = json.load(open(rj)).get('psi', {})
    for pole, s in (('psiMobile', 'mobile'), ('psiDesktop', 'desktop')):
        v = ((psi.get(s) or {}).get('scores') or {}).get('performance')
        if v is not None: telo[pole] = v
    kod = curl(['-X', 'POST', API + '/admin/marketing/leads', '-H', 'Content-Type: application/json', '--data-binary', '@-', '-o', '/dev/null', '-w', '%{http_code}'], json.dumps(telo))
    print('zapsáno' if kod == '200' else 'CHYBA ' + kod, l['name'], flush=True)
print('HOTOVO', flush=True)
