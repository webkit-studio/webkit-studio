import json,glob,os,re,sys
done=set(open('done_hosts.txt').read().split()) if os.path.exists('done_hosts.txt') else set()
cand={}
for f in glob.glob('runs/*/candidates.json'):
    for c in json.load(open(f)):
        h=re.sub(r'^www\.','',re.sub(r'^https?://','',c['web']).split('/')[0]); c['_run']=f.split('/')[1]; cand[h]=c
out=[]
for f in glob.glob('runs/*/sites/*/result.json'):
    r=json.load(open(f)); h=r['host']; d=os.path.dirname(f)
    if h in done: continue
    m=r['psi'].get('mobile',{}); k=r['psi'].get('desktop',{}); o=r.get('dom') or {}
    if 'error' in m or not os.path.exists(d+'/mobile.jpg'): continue
    pm=m.get('scores',{}).get('performance'); pd=k.get('scores',{}).get('performance') if k and 'error' not in k else None
    fl=[]
    if o.get('viewportMeta') is False: fl.append('R1?')
    if (m.get('finalUrl') or '').startswith('http://'): fl.append('HTTP?')
    if pm is not None and pd is not None and pm<30 and pd<60: fl.append('R4')
    if o.get('lorem') or o.get('placeholder'): fl.append('R3')
    if o.get('eshop'): fl.append('ESHOP')
    t=(o.get('title') or '')+' '+(o.get('textSample') or '')[:120]
    if not o or re.search(r'(?i)internal server error|forbidden|not found|chyba serveru|error occurred|503|502',t): fl.append('ERR?')
    if 'C' in sys.argv[1:] and o and o.get('viewportMeta') and not o.get('telLinks') and not o.get('inquiryForms'): fl.append('C?')
    if not [x for x in fl if x!='ESHOP']: continue
    c=cand.get(h,{})
    out.append({'host':h,'dir':d,'run':c.get('_run') or f.split('/')[1],'name':c.get('name'),'phone':c.get('phone'),'addr':c.get('address'),'reviews':c.get('reviews'),'rating':c.get('rating'),'rank':c.get('firmyRank'),'pm':pm,'pd':pd,'final':m.get('finalUrl'),'flags':fl,'forms':o.get('inquiryForms'),'tel':o.get('telLinks'),'copy':(o.get('copyright') or '')[:60],'maxY':o.get('maxYearInText'),'ares':c.get('ares'),'text':(o.get('textSample') or '')[:260]})
json.dump(out,open('shortlist.json','w'),ensure_ascii=False,indent=1)
for x in out: print(x['flags'],'|',x['run'],'|',x['host'],'|',x['name'],'|',x['phone'],'| PSI',x['pm'],'/',x['pd'],'| rev',x['reviews'],'| ',x['copy'])
print(len(out))
