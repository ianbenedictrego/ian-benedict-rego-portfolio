/* ==========================================================================
   MAIN — builds the page. Loads LAST.
   1) render every section from the data files
   2) attach interactions
   ========================================================================== */
(function (P) {
  [
    'nav', 'hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact', 'footer'
  ].forEach(function (name) { P.render[name](); });

  ['theme', 'menu', 'filters', 'modal', 'scroll', 'scrollspy'].forEach(function (name) { P.ui[name](); });
})(Portfolio);
