/* ==========================================================================
   CORE — global namespace + small helpers. MUST load first.

   Everything hangs off one global object so the site works by simply
   double-clicking index.html (no build step, no ES-module/CORS issues):

     Portfolio.data      editable content        (js/data/*.js)
     Portfolio.animations  hero animation builder (js/animations/hero-pipeline.js)
     Portfolio.covers    project cover animations (js/animations/covers/*.js)
     Portfolio.svg       SVG helper functions     (js/animations/svg-helpers.js)
     Portfolio.render    HTML renderers           (js/render/*.js)
     Portfolio.ui        behaviour / interaction  (js/ui/*.js)
   ========================================================================== */
(function () {
  var P = (window.Portfolio = window.Portfolio || {});
  P.data = P.data || {};
  P.animations = {};
  P.covers = {};
  P.svg = {};
  P.render = {};
  P.ui = {};

  P.util = {
    /** Escape text for safe insertion into HTML. */
    esc: function (s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    },

    /** True when the visitor asked the OS to reduce motion. */
    reducedMotion: function () {
      return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    /** Standard section heading: eyebrow + h2 (+ optional description). */
    sectionHead: function (h) {
      var e = P.util.esc;
      return '<div class="sh"><p class="eyebrow mono">' + e(h.eyebrow) + '</p><h2>' + e(h.title) + '</h2>' +
        (h.description ? '<p>' + e(h.description) + '</p>' : '') + '</div>';
    },

    /** <span class="mono">tag</span> list used for tech tags. */
    tagList: function (tags) {
      return '<div class="tags">' + (tags || []).map(function (t) {
        return '<span class="mono">' + P.util.esc(t) + '</span>';
      }).join('') + '</div>';
    },

    /** Build the animated cover block for a project (looks up Portfolio.covers[id]). */
    cover: function (id) {
      var c = P.covers[id];
      if (!c) return '';
      return '<div class="cover" role="img" aria-label="' + P.util.esc(c.label) + '">' + c.svg() + '</div>';
    }
  };

  /** Register a project cover animation. See js/animations/covers/. */
  P.registerCover = function (id, def) { P.covers[id] = def; };

  /** GitHub mark used on project buttons. */
  P.GITHUB_ICON = '<svg class="gi" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/></svg>';
})();
