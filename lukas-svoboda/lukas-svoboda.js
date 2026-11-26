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
  Verze:     1.2.0 · 26.11.2026
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
      frame: 'snímek', tempoCalm: 'Zklidnit střídání snímků', tempoFast: 'Zrychlit střídání snímků', copied: 'Zkopírováno.', selected: 'Text je označený, zkopírujte ho.'
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
      frame: 'frame', tempoCalm: 'Slow the images down', tempoFast: 'Speed the images up', copied: 'Copied.', selected: 'Text selected, copy it.'
    }
  };
  const T = TEXT[LANG];

  /* ---------- plynulý posun ---------- */
  let tweenId = 0, tweening = false;
  function scrollToY(y, dur) {
    const s = scrollY, d = y - s, id = ++tweenId;
    if (reduce || Math.abs(d) < 2) { scrollTo(0, y); return; }
    dur = dur || clamp(Math.abs(d) * 0.5, 500, 1300);
    const t0 = performance.now(); tweening = true;
    (function f(t) {
      if (id !== tweenId) return;
      const k = clamp((t - t0) / dur), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
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

  // desktop: jedno scrollnutí = další krok
  const hijack = () => !!proc && mqDesk.matches && mqFine.matches && !reduce;
  let lockUntil = 0, lastT = 0, lastAbs = 0, inGesture = false;
  function stepTarget(dir) {
    const top = docTop(proc), vh = innerHeight, end = top + 3 * vh, y = scrollY, m = vh * .35;
    if (y < top - m || y > end + m) return null;
    let t;
    if (y < top - 1) { if (dir < 0) return null; t = 0; }
    else if (y > end + 1) { if (dir > 0) return null; t = 3; }
    else { const p = (y - top) / vh; t = dir > 0 ? Math.floor(p + .02) + 1 : Math.ceil(p - .02) - 1; if (t < 0 || t > 3) return null; }
    return top + t * vh;
  }
  addEventListener('wheel', e => {
    if (!hijack() || e.ctrlKey) { if (tweening) cancelTween(); return; }
    const dir = Math.sign(e.deltaY); if (!dir) return;
    const now = performance.now(), abs = Math.abs(e.deltaY);
    const fresh = now - lastT > 140 || abs > lastAbs + 8;
    lastT = now; lastAbs = abs;
    const y = stepTarget(dir);
    if (y == null) { if (tweening) cancelTween(); return; }
    e.preventDefault();
    if (now < lockUntil) return;
    if (inGesture && !fresh) return;
    if (abs < 3) return;
    inGesture = true; lockUntil = now + 780; scrollToY(y, 620);
  }, { passive: false });
  addEventListener('keydown', e => {
    if (!hijack() || e.altKey || e.ctrlKey || e.metaKey) return;
    const tag = document.activeElement && document.activeElement.tagName;
    const dir = ['ArrowDown', 'PageDown'].includes(e.key) ? 1 : ['ArrowUp', 'PageUp'].includes(e.key) ? -1 : (e.key === ' ' && !/^(BUTTON|A|INPUT)$/.test(tag || '')) ? (e.shiftKey ? -1 : 1) : 0;
    if (!dir) return;
    const y = stepTarget(dir); if (y == null) return;
    e.preventDefault(); if (!tweening) scrollToY(y, 620);
  });
  addEventListener('touchstart', cancelTween, { passive: true });

  /* ---------- 07 projekty: střídané snímky ---------- */
  /* Panel s atributem data-frames="adresa1 adresa2 …" střídá skutečné obrázky, panel bez něj zástupné plochy.
     Tlačítko vpravo nahoře přepíná tempo pro všechny panely: rychlý střih, nebo klidné prolínání. Volba se pamatuje. */
  const shows = $$('.ls-projects_panel'), FRAMES = 6, TEMPO_KEY = 'ls-tempo';
  const showTimers = shows.map(() => null);
  let calm = false;
  try { calm = localStorage.getItem(TEMPO_KEY) === 'calm'; } catch (err) { calm = false; }
  const tempoBtns = [];
  shows.forEach(sh => {
    const fw = $('.ls-projects_frames', sh);
    if (!fw) return;
    const urls = (sh.dataset.frames || '').split(/\s+/).filter(Boolean);
    if (urls.length) {
      urls.forEach((u, f) => {
        const fr = el('div', 'ls-projects_frame is-image' + (f ? '' : ' is-on')), im = new Image();
        im.className = 'ls-projects_frame-img'; im.alt = ''; im.decoding = 'async'; im.dataset.src = u;
        if (!f) { im.src = u; }
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
    if (!reduce) {
      const btn = el('button', 'ls-projects_tempo'); btn.type = 'button';
      sh.appendChild(btn); tempoBtns.push(btn);
    }
  });
  const showRun = k => {
    clearInterval(showTimers[k]); showTimers[k] = null;
    const frs = $$('.ls-projects_frame', shows[k]); if (frs.length < 2) return;
    frs.forEach(fr => { const im = fr.firstElementChild; if (im && im.dataset && im.dataset.src && !im.src) im.src = im.dataset.src; });
    let f = frs.findIndex(x => x.classList.contains('is-on')); if (f < 0) f = 0;
    showTimers[k] = setInterval(() => { frs[f].classList.remove('is-on'); f = (f + 1) % frs.length; frs[f].classList.add('is-on'); }, calm ? 2600 : 340);
  };
  const showSeen = shows.map(() => false);
  function setTempo(on) {
    calm = on;
    $$('.ls-projects_frames').forEach(fw => fw.classList.toggle('is-calm', calm));
    tempoBtns.forEach(b => { b.classList.toggle('is-calm', calm); b.setAttribute('aria-label', calm ? T.tempoFast : T.tempoCalm); b.title = calm ? T.tempoFast : T.tempoCalm; b.setAttribute('aria-pressed', String(calm)); });
    shows.forEach((sh, k) => { if (showSeen[k]) showRun(k); });
  }
  tempoBtns.forEach(b => b.addEventListener('click', () => {
    setTempo(!calm);
    try { localStorage.setItem(TEMPO_KEY, calm ? 'calm' : 'fast'); } catch (err) { /* bez úložiště platí jen do načtení */ }
  }));
  setTempo(calm);
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
    text.split(/[ \n\t]+/).forEach((w, i) => {
      if (i) reveal.appendChild(document.createTextNode(' '));
      words.push(add(reveal, 'span', 'ls-contact_word', w));
    });
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
  const nav = $('.ls-nav'), hero = $('.section_ls-hero'), heroCell = $('.ls-hero_cell');
  let navY = scrollY, wasPast = false, entryTimer = null;
  const showNav = on => { if (nav) nav.classList.toggle('is-shown', on); };
  function navUpdate() {
    const y = scrollY, past = hero ? hero.getBoundingClientRect().bottom <= 2 : true, dy = y - navY;
    if (!past) { clearTimeout(entryTimer); entryTimer = null; showNav(false); }
    else if (!wasPast) { showNav(true); clearTimeout(entryTimer); entryTimer = setTimeout(() => { entryTimer = null; showNav(false); }, 1800); }
    else if (dy < -4) { clearTimeout(entryTimer); entryTimer = null; showNav(true); }
    else if (dy > 4 && !entryTimer) showNav(false);
    wasPast = past;
    if (Math.abs(dy) > 4) navY = y;
  }


  /* ---------- 01 hero: role pod pozdravem a ikony na černé ---------- */
  /* Ikony: Oreo Doodle Icons, (c) 2026 Nicole Tang, licence MIT (github.com/oreo-design/doodle-icons).
     Kafe, golf a židle jsou dokreslené ve stejném stylu. Každá ikona = cesty oddělené znakem |. */
  const ICONS = {
    'sticky-note': 'M 10.5 10.5 C 19.5 9.8, 28.6 9.8, 37.6 10.5 C 38.2 16.5, 38.3 22.5, 37.9 28.4 C 34.6 31.8, 31.2 35.1, 27.6 38.2 C 21.9 38.6, 16.2 38.5, 10.6 38 C 9.9 28.8, 9.9 19.6, 10.5 10.5 Z|M 37.7 28.6 C 34.3 28.4, 31 28.5, 27.8 28.9 C 27.5 32, 27.5 35.1, 27.7 38.1',
    'laptop': 'M 15.5 15 C 21.8 14.4, 28.2 14.5, 34.2 15 C 34.9 19.4, 35.4 23.7, 35.8 28 C 28.8 28.6, 21.6 28.6, 14.8 28.1 C 14.9 23.7, 15.1 19.3, 15.5 15 Z|M 12.9 28 C 11.5 29.7, 10.2 31.4, 9 33.2 C 19.3 34.2, 29.8 34.2, 39.9 33.2 C 38.7 31.4, 37.4 29.7, 36 28.1|M 22.5 31 C 24 31.15, 25.6 31.15, 27 31',
    'notebook': 'M 14 9.5 C 20.6 9, 27.4 9, 33.9 9.6 C 34.5 19.3, 34.5 29, 34 38.7 C 27.5 39.3, 21 39.3, 14.5 38.8 C 13.9 29, 13.9 19.3, 14 9.5 Z|M 10.5 14.5 C 12 14.4, 13.4 14.4, 14.8 14.5|M 10.5 24 C 12 23.9, 13.4 23.9, 14.8 24|M 10.5 33.5 C 12 33.4, 13.4 33.4, 14.8 33.5|M 20 18 C 23 17.8, 26 17.8, 29 18|M 20 24 C 23 23.8, 26 23.8, 29 24',
    'calendar': 'M 9.5 14 C 19.2 13.2, 28.9 13.3, 38.5 14 C 39.3 20.9, 39.2 28.1, 38.5 34.9 C 28.9 35.8, 19.2 35.7, 9.6 34.9 C 8.9 28, 8.9 20.8, 9.5 14 Z|M 9.8 20.5 C 19.4 21.1, 29 21, 38.2 20.4|M 15.5 10.6 C 15.6 12, 15.6 13.4, 15.5 14.8|M 21.2 10.4 C 21.3 11.8, 21.3 13.2, 21.2 14.6|M 26.8 10.4 C 26.9 11.8, 26.9 13.2, 26.8 14.6|M 32.4 10.6 C 32.5 12, 32.5 13.4, 32.4 14.8|M 15 26 l .01 0|M 21 26.3 l .01 0|M 27 26.2 l .01 0|M 33 26 l .01 0|M 15 30.8 l .01 0|M 21 31 l .01 0|M 27 30.9 l .01 0',
    'pencil': 'M 10.5 37.8 C 11.5 34.6, 12.6 31.7, 14 29 C 20 22, 26.3 15.4, 33 9.4 C 34.8 10.9, 36.6 12.6, 38.2 14.5 C 32.6 21, 26.4 27.4, 19.8 33.6 C 16.8 35.3, 13.7 36.7, 10.5 37.8 Z|M 29.2 13.2 C 31 14.7, 32.7 16.3, 34.3 18.1|M 12.2 34.2 C 12.9 35, 13.6 35.7, 14.4 36.4',
    'bulb': 'M 24 8 C 30.5 8, 35 12.6, 35 18.5 C 35 22.5, 32.7 25.2, 30.5 27.5 C 29.6 28.5, 29 29.8, 28.8 31 C 25.7 31.3, 22.5 31.3, 19.3 31 C 19.1 29.8, 18.5 28.5, 17.6 27.5 C 15.4 25.2, 13 22.5, 13 18.5 C 13 12.6, 17.5 8, 24 8 Z|M 24 13.2 C 26.3 13.3, 27.6 15, 27.2 17.1 C 26.8 19, 25.1 20.1, 23.2 19.6 C 21.4 19.1, 20.5 17.4, 21 15.6 C 21.4 14.1, 22.5 13.2, 24 13.2 Z|M 24 21.8 C 24 24.6, 24 27.5, 24 30.3|M 20 34.4 C 22.6 34.8, 25.4 34.8, 28 34.4|M 21 38.6 C 23 39, 25 39, 27 38.6',
    'chat': 'M 9 12 C 19 10.9, 30 11, 38.5 12 C 39.6 17.5, 39.4 24, 38.6 29 C 31 30, 22.5 29.9, 15.5 29.4 C 13.5 32, 11.5 34.2, 9.2 36.2 C 9.4 33, 9.3 30.7, 9 29 C 8.2 23.5, 8.3 17.2, 9 12 Z|M 16.5 20.5 l .01 0|M 23.6 20.6 l .01 0|M 30.6 20.5 l .01 0',
    'book-open': 'M 24 12.5 C 20.5 10.1, 16.4 9.3, 11.8 9.9 C 11.2 18.2, 11.2 26.5, 11.7 34.8 C 16.2 34.3, 20.3 35.1, 23.9 37.3 C 27.6 35.1, 31.7 34.3, 36.2 34.8 C 36.8 26.5, 36.8 18.2, 36.2 9.9 C 31.6 9.3, 27.5 10.1, 24 12.5 Z|M 24 12.8 C 24.1 20.9, 24.1 29.1, 24 37.1',
    'potted-plant': 'M 26 15 C 26.1 14.2, 26.1 13.4, 26.1 12.6 C 26.3 12.1, 26.4 11.5, 26.4 10.9 C 26.8 10.5, 27.1 10.2, 27.3 9.7 C 27.7 9.5, 28.2 9, 28.5 8.7 C 29 8.8, 29.6 8.7, 30.2 8.6 C 30.7 8.6, 31.1 8.6, 31.6 8.5 C 31.6 8.6, 31.8 8.7, 31.8 8.6 C 31.9 8.8, 31.9 8.8, 32 8.6 C 31.9 8.8, 32 8.9, 32.2 8.9 C 32.2 9, 32.2 9, 32.3 8.9 C 32.1 9.4, 32 9.9, 32 10.5 C 31.8 11, 31.8 11.4, 31.8 12 C 31.5 12.4, 31.2 12.9, 31.1 13.4 C 30.5 13.6, 30 13.9, 29.6 14.4 C 29.1 14.3, 28.6 14.4, 28.2 14.5 C 27.7 14.5, 27.2 14.6, 26.7 14.8 C 26.1 15.1, 25.7 15.4, 25.3 15.9 C 24.9 16.2, 24.5 16.7, 24.4 17.2 C 24.1 17.8, 24 18.3, 24.1 18.8 C 24.1 19.6, 24.1 20.4, 24.4 21.2 C 24.4 22.2, 24.7 23, 25.1 23.8 C 24.8 24.4, 24.6 25, 24.6 25.5 C 24.4 25.9, 24.1 26.3, 24 26.7|M 15.8 14.6 C 16.4 14.5, 17.1 14.2, 17.5 13.8 C 18.2 13.8, 18.8 13.8, 19.5 13.5 C 20.1 13.8, 20.6 14.1, 21.1 14.2 C 21.6 14.6, 22.1 15, 22.7 15.4 C 22.8 15.9, 23.2 16.4, 23.6 16.8 C 23.6 17.4, 23.8 17.9, 24.1 18.5 C 23.4 18.7, 22.8 19.1, 22.2 19.5 C 21.6 19.5, 21.1 19.5, 20.4 19.6 C 19.8 19.4, 19.3 19.2, 18.7 19.2 C 18.2 18.7, 17.7 18.4, 17.1 18.1 C 16.9 17.5, 16.6 17, 16.2 16.6 C 16.2 15.8, 16 15.1, 15.8 14.4|M 14.7 27.9 C 14.6 27.8, 14.6 27.7, 14.8 27.6 C 14.7 27.3, 14.8 27.1, 15 26.9 C 15.2 26.7, 15.3 26.7, 15.5 26.8 C 15.6 26.7, 15.8 26.7, 15.9 26.8 C 21.3 26.3, 26.6 26.2, 32 26.9 C 32.2 26.9, 32.3 26.9, 32.4 26.7 C 32.7 26.6, 32.9 26.7, 33 26.9 C 33.2 27.1, 33.3 27.4, 33.1 27.7 C 33.4 27.8, 33.6 28, 33.6 28.3 C 33.7 28.6, 33.7 28.9, 33.5 29.1 C 33.5 29.5, 33.4 29.9, 33.1 30.2 C 33.2 30.3, 33.3 30.3, 33.1 30.3 C 33 30.6, 32.8 30.7, 32.5 30.7 C 32.4 30.8, 32.3 30.9, 32.1 30.7 C 26.8 31.3, 21.5 31.5, 16.2 30.9 C 15.9 30.9, 15.6 30.8, 15.5 30.5 C 15.3 30.4, 15.2 30.4, 15.1 30.6 C 14.8 30.4, 14.6 30.2, 14.5 29.9 C 14.4 29.6, 14.5 29.4, 14.7 29.1 C 14.6 28.7, 14.6 28.3, 14.7 27.9 Z|M 16.7 30.6 C 16.9 32.9, 17.3 35.2, 17.9 37.5 C 17.8 37.9, 17.9 38.3, 18.1 38.6 C 18.2 38.8, 18.4 38.9, 18.7 38.8 C 18.8 39.2, 19.1 39.3, 19.4 39.4 C 19.7 39.6, 19.9 39.6, 20.2 39.4 C 22.6 39.5, 25.1 39.5, 27.6 39.3 C 27.9 39.5, 28.1 39.5, 28.4 39.4 C 28.8 39.4, 29 39.3, 29.2 39 C 29.5 38.9, 29.8 38.6, 29.9 38.3 C 30.1 38, 30.1 37.7, 29.9 37.4 C 30.6 35.3, 31 33.2, 31.2 30.9',
    'camera': 'M 8.5 18 C 11.2 17.5, 14 17.3, 16.8 17.3 C 17.6 15.9, 18.4 14.6, 19.4 13.4 C 22.4 13.2, 25.4 13.2, 28.4 13.5 C 29.3 14.7, 30.1 15.9, 30.8 17.2 C 33.8 17.2, 36.8 17.5, 39.6 18 C 40.3 24.4, 40.2 30.7, 39.5 36.8 C 29.2 37.9, 18.8 37.9, 8.6 36.8 C 7.9 30.6, 7.8 24.3, 8.5 18 Z|M 28 20.8 C 32 20.7, 34.5 23.2, 34.4 27.1 C 34.3 30.9, 31.7 33.3, 28 33.2 C 24.3 33.1, 21.9 30.7, 21.9 27 C 21.9 23.3, 24.4 20.9, 28 20.8 Z|M 13.8 22.5 l .01 0',
    'send': 'M 39.4 8.6 C 29.4 12.5, 19.6 16.9, 10.1 21.9 C 8.5 22.7, 8.6 24, 10.3 24.6 C 14 26, 17.7 27.2, 21.5 28.3 C 22.8 32, 24.2 35.7, 25.8 39.3 C 26.5 40.9, 27.8 40.9, 28.5 39.3 C 32.6 29.3, 36.3 19.1, 39.4 8.6 Z|M 21.8 28 C 27.6 21.6, 33.4 15.2, 39 8.9',
    'megaphone': 'M 9.5 21 C 15 20, 20.4 18.2, 25.4 15.4 C 28.2 13.9, 30.9 12.2, 33.4 10.3 C 34.9 16.5, 36 22.8, 36.7 29.2 C 33.9 28.1, 31 27.4, 28 27.1 C 22 26.6, 16 26.9, 10.1 27.7 C 9.5 25.5, 9.3 23.2, 9.5 21 Z|M 33.4 10.3 C 36.4 12.6, 37.7 17, 38 21 C 38.2 24, 37.7 27.5, 36.7 29.2|M 15.5 27.6 C 16.2 30.9, 17 34.1, 18 37.2 C 19.8 37.4, 21.6 37.4, 23.4 37.1 C 22.5 33.9, 21.7 30.6, 21 27.2|M 40.6 15.2 C 41.9 14.3, 43.1 13.4, 44.3 12.4|M 41.4 20.8 C 42.8 20.6, 44.2 20.3, 45.5 19.9',
    'mic': 'M 24 7.5 C 27.5 7.5, 29.8 9.9, 29.8 13.5 C 29.9 16.9, 29.9 20.3, 29.8 23.5 C 29.7 27, 27.4 29.3, 24 29.3 C 20.6 29.3, 18.3 27, 18.2 23.5 C 18.1 20.2, 18.1 16.8, 18.2 13.5 C 18.2 9.9, 20.5 7.5, 24 7.5 Z|M 21 13 C 23 12.8, 25 12.8, 27 13|M 21 17.5 C 23 17.3, 25 17.3, 27 17.5|M 13.5 22.5 C 13.7 29, 18 33.4, 24 33.4 C 30 33.4, 34.3 29, 34.5 22.5|M 24 33.8 C 24 35.9, 24 38, 24 40|M 18 40.5 C 22 41, 26 41, 30 40.5',
    'signature': 'M 9 33.5 C 12.8 24.7, 17 16.2, 21.7 8.2 C 22.6 6.7, 23.8 6.9, 24.2 8.6 C 25.8 15.4, 22.9 25.4, 17.8 31.8 C 16.4 33.5, 15.3 33.2, 15.2 31 C 15.2 28.4, 16.4 26.5, 18.8 25.7 C 21.5 24.8, 23.6 26, 25.6 28.9 C 26.7 30.5, 28 30.6, 29.5 29.3|M 32.5 30 C 34.7 29.8, 36.8 29.8, 39 30',
    'puzzle': 'M 11 17 C 14 16.6, 17 16.4, 20 16.4 C 18.9 14, 19.7 11.6, 22 10.7 C 24.4 9.8, 26.8 11, 27.5 13.4 C 27.8 14.5, 27.7 15.5, 27.3 16.5 C 30.2 16.6, 33 16.9, 35.8 17.4 C 36.3 20.1, 36.6 22.8, 36.7 25.6 C 39.1 24.9, 41.3 25.9, 42 28.2 C 42.7 30.6, 41.4 32.9, 39 33.4 C 38.2 33.6, 37.4 33.5, 36.6 33.2 C 36.5 35.7, 36.2 38.1, 35.8 40.5 C 27.6 41.3, 19.3 41.2, 11.2 40.3 C 10.4 32.6, 10.3 24.8, 11 17 Z',
    'list-checks': 'M 10 14.5 C 11.2 15.8, 12.3 17.1, 13.4 18.4 C 15.3 15.6, 17.3 13, 19.4 10.5|M 24 14.5 C 28.7 14.2, 33.4 14.2, 38 14.5|M 10 28.5 C 11.2 29.8, 12.3 31.1, 13.4 32.4 C 15.3 29.6, 17.3 27, 19.4 24.5|M 24 28.5 C 28.7 28.2, 33.4 28.2, 38 28.5',
    'brush': 'M 37.2 9.2 C 38.6 10.5, 39.8 12, 40.8 13.6 C 36.9 18.2, 32.8 22.6, 28.5 26.8 C 26.9 25.2, 25.3 23.6, 23.8 21.9 C 28.1 17.5, 32.6 13.2, 37.2 9.2 Z|M 22.5 23.5 C 24.1 25.1, 25.7 26.7, 27.2 28.4 C 25.4 32.6, 21.9 35.3, 16.8 36.5 C 14 37.2, 11.2 37.4, 8.5 37.2 C 10.5 35.4, 11.9 33.4, 12.7 31 C 14 27.1, 17.4 24.4, 22.5 23.5 Z',
    'ruler': 'M 8.5 31.5 C 15.9 23.7, 23.6 16.2, 31.6 9.1 C 33.4 7.5, 35.2 7.6, 36.9 9.3 C 38.6 11, 38.7 12.8, 37.2 14.6 C 30.1 22.6, 22.6 30.3, 14.8 37.7 C 13 39.4, 11.2 39.3, 9.5 37.6 C 7.9 35.9, 7.6 33.3, 8.5 31.5 Z|M 17 26 C 18 27, 19 28, 20 29|M 22.5 20.5 C 23.5 21.5, 24.5 22.5, 25.5 23.5|M 28 15 C 29 16, 30 17, 31 18',
    'highlighter': 'M 16 26.5 C 21.3 21.1, 26.8 15.9, 32.5 10.9 C 34.8 12.9, 37 15.1, 39 17.4 C 34.1 23.2, 29 28.8, 23.6 34.2|M 16.2 26.7 C 14.3 28.3, 12.9 30.3, 12 32.7 C 14.2 33.9, 16.6 34.6, 19.1 34.7 C 20.7 34.7, 22.2 34.5, 23.6 34.2|M 8.5 39.5 C 15.8 39.9, 23.2 39.9, 30.5 39.5',
    'paperclip': 'M 33.5 13.5 C 33.7 20, 33.7 26.4, 33.4 32.5 C 33.2 36.9, 30.2 39.7, 26 39.6 C 21.8 39.5, 18.9 36.6, 18.8 32.2 C 18.6 25.4, 18.6 18.5, 18.9 12 C 19 8.9, 21.1 7, 24.1 7.1 C 27.1 7.2, 29 9.1, 29.1 12.3 C 29.3 18.2, 29.3 24.2, 29.1 30 C 29 32.2, 27.8 33.5, 25.9 33.4 C 24 33.3, 23 32, 23 29.9 C 22.9 24.6, 23 19.3, 23.2 14.1',
    'mail': 'M 8 14 C 19 12.8, 30 12.9, 40 14 C 41 20.6, 40.9 27.6, 40 33.8 C 29 34.9, 18 34.8, 8.1 33.8 C 7.1 27.5, 7.1 20.4, 8 14 Z|M 9.5 15.5 C 14.3 20.2, 19 24, 24 26.2 C 29 23.8, 33.8 19.9, 38.4 15.4',
    'smile': 'M 24 8.5 C 32.8 8.5, 39.5 15.2, 39.5 24 C 39.5 32.8, 32.8 39.5, 24 39.5 C 15.2 39.5, 8.5 32.8, 8.5 24 C 8.5 15.2, 15.2 8.5, 24 8.5 Z|M 18.5 20 l .01 0|M 29.5 20 l .01 0|M 16.5 27.5 C 19 31, 22 32.6, 24.5 32.5 C 27.5 32.4, 30.2 30.6, 31.8 27.8',
    'star': 'M 24 8.5 C 25.6 12.3, 27.2 16, 28.9 19.7 C 32.9 20.1, 36.9 20.6, 40.8 21.3 C 37.9 24, 34.9 26.6, 31.9 29.1 C 32.8 33.1, 33.6 37, 34.2 41 C 30.8 39, 27.4 36.9, 24 34.8 C 20.6 36.9, 17.2 39, 13.8 41 C 14.4 37, 15.2 33.1, 16.1 29.1 C 13.1 26.6, 10.1 24, 7.2 21.3 C 11.1 20.6, 15.1 20.1, 19.1 19.7 C 20.8 16, 22.4 12.3, 24 8.5 Z',
    'layers': 'M 24 8.5 C 28.9 10.8, 33.7 13.2, 38.4 15.8 C 33.7 18.4, 28.9 20.8, 24 23.1 C 19.1 20.8, 14.3 18.4, 9.6 15.8 C 14.3 13.2, 19.1 10.8, 24 8.5 Z|M 9.8 23.8 C 14.5 26.3, 19.2 28.7, 24 31 C 28.8 28.7, 33.5 26.3, 38.2 23.8|M 9.8 31.6 C 14.5 34.1, 19.2 36.5, 24 38.8 C 28.8 36.5, 33.5 34.1, 38.2 31.6',
    'code': 'M 8.5 11.5 C 18.8 10.7, 29.2 10.8, 39.5 11.5 C 40.2 19.2, 40.1 27.2, 39.4 34.7 C 29.1 35.5, 18.8 35.4, 8.6 34.7 C 7.9 27, 7.9 19.1, 8.5 11.5 Z|M 8.8 19 C 19 19.7, 29.4 19.6, 39.2 19|M 12.5 15 l .01 0|M 17 15.1 l .01 0|M 18.8 23.6 C 17.6 24.7, 16.5 25.8, 15.5 27 C 16.6 28, 17.8 29, 19 29.9|M 29.2 23.6 C 30.4 24.7, 31.5 25.8, 32.5 27 C 31.4 28, 30.2 29, 29 29.9|M 25.2 22.9 C 24.4 25.4, 23.6 27.9, 22.9 30.4',
    'coffee': 'M 11 19 C 18.4 18.3, 25.6 18.4, 33 19.1 C 33.3 25, 32.7 31, 31 36.5 C 30.1 38.6, 28.6 39.5, 26.5 39.7 C 23.5 40, 20.5 39.9, 17.5 39.6 C 15.4 39.4, 13.9 38.5, 13.1 36.5 C 11.3 31, 10.7 25, 11 19 Z|M 33 22.7 C 36.2 21.8, 39.4 23.3, 39.6 26.7 C 39.7 30.1, 36.5 32.2, 32.3 31.8|M 18.1 13.7 C 16.8 12, 19.5 10.7, 18.2 8.4|M 25.3 13.9 C 24 12.2, 26.7 10.9, 25.4 8.6',
    'golf': 'M 20 8.6 C 20.3 18.4, 20.2 28.2, 19.9 37.5|M 20.5 9.4 C 25.4 10.7, 30.2 12.4, 34.8 14.7 C 30.2 16.7, 25.4 18.4, 20.4 19.7|M 9.6 38.3 C 12.7 35.6, 27.3 35.4, 30.9 38 C 28.1 41.1, 12.9 41.4, 9.6 38.3 Z|M 37.4 33.1 C 39.6 33, 41 34.8, 40.8 36.8 C 40.5 38.8, 38.8 40, 36.9 39.7 C 35 39.4, 33.9 37.6, 34.3 35.7 C 34.6 34.2, 35.9 33.2, 37.4 33.1 Z',
    'chair': 'M 16.4 9.6 C 21.4 8.9, 26.6 8.9, 31.6 9.7 C 32.4 14.4, 32.3 19.2, 31.4 24 C 26.4 24.7, 21.6 24.6, 16.6 24 C 15.7 19.2, 15.6 14.4, 16.4 9.6 Z|M 12.4 28 C 20 27.1, 28 27.1, 35.6 28 C 36 29.3, 35.9 30.5, 35.4 31.7 C 27.9 32.4, 20.1 32.4, 12.6 31.7 C 12 30.5, 12 29.3, 12.4 28 Z|M 24 24.5 C 24.1 25.5, 24.1 26.4, 24 27.2|M 24 32.4 C 24.2 34.3, 24.1 36, 24 37.7|M 14.2 40.6 C 17.3 38.7, 20.6 37.9, 24 37.8 C 27.4 37.9, 30.7 38.7, 33.8 40.6',
  };
  const pin = $('.ls-hero_pin'), roleSec = $('.section_ls-role');
  let heroM = 0, heroIcons = [], iconLayer = null, turb = null, iconKey = '', ptrX = -9999, ptrY = -9999, iconRaf = 0, boil = 0, lastBoil = 0;
  const SVGNS = 'http://www.w3.org/2000/svg';

  function buildIcons() {
    const W = pin.clientWidth, H = pin.clientHeight, key = W + 'x' + H;
    if (key === iconKey) return;
    iconKey = key;
    if (!iconLayer) {
      iconLayer = el('div', 'ls-hero_icons'); iconLayer.setAttribute('aria-hidden', 'true');
      const defs = document.createElementNS(SVGNS, 'svg'); defs.setAttribute('class', 'ls-hero_defs'); defs.setAttribute('aria-hidden', 'true');
      defs.innerHTML = '<filter id="ls-liquid" x="-40%" y="-40%" width="180%" height="180%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="1" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter>';
      turb = defs.querySelector('feTurbulence');
      pin.append(iconLayer, defs);
    }
    iconLayer.textContent = '';
    heroIcons = [];
    let s = 23; const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    const names = Object.keys(ICONS);
    for (let i = names.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [names[i], names[j]] = [names[j], names[i]]; }
    const cell = clamp(W * .105, 92, 160), cols = Math.max(3, Math.round(W / cell)), rows = Math.max(4, Math.round(H / cell));
    const cw = W / cols, ch = H / rows, base = clamp(cw * .3, 28, 46);
    /* místa, kam ikona nesmí: pozdrav s fotkou a přepínač jazyka */
    const keep = [heroCell, ...$$('.ls-hero_word', pin), $('.ls-lang.is-hero', pin)].filter(n => n && n.offsetWidth)
      .map(n => ({ l: n.offsetLeft - 28, t: n.offsetTop - 28, r: n.offsetLeft + n.offsetWidth + 28, b: n.offsetTop + n.offsetHeight + 28 }));
    let k = 0;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const cx = (x + .5 + (r() - .5) * .5) * cw, cy = (y + .5 + (r() - .5) * .5) * ch, size = base * (.85 + r() * .3), rot = (r() - .5) * 30, h = size / 2 + 6;
      if (keep.some(b => cx + h > b.l && cx - h < b.r && cy + h > b.t && cy - h < b.b)) continue;
      const node = el('span', 'ls-hero_icon');
      node.style.setProperty('--s', size.toFixed(1) + 'px');
      node.innerHTML = '<svg viewBox="0 0 48 48">' + ICONS[names[k++ % names.length]].split('|').map(d => '<path d="' + d + '"/>').join('') + '</svg>';
      const ic = { el: node, x: cx, y: cy, rot, dx: 0, dy: 0, t: 0, spin: r() < .5 ? -1 : 1 };
      node.style.transform = 'translate(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg)';
      iconLayer.append(node); heroIcons.push(ic);
    }
  }

  /* Kurzor ikony odstrkuje a rozsvěcuje; pohyb dojíždí s odstupem, proto působí tekutě. Čáry ikon u kurzoru se vlní. */
  function iconTick(now) {
    iconRaf = 0;
    let busy = false, wet = false;
    const R = clamp(pin.clientWidth * .17, 150, 260);
    for (const ic of heroIcons) {
      const vx = ic.x - ptrX, vy = ic.y - ptrY, d = Math.hypot(vx, vy) || 1, raw = d < R ? 1 - d / R : 0, goal = raw * raw * (3 - 2 * raw);
      const gx = goal * 26 * vx / d, gy = goal * 26 * vy / d;
      ic.dx += (gx - ic.dx) * .1; ic.dy += (gy - ic.dy) * .1; ic.t += (goal - ic.t) * .1;
      if (Math.abs(gx - ic.dx) + Math.abs(gy - ic.dy) + Math.abs(goal - ic.t) * 30 > .15) busy = true;
      ic.el.style.transform = 'translate(' + (ic.x + ic.dx).toFixed(1) + 'px,' + (ic.y + ic.dy).toFixed(1) + 'px) rotate(' + (ic.rot + ic.t * 14 * ic.spin).toFixed(1) + 'deg) scale(' + (1 + ic.t * .22).toFixed(3) + ')';
      ic.el.style.opacity = (.16 + ic.t * .74).toFixed(3);
      const w = ic.t > .1; if (w) wet = true;
      ic.el.classList.toggle('is-wet', w);
    }
    if (wet && turb && now - lastBoil > 95) { lastBoil = now; turb.setAttribute('seed', String(++boil % 60 + 1)); }
    if (busy || wet) iconRaf = requestAnimationFrame(iconTick);
  }
  const iconKick = () => { if (!iconRaf && heroIcons.length) iconRaf = requestAnimationFrame(iconTick); };

  function measureHero() {
    if (reduce || !hero || !heroCell || !pin || !roleSec) return;
    /* spodní hrana pozdravu: na počítači fotka, na mobilu text pod fotkou */
    const low = Math.max(...[heroCell, ...$$('.ls-hero_word', pin)].filter(n => n.offsetWidth).map(n => n.offsetTop + n.offsetHeight));
    const free = pin.clientHeight - low;
    heroM = Math.max(0, Math.round(free - clamp(innerHeight * .06, 28, 64)));
    page.style.setProperty('--ls-m', heroM + 'px');
    page.classList.add('is-merged');
    hero.style.setProperty('--ls-cx', (heroCell.offsetLeft + heroCell.offsetWidth / 2).toFixed(1) + 'px');
    hero.style.setProperty('--ls-cy', (heroCell.offsetTop + heroCell.offsetHeight / 2).toFixed(1) + 'px');
    buildIcons();
  }
  if (!reduce && pin && mqFine.matches) {
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      const b = pin.getBoundingClientRect();
      if (b.bottom < 0 || b.top > innerHeight) { ptrX = ptrY = -9999; return; }
      ptrX = e.clientX - b.left; ptrY = e.clientY - b.top; iconKick();
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { ptrX = ptrY = -9999; iconKick(); });
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
    navUpdate();
    if (!reduce && hero && heroCell) {
      const r = hero.getBoundingClientRect();
      if (r.bottom > -vh) {
        /* animace končí těsně předtím, než zespodu vjede sekce role (o heroM dřív než konec hero) */
        const p = clamp(-r.top / Math.max(1, (r.height - vh - heroM) * .97)), a = clamp(p / .6), b = clamp((p - .6) / .4);
        const s0 = (.92 * heroCell.offsetWidth) / (1.7 * Math.max(innerWidth, vh));
        hero.style.setProperty('--a', a.toFixed(4));
        const ov = b > 0 ? s0 + (1 - s0) * b : 0;
        hero.style.setProperty('--ov', ov.toFixed(4));
        hero.style.setProperty('--ls-r', (ov * .85 * Math.max(innerWidth, vh)).toFixed(1) + 'px');
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
        const pg = clamp((vh * .85 - rr.top) / (rr.height + vh * .2)) * (words.length + 1);
        words.forEach((w, i) => { w.style.opacity = (.2 + .8 * clamp(pg - i)).toFixed(3); });
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
