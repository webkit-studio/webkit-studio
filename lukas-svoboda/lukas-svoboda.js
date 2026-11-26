/*!
⠰⣶⣶⣶⣶⣶⣶⣶⣶⣶⡆⠰⣶⣶⣶⣶⣶⣶⣶⣶⣶⡆
⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⡇
⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠻⣿⣿⣿⣿⣿⣿⡇
⠀⠀⠀⠀⠀⠙⠻⢿⣿⣿⡇⠀⠀⠀⠀⠀⠙⠻⢿⣿⣿⡇
⢀⣀⣀⣀⣀⣀⣀⣀⣀⣈⡁⢀⣀⣀⣀⣀⣀⣀⣀⣀⣈⡁
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⡇
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠙⣿⣿⣿⣿⣿⣿⣿⡇
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⡇
⠸⠿⠿⠿⠿⠿⠿⠿⠿⠿⠇⠀⠀⠀⠀⠀⠀⠈⠙⠛⠻⠇

  Webkit.Studio – Osobní stránka Lukáše Svobody · Webkit.Studio (interní)
  lukas-svoboda.js – chování stránky: scroll scény, menu, role, proces, kopírování

  ID:        WKS/lukas-svoboda/lukas-svoboda.js
  Repo:      github.com/webkit-studio/webkit-studio → lukas-svoboda/lukas-svoboda.js
  Verze:     1.9.1 · 26.11.2026
  Autor:     Webkit.Studio – Lukáš Svoboda · lukas@webkit.studio
  Vlastník:  © 2026 Lukáš Svoboda (Webkit.Studio). Interní projekt.
*/

/* Chování stránky /cv-lukas-svoboda a /en/cv-lukas-svoboda. Bez závislostí, jedna IIFE, načítat s defer.
   Struktura a texty jsou ve Webflow. JS jen řídí scroll (hero, menu, proces, projekty, odhalení nadpisu),
   přepíná role a kopíruje kontakty. Dekorativní aria-hidden vnitřky (scény procesu, snímky projektů,
   slova nadpisu) si vytváří sám. Jazyk (cs/en) čte z data-lang na .ls-page. */
