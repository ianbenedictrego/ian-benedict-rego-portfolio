/* ==========================================================================
   RENDER: projects (filter chips, featured card, grid)  (data: js/data/projects.js)
   The "View more" modal markup lives in js/render/modal.js
   ========================================================================== */
(function (P) {
  var e = P.util.esc;

  function chips(D) {
    var h = '<button class="chip" data-f="all" aria-pressed="true">All ' + D.items.length + '</button>';
    D.categories.forEach(function (c) {
      var n = D.items.filter(function (p) { return p.categories.indexOf(c.key) > -1; }).length;
      h += '<button class="chip" data-f="' + e(c.key) + '" aria-pressed="false">' + e(c.label) + ' ' + n + '</button>';
    });
    return '<div class="filters" role="group" aria-label="Filter projects">' + h + '</div>';
  }

  function featured(p) {
    return '<article class="feat" id="' + e(p.id) + '" data-t="' + e(p.categories.join(' ')) + '">' +
      '<div class="fl">' +
        '<div class="fh"><span class="badge">' + e(p.badge || 'Featured') + '</span><span class="fm">' + e(p.meta || '') + '</span></div>' +
        '<h3>' + e(p.title) + '</h3>' +
        '<p>' + e(p.summary) + '</p>' +
        '<ul>' + (p.bullets || []).map(function (b) { return '<li>' + e(b) + '</li>'; }).join('') + '</ul>' +
        P.util.tagList(p.tags) +
      '</div>' +
      '<div class="fr">' + P.util.cover(p.cover) +
        (p.stats || []).map(function (s) { return '<div class="stat"><b>' + e(s.value) + '</b><span>' + e(s.label) + '</span></div>'; }).join('') +
      '</div></article>';
  }

  function card(p) {
    return '<article class="proj" data-t="' + e(p.categories.join(' ')) + '">' +
      P.util.cover(p.cover) +
      '<h3>' + e(p.title) + '</h3>' +
      P.util.tagList(p.tags) +
      '<div class="acts">' +
        (p.github ? '<a class="btn" href="' + e(p.github) + '" target="_blank" rel="noopener">' + P.GITHUB_ICON + 'GitHub</a>' : '') +
        '<button class="btn more" type="button" data-project="' + e(p.id) + '">View more</button>' +
      '</div></article>';
  }

  P.render.projects = function () {
    var D = P.data.projects;
    var feat = D.items.filter(function (p) { return p.featured; });
    var rest = D.items.filter(function (p) { return !p.featured; });
    document.getElementById('projects').innerHTML =
      P.util.sectionHead(P.data.profile.sections.projects) +
      chips(D) +
      feat.map(featured).join('') +
      '<div class="grid">' + rest.map(card).join('') + '</div>';
  };
})(Portfolio);
