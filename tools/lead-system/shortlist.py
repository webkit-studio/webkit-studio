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
    if re.search(r'(?i)mostbet|1xbet|\bkasin|\bcasino|sázková kancelář|\bviagra\b|\bcialis\b|payday', (o.get('textSample') or '')+(o.get('title') or '')): fl.append('SPAM')
    if 'C' in sys.argv[1:] and o and o.get('viewportMeta') and not o.get('telLinks') and not o.get('inquiryForms'): fl.append('C?')
    c=cand.get(h,{})
    # Platí za marketing: placený profil na Firmy.cz nebo reklamní kód na webu (Google, Meta, Sklik).
    rk=r.get('reklama') or {}
    ads=[k for k in ('google','meta','sklik') if rk.get(k)]
    plati=c.get('paid') is True or bool(ads)
    if plati and o and not o.get('failed'):
        if not o.get('ctaInFirstScreen') and not o.get('telInFirstScreen'): fl.append('NOCTA')
        if not o.get('inquiryForms'): fl.append('NOFORM')
        if not o.get('telLinks'): fl.append('NOTEL')
    if plati and (m.get('lcpMs') or 0)>4000: fl.append('SLOW')
    silne={'R1?','HTTP?','R4','R3','NOCTA','NOFORM','ERR?','SPAM'}
    if plati:
        if not [x for x in fl if x in silne]: continue
    elif not [x for x in fl if x not in ('ESHOP','NOCTA','NOFORM','NOTEL','SLOW')]: continue
    out.append({'host':h,'dir':d,'run':c.get('_run') or f.split('/')[1],'name':c.get('name'),'phone':c.get('phone'),'addr':c.get('address'),'reviews':c.get('reviews'),'rating':c.get('rating'),'rank':c.get('firmyRank'),'pm':pm,'pd':pd,'final':m.get('finalUrl'),'flags':fl,'forms':o.get('inquiryForms'),'tel':o.get('telLinks'),'copy':(o.get('copyright') or '')[:60],'maxY':o.get('maxYearInText'),'ares':c.get('ares'),'paid':c.get('paid'),'ads':ads,'icoZdroj':c.get('icoZdroj'),'aresHledani':c.get('aresHledani'),'lcp':m.get('lcp'),'cms':o.get('cms'),'h1':o.get('h1'),'formFields':o.get('formFields'),'text':(o.get('textSample') or '')[:260]})
json.dump(out,open('shortlist.json','w'),ensure_ascii=False,indent=1)
# Nahoře ti, kdo platí za marketing.
out.sort(key=lambda x: not (x['paid'] or x['ads']))
json.dump(out,open('shortlist.json','w'),ensure_ascii=False,indent=1)
for x in out: print(('$ ' if x['paid'] or x['ads'] else '  ')+str(x['flags']),'|',x['run'],'|',x['host'],'|',x['name'],'|',x['phone'],'| Firmy.cz placený:',x['paid'],'| reklama:',','.join(x['ads']) or '-','| PSI',x['pm'],'/',x['pd'],'|',x.get('cms') or '?','| rev',x['reviews'])
print(len(out))
