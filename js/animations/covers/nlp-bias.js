/* ==========================================================================
   COVER: nlp-bias — original text is scanned, biased words flagged, text
   rewritten, parity gap closes.
   CSS: covers-base.css + cover-nlp-bias.css
   Timeline (6s): 0-3s scan line sweeps (.c-scan) | biased words blink amber
                  (.c-flag) | 3.2s rewritten words appear (.c-f.c-fx) |
                  2.6s dot crosses to the right panel | parity bar grows
   ========================================================================== */
(function (P) {
  var dot = P.svg.dot, T = P.svg.text;

  // grey placeholder "text lines": [y, width]  (same on both panels)
  var LINES = [[56, 120], [74, 96], [92, 130], [110, 84], [128, 108]];

  // words that get flagged on the left and replaced on the right:
  //   [y, leftX, rightX, width, flagDelay]
  var FLAGS = [
    [74, 78, 278, 38, 0.0],
    [110, 88, 288, 30, 0.3]
  ];

  var P_CROSS = 'M184 90 H216';

  function svg() {
    var s = '<svg viewBox="0 0 400 220">';

    // two panels + titles
    s += '<rect class="c-b" x="16" y="26" width="168" height="124" rx="8"/><rect class="c-b" x="216" y="26" width="168" height="124" rx="8"/>';
    s += T(26, 43, 'ORIGINAL', 'text-anchor:start') + T(226, 43, 'REWRITTEN', 'text-anchor:start;fill:var(--acc)');

    // text lines
    LINES.forEach(function (l) {
      s += '<rect class="c-w" x="26" y="' + l[0] + '" width="' + l[1] + '" height="6" rx="3"/>' +
           '<rect class="c-w" x="226" y="' + l[0] + '" width="' + l[1] + '" height="6" rx="3"/>';
    });

    // flagged words (left) and their rewrites (right)
    FLAGS.forEach(function (f) {
      s += '<rect class="c-flag" x="' + f[1] + '" y="' + f[0] + '" width="' + f[3] + '" height="6" rx="3" style="animation-delay:' + f[4] + 's"/>' +
           '<rect class="c-f c-fx" x="' + f[2] + '" y="' + f[0] + '" width="' + f[3] + '" height="6" rx="3" style="--c:var(--acc);animation-delay:3.2s"/>';
    });

    // scan line + connector + particle
    s += '<rect class="c-scan" x="26" y="50" width="2" height="88" rx="1"/>';
    s += '<path class="c-l" d="' + P_CROSS + '"/>' + dot({ path: P_CROSS, begin: 2.6, travel: 0.5 });

    // parity gap: grey track + amber (before) bar, grey track + green (after) bar
    s += T(16, 178, 'PARITY GAP', 'text-anchor:start');
    s += '<rect class="c-w" x="100" y="172" width="284" height="5" rx="2.5"/><rect class="c-w" x="100" y="188" width="284" height="5" rx="2.5"/>';
    s += '<rect class="c-par" x="100" y="172" width="284" height="5" rx="2.5"/><rect class="c-bar" x="100" y="188" width="284" height="5" rx="2.5"/>';

    return s + '</svg>';
  }

  P.registerCover('nlp-bias', {
    label: 'Animated diagram of biased text flagged and rewritten while the parity gap closes',
    svg: svg
  });
})(Portfolio);
