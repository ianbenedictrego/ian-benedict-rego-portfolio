/* ==========================================================================
   UI BEHAVIOUR — theme toggle, mobile menu, project filters, modal,
   "jump to" links and back-to-top. Runs after everything is rendered.
   ========================================================================== */
(function (P) {
  var behavior = function () { return P.util.reducedMotion() ? 'auto' : 'smooth'; };

  /* ---------- theme toggle (remembers the choice; follows the OS until you choose) ---------- */
  P.ui.theme = function () {
    var root = document.documentElement;
    var btn = document.getElementById('theme');
    var meta = document.querySelector('meta[name="theme-color"]');
    var timer;

    function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }

    function apply(theme) {
      root.dataset.theme = theme;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
      if (meta) meta.content = theme === 'dark' ? '#060b0e' : '#f4f7f6';
    }

    apply(root.dataset.theme || 'dark');

    btn.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      if (!P.util.reducedMotion()) {            // brief class -> colours cross-fade (tokens.css)
        root.classList.add('theme-anim');
        clearTimeout(timer);
        timer = setTimeout(function () { root.classList.remove('theme-anim'); }, 450);
      }
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });

    // no saved choice -> follow OS changes live
    matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (m) {
      if (!stored()) apply(m.matches ? 'light' : 'dark');
    });
  };

  /* ---------- mobile nav dropdown ---------- */
  P.ui.menu = function () {
    var btn = document.getElementById('menu'), list = document.getElementById('nav-links');
    if (!btn) return;
    function set(open) {
      list.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
      btn.textContent = open ? '✕' : '☰';
    }
    btn.addEventListener('click', function () { set(!list.classList.contains('open')); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    matchMedia('(min-width:861px)').addEventListener('change', function () { set(false); });
  };

  /* ---------- project filter chips ---------- */
  P.ui.filters = function () {
    var chips = document.querySelectorAll('.chip'), cards = document.querySelectorAll('.proj,.feat');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
        var f = c.dataset.f;
        cards.forEach(function (p) { p.hidden = !(f === 'all' || p.dataset.t.split(' ').indexOf(f) > -1); });
      });
    });
  };

  /* ---------- "View more" modal ---------- */
  P.ui.modal = function () {
    var dlg = document.getElementById('dlg');
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.more');
      if (b && P.render.modal(b.dataset.project)) dlg.showModal();
    });
    document.getElementById('xc').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  };

  /* ---------- in-page jump links (e.g. "See the project ↓") + back to top ---------- */
  P.ui.scroll = function () {
    var dlg = document.getElementById('dlg');
    document.addEventListener('click', function (e) {
      var g = e.target.closest('.goto');
      if (!g) return;
      e.preventDefault();
      var t = document.getElementById(g.dataset.go);
      if (dlg.open) dlg.close();
      if (t) t.scrollIntoView({ behavior: behavior(), block: 'center' });
    });
    document.getElementById('totop').addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: behavior() });
    });
  };
})(Portfolio);
