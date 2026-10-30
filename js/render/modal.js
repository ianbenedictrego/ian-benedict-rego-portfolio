/* ==========================================================================
   RENDER: project "View more" modal content  (called by js/ui/modal.js)
   ========================================================================== */
(function (P) {
  var e = P.util.esc;

  /** Fills the <dialog> for the project with this id. */
  P.render.modal = function (id) {
    var p = P.data.projects.items.filter(function (x) { return x.id === id; })[0];
    if (!p) return false;
    document.getElementById('mtx').innerHTML =
      '<h3 id="mt">' + e(p.title) + '</h3>' +
      (p.details || []).map(function (t) { return '<p>' + e(t) + '</p>'; }).join('') +
      P.util.tagList(p.tags) +
      (p.github ? '<a class="btn" href="' + e(p.github) + '" target="_blank" rel="noopener">' + P.GITHUB_ICON + 'GitHub</a>' : '');
    document.getElementById('mcv').innerHTML = P.util.cover(p.cover);
    return true;
  };
})(Portfolio);
