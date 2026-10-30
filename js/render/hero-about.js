/* ==========================================================================
   RENDER: nav, hero and about  (data: js/data/profile.js)
   ========================================================================== */
(function (P) {
  var e = P.util.esc;

  // map-pin icon used by the location line
  var PIN_ICON = '<svg class="loc-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.6"/></svg>';

  P.render.nav = function () {
    var p = P.data.profile;
    document.getElementById('logo').textContent = p.initials;
    document.getElementById('nav-links').innerHTML = p.nav.map(function (l) {
      return '<li><a href="' + e(l.href) + '">' + e(l.label) + '</a></li>';
    }).join('');
    if (!p.mobileMenu) document.getElementById('menu').remove();
  };

  P.render.hero = function () {
    var p = P.data.profile;
    var isFile = /\.(pdf|docx?)$/i.test(p.cv.href);
    document.getElementById('hero').innerHTML =
      '<div>' +
        '<span class="pill"><i class="live" aria-hidden="true"></i>' + e(p.availability) + '</span>' +
        '<h1>' + e(p.name) + '</h1>' +
        '<p class="sub">' + e(p.role) + '</p>' +
        '<p>' + e(p.intro) + '</p>' +
        (p.location ? '<div class="loc">' + PIN_ICON + '<span>' + e(p.location) + '</span></div>' : '') +
        '<div class="btns">' +
          '<a class="btn p" href="' + e(p.cv.href) + '"' + (isFile ? ' download' : '') + '>' + e(p.cv.label) + '</a>' +
          '<a class="btn" href="' + e(p.contactCta.href) + '">' + e(p.contactCta.label) + '</a>' +
        '</div>' +
      '</div>' +
      P.animations.heroPipeline();
  };

  P.render.about = function () {
    var p = P.data.profile, a = p.about;
    document.getElementById('about').innerHTML =
      P.util.sectionHead(p.sections.about) +
      '<div class="about"><div class="about-text">' +
        a.paragraphs.map(function (t) { return '<p>' + e(t) + '</p>'; }).join('') +
      '</div><aside class="now"><span class="mono now-label"><i class="live" aria-hidden="true"></i>Currently</span>' +
        a.currently.map(function (c) {
          return '<div class="now-item"><strong>' + e(c.title) + '</strong><small>' + e(c.detail) + '</small></div>';
        }).join('') +
      '</aside></div>';
  };
})(Portfolio);
