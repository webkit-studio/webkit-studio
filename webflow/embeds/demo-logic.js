/* CODE EMBED: logika hero dema TRIMEX (vanilla JS, sdílený stav desktop+mobil).
   Očekávaná struktura markupu (viz demo markup embed / BUILD_PLAN.md):
   - kořeny dema:            [data-au-demo]  (desktop i mobilní verze, obě v DOM, viditelnost řeší CSS media query)
   - klikací prvky:          [data-fix="h"|"c"|"f"|"p"]  (role="button", tabindex="0")
       - starý stav uvnitř:  .au-old   (obsahuje pulzující badge .au-plus)
       - nový stav uvnitř:   .au-new   (obsahuje výsledkový badge)
   - počítadlo:              [data-au-count]  → textContent = počet opravených (0–4)
   - stará/nová navigace:    [data-au-nav-old] / [data-au-nav-new]  (přepnou se, až je opraveno všech 5... resp. všechny 4)
   - proof lišta = hotspot "p": pozadí řeší CSS přes .is-on (#22303e), jinak #fff
   CSS pravidla (v markup embedu):
     [data-fix] .au-new { display: none; }
     [data-fix].is-on .au-old { display: none; }
     [data-fix].is-on .au-new { display: block; }
     [data-au-nav-new] { display: none; }
     [data-au-demo].is-all [data-au-nav-old] { display: none; }
     [data-au-demo].is-all [data-au-nav-new] { display: flex; }
*/
(function () {
  var fx = { h: false, c: false, f: false, p: false };
  var roots = Array.prototype.slice.call(document.querySelectorAll('[data-au-demo]'));
  if (!roots.length || roots[0].__auWired) return;
  roots.forEach(function (r) { r.__auWired = true; });

  function render() {
    var cnt = (fx.h ? 1 : 0) + (fx.c ? 1 : 0) + (fx.f ? 1 : 0) + (fx.p ? 1 : 0);
    var all = cnt === 4;
    roots.forEach(function (root) {
      Object.keys(fx).forEach(function (k) {
        Array.prototype.slice.call(root.querySelectorAll('[data-fix="' + k + '"]')).forEach(function (el) {
          el.classList.toggle('is-on', fx[k]);
          el.setAttribute('aria-pressed', String(fx[k]));
        });
      });
      Array.prototype.slice.call(root.querySelectorAll('[data-au-count]')).forEach(function (c) {
        c.textContent = String(cnt);
      });
      root.classList.toggle('is-all', all);
      fit(root);
    });
  }

  /* Necha obrazovku narust jen kdyz se obsah do pomeru 16/10 nevejde
     (zdrojova ukazka tomu davala prostor zoomem pri scrollu). */
  function fit(root) {
    var scr = root.querySelector('.au-scr');
    if (!scr) return;
    var pg = scr.querySelector('.au-page');
    scr.classList.remove('au-grow');
    var bd = scr.querySelector('.au-bd');
    var over = (pg && pg.scrollHeight > pg.clientHeight + 1);
    if (!over && bd) {
      var tol = Math.max(18, window.innerWidth / 60);
      over = (bd.scrollHeight - bd.clientHeight) > tol;
    }
    if (over) scr.classList.add('au-grow');
    if (scr.scrollTop) scr.scrollTop = 0;
    if (pg && pg.scrollTop) pg.scrollTop = 0;
  }

  function toggle(k) {
    fx[k] = !fx[k];
    render();
  }

  roots.forEach(function (root) {
    root.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-fix]') : null;
      if (!t || !root.contains(t)) return;
      toggle(t.getAttribute('data-fix'));
    });
    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var t = e.target && e.target.closest ? e.target.closest('[data-fix]') : null;
      if (!t || !root.contains(t)) return;
      e.preventDefault();
      toggle(t.getAttribute('data-fix'));
    });
  });

  render();
  window.addEventListener('resize', function () { roots.forEach(fit); });
})();
