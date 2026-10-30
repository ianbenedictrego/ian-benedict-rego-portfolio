/* ==========================================================================
   SCROLL SPY — highlights the nav link of the section you are reading and
   slides the underline (.nav-ind) to it. Styles: css/components/nav.css

   Rules
     - the active section is the last one whose top has passed ~35% of the viewport
     - above the first section (the hero) the first link is active
     - at the very bottom of the page the last link is active
     - sections that have no nav link (e.g. Education) keep the previous link active
   Add a section to the nav (js/data/profile.js -> nav) and it is picked up automatically.
   ========================================================================== */
(function (P) {
  P.ui.scrollspy = function () {
    var list = document.getElementById('nav-links');
    var links = [].slice.call(list.querySelectorAll('a'));
    if (!links.length) return;

    var ind = document.createElement('span');
    ind.className = 'nav-ind';
    ind.setAttribute('aria-hidden', 'true');
    list.appendChild(ind);

    // every <section> on the page, in order; each remembers the nav link that points at it (if any)
    var sections = [].slice.call(document.querySelectorAll('main section')).map(function (s) {
      return { el: s, link: list.querySelector('a[href="#' + s.id + '"]') };
    });

    var current = null, ticking = false;

    function moveIndicator() {
      if (!current) { ind.classList.remove('on'); return; }
      ind.style.width = current.offsetWidth + 'px';
      ind.style.transform = 'translateX(' + current.parentNode.offsetLeft + 'px)';
      ind.classList.add('on');
    }

    function setActive(link) {
      if (link === current) return;
      if (current) current.removeAttribute('aria-current');
      current = link;
      current.setAttribute('aria-current', 'true');
      moveIndicator();
    }

    function update() {
      ticking = false;
      var trigger = window.innerHeight * 0.35;
      var active = links[0];                                   // hero / above first section
      sections.forEach(function (s) {
        if (s.el.getBoundingClientRect().top <= trigger && s.link) active = s.link;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        active = links[links.length - 1];                      // bottom of page
      }
      setActive(active);
    }

    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { moveIndicator(); onScroll(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveIndicator(); });

    // first paint: place the underline without sliding in from the left
    ind.style.transition = 'none';
    update();
    ind.getBoundingClientRect();
    ind.style.transition = '';
  };
})(Portfolio);
