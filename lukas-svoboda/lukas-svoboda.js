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
  Verze:     1.0.1 · 26.11.2026
  Autor:     Webkit.Studio – Lukáš Svoboda · lukas@webkit.studio
  Vlastník:  © 2026 Lukáš Svoboda (Webkit.Studio). Interní projekt.
*/

/* Chování stránky /lukas-svoboda a /en/lukas-svoboda. Bez závislostí, jedna IIFE, načítat s defer.
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
      frame: 'snímek', copied: 'Zkopírováno.', selected: 'Text je označený, zkopírujte ho.'
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
      frame: 'frame', copied: 'Copied.', selected: 'Text selected, copy it.'
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
  const shows = $$('.ls-projects_panel'), FRAMES = 6;
  const showTimers = shows.map(() => null);
  shows.forEach(sh => {
    const fw = $('.ls-projects_frames', sh);
    if (!fw) return;
    for (let f = 0; f < FRAMES; f++) {
      const fr = el('div', 'ls-projects_frame' + (f ? '' : ' is-on'));
      fr.appendChild(el('span', 'ls-projects_frame-label', T.frame + ' ' + (f + 1) + ' / ' + FRAMES));
      fr.style.setProperty('--frbg', 'var(--fr-' + (1 + f % 3) + ')');
      fw.appendChild(fr);
    }
  });
  if (!reduce && shows.length && 'IntersectionObserver' in window) {
    const sio = new IntersectionObserver(es => es.forEach(e => {
      const k = shows.indexOf(e.target); clearInterval(showTimers[k]); showTimers[k] = null;
      if (!e.isIntersecting) return;
      const frs = $$('.ls-projects_frame', e.target); if (!frs.length) return;
      let f = frs.findIndex(x => x.classList.contains('is-on')); if (f < 0) f = 0;
      showTimers[k] = setInterval(() => { frs[f].classList.remove('is-on'); f = (f + 1) % frs.length; frs[f].classList.add('is-on'); }, 340);
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

  /* ---------- scroll ---------- */
  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight;
    navUpdate();
    if (!reduce && hero && heroCell) {
      const r = hero.getBoundingClientRect();
      if (r.bottom > -vh) {
        const p = clamp(-r.top / Math.max(1, r.height - vh)), a = clamp(p / .6), b = clamp((p - .6) / .4);
        const s0 = (.92 * heroCell.offsetWidth) / (1.7 * Math.max(innerWidth, vh));
        hero.style.setProperty('--a', a.toFixed(4));
        hero.style.setProperty('--ov', b > 0 ? (s0 + (1 - s0) * b).toFixed(4) : '0');
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
  addEventListener('resize', req);
  addEventListener('load', req);

  bindMode();
})();