(() => {
  'use strict';
  const page = document.querySelector('.ls-page');
  if (!page || page.dataset.lsReady) return;
  page.dataset.lsReady = '1';

  const $ = (s, r = page) => r.querySelector(s);
  const $$ = (s, r = page) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqDesk = matchMedia('(min-width: 62rem)');
  const mqFine = matchMedia('(hover: hover) and (pointer: fine)');
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

  /* ---------- jazyk a texty dekorativních částí ---------- */
  const LANG = page.dataset.lang === 'en' ? 'en' : 'cs';
  const EN = LANG === 'en';
  const NB = ' ';
  const TEXT = {
    cs: {
      bubbles: [['Proč to děláme?', 24, 18], ['Pro koho to je?', 72, 15], ['Co má být jinak?', 79, 42], ['Co už nefunguje?', 21, 45],
        ['Co když nic neuděláme?', 50, 31], ['Jak poznáme úspěch?', 31, 71], ['Kdo rozhoduje?', 73, 70], ['Kolik to stojí dnes?', 52, 88]],
      problem: 'Problém v' + NB + 'jedné větě',
      problemText: 'Web nepřivádí poptávky, protože z' + NB + 'něj není jasné, co firma dělá.',
      layers: [['Cíl', 'Víc poptávek z' + NB + 'webu'], ['Dopad', 'Zákazník hned pochopí, co firma dělá'], ['Výstup', 'Nová úvodní stránka a' + NB + 'texty']],
      cols: ['Obsah', 'Design', 'Funkce', 'Technika', 'Růst'],
      pick: 'Vybraný směr: Funkce',
      kcols: ['Zadáno', 'Rozpracováno', 'Hotovo'],
      kcards: ['Struktura', 'Prototyp', 'Texty', 'Design', 'Stavba', 'Testy'],
      done: 'Hotovo', of: ' z 6 · ', pct: ' %',
      publish: 'Publikovat', live: 'Spuštěno',
      kpis: ['návštěv', 'poptávek', 'konverze'],
      frame: 'snímek', tempoLabel: 'Tempo střídání snímků', tempoNames: ['klidnější', 'rychlé'], talk: 'dáme o tom řeč', copied: 'Zkopírováno.', selected: 'Text je označený, zkopírujte ho.'
    },
    en: {
      bubbles: [['Why are we doing this?', 24, 18], ['Who is it for?', 72, 15], ['What should change?', 79, 42], ['What no longer works?', 21, 45],
        ['What if we do nothing?', 50, 31], ['How will we know it worked?', 31, 71], ['Who decides?', 73, 70], ['What does it cost today?', 52, 88]],
      problem: 'The problem in one sentence',
      problemText: 'The website brings in no enquiries because it doesn’t say clearly what the company does.',
      layers: [['Goal', 'More enquiries from the website'], ['Outcome', 'Visitors see right away what the company does'], ['Output', 'A new homepage and copy']],
      cols: ['Content', 'Design', 'Features', 'Tech', 'Growth'],
      pick: 'Chosen direction: Features',
      kcols: ['To do', 'In progress', 'Done'],
      kcards: ['Structure', 'Prototype', 'Copy', 'Design', 'Build', 'Tests'],
      done: 'Done', of: ' of 6 · ', pct: '%',
      publish: 'Publish', live: 'Live',
      kpis: ['visits', 'enquiries', 'conversion'],
      frame: 'frame', tempoLabel: 'Image tempo', tempoNames: ['calmer', 'fast'], talk: 'let’s talk', copied: 'Copied.', selected: 'Text selected, copy it.'
    }
  };
  const T = TEXT[LANG];

  /* ---------- typografie ---------- */
  /* Webflow při publikaci zahazuje pevné mezery, proto je skript vrací sám, i u textů upravených v Designeru:
     za jednopísmenná slova (a, i, k, o, s, u, v, z; v angličtině a, I), za číslo před dalším slovem nebo číslem
     (5 let, 10 000, 30+ projektů) a před pomlčku. Nic z toho pak nezůstane na konci nebo začátku řádku. */
  {
    const tw = document.createTreeWalker(page, NodeFilter.SHOW_TEXT), nodes = [];
    while (tw.nextNode()) nodes.push(tw.currentNode);
    const one = /(^|[\s(„“"])([AIKOSUVZaikosuvz]) (?=\S)/g;
    nodes.forEach(n => {
      if (/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) return;
      const t = n.nodeValue.replace(one, '$1$2' + NB).replace(one, '$1$2' + NB)
        .replace(/(\d\+?) (?=[\d\p{L}%])/gu, '$1' + NB).replace(/ ([–—])/g, NB + '$1');
      if (t !== n.nodeValue) n.nodeValue = t;
    });
  }

  /* ---------- plynulý posun ---------- */
  let tweenId = 0, tweening = false;
  function scrollToY(y, dur, out) {
    const s = scrollY, d = y - s, id = ++tweenId;
    if (reduce || Math.abs(d) < 2) { scrollTo(0, y); return; }
    dur = dur || clamp(Math.abs(d) * 0.5, 500, 1300);
    const t0 = performance.now(); tweening = true;
    (function f(t) {
      if (id !== tweenId) return;
      const k = clamp((t - t0) / dur), e = out ? 1 - Math.pow(1 - k, 3) : k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      scrollTo(0, s + d * e);
      if (k < 1) requestAnimationFrame(f); else tweening = false;
    })(t0);
  }
  const cancelTween = () => { tweenId++; tweening = false; };
  const docTop = n => n.getBoundingClientRect().top + scrollY;
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const t = id && document.getElementById(id);
    if (!t) return;
    e.preventDefault(); scrollToY(docTop(t));
  }));

  /* ---------- 03 role a silné stránky ---------- */
  const skSec = $('.section_ls-skills'), skGrid = $('.ls-skills_grid');
  const roleBtns = $$('.ls-skills_role'), chips = $$('.ls-skills_chip');
  const roleIds = roleBtns.map(b => b.dataset.role);
  const chipRoles = chips.map(c => (c.dataset.roles || '').split(/\s+/).filter(Boolean));
  let roleIdx = -1, roleTimer = null, rolePause = null, roleSeen = false;
  function setRole(i) {
    roleIdx = i;
    const id = i < 0 ? '' : roleIds[i];
    roleBtns.forEach((b, k) => { b.classList.toggle('is-on', k === i); b.setAttribute('aria-pressed', String(k === i)); });
    if (skGrid) skGrid.classList.toggle('is-filtered', !!id);
    chips.forEach((c, k) => c.classList.toggle('is-on', !!id && chipRoles[k].includes(id)));
  }
  // role se přepínají samy; po kliknutí se na chvíli zastaví a pak pokračují od vybrané role
  function roleAuto() {
    clearInterval(roleTimer); roleTimer = null;
    if (!roleSeen || reduce || !roleBtns.length) return;
    if (roleIdx < 0) setRole(0);
    roleTimer = setInterval(() => setRole((roleIdx + 1) % roleBtns.length), 1800);
  }
  roleBtns.forEach((b, i) => b.addEventListener('click', e => {
    e.preventDefault();
    clearInterval(roleTimer); roleTimer = null; clearTimeout(rolePause);
    setRole(i === roleIdx ? -1 : i);
    rolePause = setTimeout(roleAuto, 6000);
  }));
  setRole(-1);
  if (skSec && 'IntersectionObserver' in window) {
    new IntersectionObserver(es => es.forEach(e => {
      roleSeen = e.isIntersecting;
      clearTimeout(rolePause);
      roleAuto();
    }), { threshold: .15 }).observe(skSec);
  }

  /* ---------- 05 proces: scény ---------- */
  const proc = $('.section_ls-process');
  const stages = $$('.ls-process_stage');
  const scenes = [];
  const phase = (st, p) => () => { st.dataset.phase = p; };
  function loop(steps, total, reset, final) {
    let timers = [], on = false;
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    function cycle() { clear(); steps.forEach(([t, fn]) => timers.push(setTimeout(fn, t))); timers.push(setTimeout(cycle, total)); }
    return {
      start() { if (on) return; on = true; if (reduce) { final(); return; } reset(); cycle(); },
      stop() { if (!on) return; on = false; clear(); if (!reduce) reset(); }
    };
  }
  const add = (parent, tag, cls, text) => parent.appendChild(el(tag, cls, text));

  // scéna 1: otázky → problém → cíl, dopad, výstup
  const s1 = stages[0];
  if (s1) {
    T.bubbles.forEach(([t, x, y], i) => {
      const b = add(s1, 'div', 'ls-scene_pos ls-scene_bubble');
      add(b, 'span', 'ls-scene_bubble-text', t);
      b.style.cssText = `--bx:${x};--by:${y};--d:${i * 55}ms`;
    });
    const res = add(s1, 'div', 'ls-scene_pos ls-scene_result');
    add(res, 'span', 'ls-scene_result-label', T.problem);
    res.appendChild(document.createTextNode(T.problemText));
    const lay = add(s1, 'div', 'ls-scene_layers');
    T.layers.forEach(([k, v]) => { const row = add(lay, 'div', 'ls-scene_layer'); add(row, 'span', 'ls-scene_layer-key', k); add(row, 'span', 'ls-scene_layer-text', v); });
    scenes[0] = loop([[200, phase(s1, 1)], [1900, phase(s1, 2)], [2600, phase(s1, 3)], [5400, phase(s1, 0)]], 5700, phase(s1, 0), phase(s1, 3));
  }

  // scéna 2: papírky → sloupce → výběr
  const s2 = stages[1];
  if (s2) {
    const PICK = 2;
    T.cols.forEach((n, c) => {
      const h = add(s2, 'div', 'ls-scene_pos ls-scene_colhead' + (c === PICK ? ' is-pick' : ''), n);
      h.style.cssText = `--x:${12 + c * 19};--y:13`;
    });
    for (let k = 0; k < 20; k++) {
      const c = k % 5, r = Math.floor(k / 5), cell = (k * 7 + 3) % 20;
      const n = add(s2, 'div', 'ls-scene_pos ls-scene_note' + (c === PICK ? ' is-pick' : ''));
      n.style.cssText = `--sx:${(13 + (cell % 5) * 18.5 + (rnd() * 10 - 5)).toFixed(1)};--sy:${(20 + Math.floor(cell / 5) * 18 + (rnd() * 9 - 4.5)).toFixed(1)};--sr:${(rnd() * 30 - 15).toFixed(1)}deg;--cx:${12 + c * 19};--cy:${28 + r * 14.5};--d:${k * 18}ms;--fd:${(-rnd() * 2.2).toFixed(2)}s`;
    }
    add(s2, 'div', 'ls-scene_caption ls-scene_pickcap', T.pick);
    scenes[1] = loop([[250, phase(s2, 1)], [2100, phase(s2, 2)], [3900, phase(s2, 0)]], 4700, phase(s2, 0), phase(s2, 2));
  }

  // scéna 3: kanban
  const s3 = stages[2];
  if (s3) {
    const KX = [17.75, 50, 82.25];
    T.kcols.forEach((n, c) => { const k = add(s3, 'div', 'ls-scene_kcol', n); k.style.left = (3 + c * 32.25) + 'cqw'; });
    const kCards = T.kcards.map((n, i) => { const d = add(s3, 'div', 'ls-scene_pos ls-scene_kcard', n); d.style.setProperty('--fd', (-i * .33) + 's'); return d; });
    const kBar = add(s3, 'div', 'ls-scene_kbar');
    add(kBar, 'span', null, T.done);
    const kVal = add(kBar, 'span', 'ls-scene_kbar-value');
    let kCols;
    const kLayout = () => {
      kCols.forEach((ids, c) => ids.forEach((id, r) => {
        const d = kCards[id]; d.style.setProperty('--x', KX[c]); d.style.setProperty('--y', 23 + r * 10.2); d.classList.toggle('is-done', c === 2);
      }));
      const done = kCols[2].length;
      kBar.style.setProperty('--p', done / 6);
      kVal.textContent = done + T.of + Math.round(done / 6 * 100) + T.pct;
    };
    const kReset = () => { kCols = [[0, 1, 2, 3, 4, 5], [], []]; kLayout(); };
    const kMove = (id, to) => () => { kCols = kCols.map(c => c.filter(x => x !== id)); kCols[to].push(id); kLayout(); };
    const kSeq = [[0, 1], [1, 1], [0, 2], [2, 1], [1, 2], [3, 1], [2, 2], [4, 1], [3, 2], [5, 1], [4, 2], [5, 2]];
    const kEnd = 250 + kSeq.length * 360;
    scenes[2] = loop(kSeq.map(([id, to], i) => [250 + i * 360, kMove(id, to)]).concat([[kEnd + 900, kReset]]), kEnd + 1250, kReset,
      () => { kCols = [[], [], [0, 1, 2, 3, 4, 5]]; kLayout(); });
    kReset();
  }

  // scéna 4: spuštění a měření
  const s4 = stages[3];
  if (s4) {
    const br = add(s4, 'div', 'ls-scene_browser');
    const bar = add(br, 'div', 'ls-scene_browser-bar');
    add(bar, 'span', 'ls-scene_dot'); add(bar, 'span', 'ls-scene_dot'); add(bar, 'span', 'ls-scene_dot'); add(bar, 'span', 'ls-scene_url');
    const body = add(br, 'div', 'ls-scene_browser-body');
    const pre = add(body, 'div', 'ls-scene_pre');
    add(pre, 'div', 'ls-scene_line'); add(pre, 'div', 'ls-scene_line is-short'); add(pre, 'div', 'ls-scene_pub', T.publish);
    const post = add(body, 'div', 'ls-scene_post');
    add(post, 'div', 'ls-scene_live', T.live);
    const chart = add(post, 'div', 'ls-scene_chart');
    chart.innerHTML = '<svg class="ls-scene_chart-svg" viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 36 L12 33 L24 34 L36 28 L48 26 L60 19 L72 17 L84 9 L100 4" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>';
    const kp = add(post, 'div', 'ls-scene_kpis');
    const kpis = [[1248, 0, ''], [37, 0, ''], [3, 1, '%']].map(([to, dec, suf], i) => {
      const cell = add(kp, 'div'), b = add(cell, 'span', 'ls-scene_kpi-value');
      add(cell, 'span', 'ls-scene_kpi-label', T.kpis[i]);
      return { b, to, dec, suf };
    });
    const fmt = (k, v) => {
      const num = k.dec ? (EN ? v.toFixed(k.dec) : v.toFixed(k.dec).replace('.', ',')) : Math.round(v).toLocaleString(EN ? 'en-GB' : 'cs-CZ');
      k.b.textContent = num + (k.suf ? (EN ? '%' : ' %') : '');
    };
    let cntId = 0;
    const count = k => kpis.forEach(x => fmt(x, x.to * k));
    const countUp = () => {
      const id = ++cntId, t0 = performance.now();
      (function f(t) { if (id !== cntId) return; const k = clamp((t - t0 - 150) / 1100); count(1 - Math.pow(1 - k, 3)); if (k < 1) requestAnimationFrame(f); })(t0);
    };
    const s4Reset = () => { cntId++; s4.dataset.phase = 0; count(0); };
    scenes[3] = loop([[450, phase(s4, 1)], [650, () => { s4.dataset.phase = 2; countUp(); }], [3900, s4Reset]], 4100,
      s4Reset, () => { s4.dataset.phase = 2; count(1); });
    count(0);
  }
  const sceneAt = k => scenes[k] || { start() {}, stop() {} };

  /* ---------- 05 proces: kroky ---------- */
  const steps = $$('.ls-process_step'), rollCol = $('.ls-process_roll-col');
  let stepIdx = -1;
  function setStep(i, live) {
    if (i !== stepIdx) {
      stepIdx = i;
      steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
      if (rollCol) rollCol.style.setProperty('--i', i);
    }
    steps.forEach((s, k) => (live && k === i) ? sceneAt(k).start() : sceneAt(k).stop());
  }

  // mobil: scény běží, když jsou vidět
  let io = null;
  function bindMode() {
    if (io) { io.disconnect(); io = null; }
    steps.forEach((s, k) => sceneAt(k).stop());
    if (!mqDesk.matches && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(es => es.forEach(e => { const s = sceneAt(+e.target.dataset.scene); e.isIntersecting ? s.start() : s.stop(); }), { threshold: .35 });
      stages.forEach(st => io.observe(st));
    } else if (!mqDesk.matches) steps.forEach((s, k) => sceneAt(k).start());
    stepIdx = -1; update();
  }
  mqDesk.addEventListener('change', bindMode);

  // počítač: jedno scrollnutí = další krok postupu nebo další projekt, vždy dojede na pevnou pozici
  const hijack = () => mqDesk.matches && mqFine.matches && !reduce;
  let lockUntil = 0, lastT = 0, lastAbs = 0, tail = false;
  const zones = () => {
    const z = [];
    if (proc) z.push({ top: docTop(proc), size: innerHeight, n: 4 });
    if (shows.length > 1) { const sec = shows[0].parentNode, size = shows[0].offsetHeight; z.push({ top: docTop(sec) + sec.offsetHeight - shows.length * size, size, n: shows.length }); }
    return z;
  };
  /* vrací cílovou pozici a to, jestli do krokované části teprve vjíždíme zvenku */
  function stepTarget(dir) {
    const y = scrollY;
    for (const z of zones()) {
      const end = z.top + (z.n - 1) * z.size, m = z.size * .35;
      if (y < z.top - m || y > end + m) continue;
      let t, entering = false;
      if (y < z.top - 1) { if (dir < 0) return null; t = 0; entering = true; }
      else if (y > end + 1) { if (dir > 0) return null; t = z.n - 1; entering = true; }
      else { const q = (y - z.top) / z.size; t = dir > 0 ? Math.floor(q + .02) + 1 : Math.ceil(q - .02) - 1; if (t < 0 || t > z.n - 1) return null; }
      return { y: z.top + t * z.size, entering };
    }
    return null;
  }
  addEventListener('wheel', e => {
    if (!hijack() || e.ctrlKey) { if (tweening) cancelTween(); return; }
    const dir = Math.sign(e.deltaY); if (!dir) return;
    const now = performance.now(), abs = Math.abs(e.deltaY);
    /* Nový pohyb = pauza, zrychlení, nebo další zub kolečka myši (stejně velké skoky s odstupem; dojezd touchpadu
       chodí hustěji). "tail" = dojezd gesta, které už krok spustilo: ten stránku dál neposouvá, ani za poslední
       snímek ven ze sekce. Nový pohyb dojezd ukončí. */
    /* zub kolečka má stejný nebo větší skok než předchozí; dojezd touchpadu se zmenšuje */
    const notch = e.deltaMode === 1 || (!!e.wheelDeltaY && Math.abs(e.wheelDeltaY) % 120 === 0 && abs >= 50 && now - lastT > 30 && abs >= (now - lastT < 150 ? lastAbs : 0));
    const fresh = notch || now - lastT > 85 || abs > lastAbs + 5;
    lastT = now; lastAbs = abs;
    if (fresh) tail = false;
    const to = stepTarget(dir);
    if (!to) {
      if (tail) { e.preventDefault(); return; }
      if (tweening) cancelTween();
      return;
    }
    e.preventDefault();
    if (now < lockUntil || tail || abs < 2) return;
    tail = true; lockUntil = now + 470;
    /* při vjezdu zvenku přebíráme rozjetý scroll: začít rychle a dobrzdit, délka podle vzdálenosti */
    if (to.entering) scrollToY(to.y, clamp(Math.abs(to.y - scrollY) * 1.3, 320, 560), true); else scrollToY(to.y, 450);
  }, { passive: false });
  /* Když stránka zůstane stát uvnitř krokované části mezi dvěma pozicemi (tažení posuvníku, dojezd), dorovná se na bližší. */
  let settleT = 0;
  addEventListener('scroll', () => {
    clearTimeout(settleT);
    if (!hijack()) return;
    settleT = setTimeout(() => {
      if (tweening) return;
      const y = scrollY;
      for (const z of zones()) {
        const end = z.top + (z.n - 1) * z.size;
        if (y <= z.top + 2 || y >= end - 2) continue;
        const near = z.top + Math.round((y - z.top) / z.size) * z.size, d = Math.abs(near - y);
        if (d > 2) scrollToY(near, clamp(d * 1.2, 260, 520), true);
        return;
      }
    }, 170);
  }, { passive: true });
  addEventListener('keydown', e => {
    if (!hijack() || e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = document.activeElement && document.activeElement.tagName;
    const dir = ['ArrowDown', 'PageDown'].includes(e.key) ? 1 : ['ArrowUp', 'PageUp'].includes(e.key) ? -1 : (e.key === ' ' && !/^(BUTTON|A|INPUT)$/.test(tag || '')) ? (e.shiftKey ? -1 : 1) : 0;
    if (!dir) return;
    const to = stepTarget(dir); if (!to) return;
    e.preventDefault(); if (!tweening) scrollToY(to.y, 450);
  });
  addEventListener('touchstart', cancelTween, { passive: true });

  /* ---------- 07 projekty: střídané snímky ---------- */
  /* Panel s atributem data-frames="adresa1 adresa2 …" střídá skutečné obrázky, panel bez něj zástupné plochy.
     Adresa zakončená #top = screenshot: drží horní hranu pod pruhem. Bez toho je obrázek vystředěný (mockupy).
     Jedno tlačítko vpravo nahoře (drží přes všechny panely) přepíná dvě tempa, vždy ostrým střihem.
     Ikona jsou tři šipky: v klidnějším tempu svítí jedna, v rychlém tři. Začíná se na klidnějším, volba platí pro jednu návštěvu. */
  const shows = $$('.ls-projects_panel'), FRAMES = 6, TEMPO_KEY = 'ls-tempo-4', TEMPO_MS = { 1: 850, 3: 375 };
  const showTimers = shows.map(() => null);
  let tempo = 1, tempoBtn = null;
  try { if (sessionStorage.getItem(TEMPO_KEY) === '3') tempo = 3; } catch (err) { tempo = 1; }
  shows.forEach(sh => {
    const fw = $('.ls-projects_frames', sh);
    if (!fw) return;
    const urls = (sh.dataset.frames || '').split(/\s+/).filter(Boolean);
    if (urls.length) {
      sh.classList.add('has-images');
      urls.forEach((u, f) => {
        const fr = el('div', 'ls-projects_frame is-image' + (f ? '' : ' is-on')), im = new Image();
        const top = /#top$/.test(u), src = u.replace(/#top$/, '');
        im.className = 'ls-projects_frame-img' + (top ? ' is-top' : ''); im.alt = ''; im.decoding = 'async'; im.dataset.src = src;
        if (!f) { im.src = src; }
        fr.appendChild(im); fw.appendChild(fr);
      });
    } else {
      for (let f = 0; f < FRAMES; f++) {
        const fr = el('div', 'ls-projects_frame' + (f ? '' : ' is-on'));
        fr.appendChild(el('span', 'ls-projects_frame-label', T.frame + ' ' + (f + 1) + ' / ' + FRAMES));
        fr.style.setProperty('--frbg', 'var(--fr-' + (1 + f % 3) + ')');
        fw.appendChild(fr);
      }
    }
  });
  const showRun = k => {
    clearInterval(showTimers[k]); showTimers[k] = null;
    const frs = $$('.ls-projects_frame', shows[k]); if (frs.length < 2) return;
    frs.forEach(fr => { const im = fr.firstElementChild; if (im && im.dataset && im.dataset.src && !im.src) im.src = im.dataset.src; });
    let f = frs.findIndex(x => x.classList.contains('is-on')); if (f < 0) f = 0;
    showTimers[k] = setInterval(() => { frs[f].classList.remove('is-on'); f = (f + 1) % frs.length; frs[f].classList.add('is-on'); }, TEMPO_MS[tempo]);
  };
  const showSeen = shows.map(() => false);
  function setTempo(n) {
    tempo = n;
    if (tempoBtn) {
      tempoBtn.className = 'ls-projects_tempo is-' + n;
      const label = T.tempoLabel + ': ' + T.tempoNames[n === 3 ? 1 : 0];
      tempoBtn.setAttribute('aria-label', label); tempoBtn.title = label;
    }
    shows.forEach((sh, k) => { if (showSeen[k]) showRun(k); });
  }
  if (!reduce && shows.length) {
    const bar = el('div', 'ls-projects_tempo-bar');
    tempoBtn = el('button', 'ls-projects_tempo'); tempoBtn.type = 'button';
    tempoBtn.innerHTML = '<svg viewBox="0 0 30 12" aria-hidden="true"><path d="M1 1l7.5 5L1 11z"/><path class="ls-projects_tempo-2" d="M11 1l7.5 5-7.5 5z"/><path class="ls-projects_tempo-3" d="M21 1l7.5 5-7.5 5z"/></svg>';
    bar.appendChild(tempoBtn); shows[0].parentNode.insertBefore(bar, shows[0]);
    tempoBtn.addEventListener('click', () => {
      setTempo(tempo === 1 ? 3 : 1);
      try { sessionStorage.setItem(TEMPO_KEY, String(tempo)); } catch (err) { /* bez úložiště platí jen do načtení */ }
    });
  }
  setTempo(tempo);
  if (!reduce && shows.length && 'IntersectionObserver' in window) {
    const sio = new IntersectionObserver(es => es.forEach(e => {
      const k = shows.indexOf(e.target);
      showSeen[k] = e.isIntersecting;
      if (e.isIntersecting) showRun(k); else { clearInterval(showTimers[k]); showTimers[k] = null; }
    }), { threshold: .2 });
    shows.forEach(sh => sio.observe(sh));
  }

  /* ---------- 08 kontakt ---------- */
  const reveal = $('.ls-contact_heading'), copyMsg = $('.ls-contact_status');
  let words = [];
  if (reveal) {
    const text = reveal.textContent.trim();
    reveal.textContent = '';
    /* každé slovo zvlášť; pevná mezera mezi slovy zůstane pevná */
    text.split(/([ \n\t\u00a0]+)/).forEach(tok => {
      if (!tok) return;
      if (/^[ \n\t\u00a0]+$/.test(tok)) reveal.appendChild(document.createTextNode(tok.includes(NB) ? NB : ' '));
      else words.push(add(reveal, 'span', 'ls-contact_word', tok));
    });
    /* závěrečná výzva (v textech T.talk) zmodrá, až je nadpis celý vybarvený */
    const norm = x => x.replace(/\u00a0/g, ' ').replace(/[.,!?]/g, '').toLowerCase(), want = norm(T.talk).split(' '), toks = [];
    words.forEach((w, i) => norm(w.textContent).split(' ').filter(Boolean).forEach(t => toks.push([t, i])));
    for (let i = 0; i + want.length <= toks.length; i++) {
      if (want.every((t, k) => toks[i + k][0] === t)) { want.forEach((t, k) => words[toks[i + k][1]].classList.add('is-talk')); break; }
    }
    if (reduce) reveal.classList.add('is-done');
  }
  $$('[data-copy]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    const src = $('.ls-contact_row-text', b) || b, txt = src.textContent.trim();
    const done = msg => { b.classList.add('is-ok'); if (copyMsg) copyMsg.textContent = msg; setTimeout(() => { b.classList.remove('is-ok'); if (copyMsg) copyMsg.textContent = ''; }, 1500); };
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(src); const s = getSelection(); s.removeAllRanges(); s.addRange(r); done(T.selected); };
    try { navigator.clipboard.writeText(txt).then(() => done(T.copied), fallback); } catch (err) { fallback(); }
  }));

  /* Webflow tlačítka rolí a kopírování vykreslí jako odkaz s role="button". Mezerník je musí spustit
     vždy, Enter jen když odkaz nemá href (s href ho spustí prohlížeč sám). */
  $$('.ls-page a[role="button"]').forEach(b => b.addEventListener('keydown', e => {
    if (e.key === ' ' || (e.key === 'Enter' && !b.hasAttribute('href'))) { e.preventDefault(); b.click(); }
  }));

  /* ---------- menu ---------- */
  /* Menu je jen nahoře. Přesune se do připnuté části úvodu: drží po dobu jeho animace a odjede s ním. */
  const nav = $('.ls-nav'), hero = $('.section_ls-hero'), heroCell = $('.ls-hero_cell');
  { const hp = $('.ls-hero_pin'); if (nav && hp) hp.appendChild(nav); }

  /* ---------- 01 hero: role pod pozdravem ---------- */
  /* Po odkrytí černé zůstane pozdrav připnutý a sekce role se pod něj nasune, pak odjedou spolu.
     Měří se volné místo pod pozdravem: o tolik je hero delší a o tolik se role nasune (CSS proměnná --ls-m). */
  const pin = $('.ls-hero_pin'), roleSec = $('.section_ls-role');
  let heroM = 0;
  function measureHero() {
    if (reduce || !hero || !heroCell || !pin || !roleSec) return;
    /* spodní hrana pozdravu: na počítači fotka, na mobilu text pod fotkou */
    const low = Math.max(...[heroCell, ...$$('.ls-hero_word', pin)].filter(n => n.offsetWidth).map(n => n.offsetTop + n.offsetHeight));
    heroM = Math.max(0, Math.round(pin.clientHeight - low - clamp(innerHeight * .06, 28, 64)));
    page.style.setProperty('--ls-m', heroM + 'px');
    page.classList.add('is-merged');
  }

  /* ---------- přepínač jazyka drží místo na stránce ---------- */
  /* Před odchodem si uloží sekci a kolik z ní je odscrollováno, druhá jazyková verze na to místo skočí. */
  const POS_KEY = 'ls-pos';
  const secs = () => $$('[id]').filter(n => /(^|\s)section_ls-/.test(n.className));
  $$('.ls-lang_link').forEach(a => a.addEventListener('click', () => {
    if (a.getAttribute('aria-current') === 'page') return;
    const ref = scrollY + innerHeight * .35, list = secs();
    let cur = list[0];
    list.forEach(n => { if (docTop(n) <= ref) cur = n; });
    if (!cur) return;
    try { sessionStorage.setItem(POS_KEY, JSON.stringify({ id: cur.id, f: (scrollY - docTop(cur)) / Math.max(1, cur.offsetHeight), t: Date.now() })); } catch (err) { /* bez úložiště se začne nahoře */ }
  }));
  let posWanted = null;
  try { posWanted = JSON.parse(sessionStorage.getItem(POS_KEY) || 'null'); sessionStorage.removeItem(POS_KEY); } catch (err) { posWanted = null; }
  if (posWanted && !(Date.now() - posWanted.t < 20000)) posWanted = null;
  function restorePos() {
    const n = posWanted && document.getElementById(posWanted.id);
    if (n) scrollTo({ top: Math.max(0, docTop(n) + posWanted.f * n.offsetHeight), behavior: 'instant' });
  }

  /* ---------- scroll ---------- */
  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight;
    if (!reduce && hero && heroCell) {
      const r = hero.getBoundingClientRect();
      if (r.bottom > -vh) {
        /* animace končí těsně předtím, než zespodu vjede sekce role (o heroM dřív než konec hero) */
        const p = clamp(-r.top / Math.max(1, (r.height - vh - heroM) * .97)), a = clamp(p / .6), b = clamp((p - .6) / .4);
        const s0 = (.92 * heroCell.offsetWidth) / (1.7 * Math.max(innerWidth, vh));
        hero.style.setProperty('--a', a.toFixed(4));
        const ov = b > 0 ? s0 + (1 - s0) * b : 0;
        hero.style.setProperty('--ov', ov.toFixed(4));
      }
    }
    if (proc && mqDesk.matches) {
      const pr = proc.getBoundingClientRect();
      const vis = pr.top < vh * .6 && pr.bottom > vh * .4;
      setStep(clamp(Math.round(-pr.top / vh), 0, 3), vis);
    }
    if (!reduce && reveal) {
      const rr = reveal.getBoundingClientRect();
      if (rr.top < vh && rr.bottom > 0) {
        /* začíná, až je nadpis ve dvou třetinách výšky okna, a končí těsně před koncem stránky, aby byl efekt vidět */
        const remain = document.documentElement.scrollHeight - vh - scrollY;
        const end = Math.max(rr.top - remain + vh * .06, vh * .14), start = Math.max(vh * .62, end + vh * .22);
        const pg = clamp((start - rr.top) / (start - end)) * (words.length + 1);
        words.forEach((w, i) => { w.style.opacity = (.2 + .8 * clamp(pg - i)).toFixed(3); });
        reveal.classList.toggle('is-done', pg >= words.length);
      }
    }
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', () => { measureHero(); req(); });
  addEventListener('load', () => { measureHero(); restorePos(); posWanted = null; req(); });
  measureHero();
  restorePos();

  bindMode();
})();
