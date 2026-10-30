/* ==========================================================================
   SVG HELPERS — shared by the hero and all cover animations.

   Portfolio.svg.dot({ path, begin, travel, r, cls, cycle })
     A particle that travels along `path`, then disappears until the loop
     restarts. Replaces ~10 lines of repeated <animateMotion> markup.

       path    SVG path string the dot follows
       begin   seconds after load when it first leaves        (e.g. 2.1)
       travel  seconds it takes to move along the path        (e.g. 0.6)
       r       radius                                         (default 3.5)
       cls     CSS class for colour                           (default 'c-d')
       cycle   loop length in seconds                         (default 6)
   ========================================================================== */
(function (P) {
  function n3(x) { return (+x).toFixed(3); }

  P.svg.dot = function (o) {
    var cycle = o.cycle || 6;
    var r = o.r || 3.5;
    var cls = o.cls || 'c-d';
    var f = o.travel / cycle;          // fraction of the loop spent travelling
    var dur = cycle.toFixed(1) + 's';
    var begin = o.begin + 's';
    return '<circle class="' + cls + '" r="' + r + '" opacity="0">' +
      '<animateMotion dur="' + dur + '" begin="' + begin + '" repeatCount="indefinite" path="' + o.path +
        '" keyPoints="0;1;1" keyTimes="0;' + n3(f) + ';1" calcMode="linear"/>' +
      '<animate attributeName="opacity" dur="' + dur + '" begin="' + begin + '" repeatCount="indefinite" ' +
        'values="1;1;0;0" keyTimes="0;' + n3(f) + ';' + n3(f + 0.01) + ';1"/>' +
      '</circle>';
  };

  /** Mono label used inside covers: text(x, y, 'LABEL', 'fill:var(--acc)') */
  P.svg.text = function (x, y, str, style, cls) {
    return '<text class="' + (cls || 'c-t') + '" x="' + x + '" y="' + y + '"' +
      (style ? ' style="' + style + '"' : '') + '>' + str + '</text>';
  };
})(Portfolio);
