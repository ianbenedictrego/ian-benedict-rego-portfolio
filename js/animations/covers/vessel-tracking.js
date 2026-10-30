/* ==========================================================================
   COVER: vessel-tracking — AIS points -> Kalman track -> prediction,
   with IMM mode probabilities on the right.
   CSS: covers-base.css + cover-vessel-tracking.css (read its timeline)
   ========================================================================== */
(function (P) {
  var T = P.svg.text;

  // noisy AIS measurements [x, y]; appear one by one every STEP seconds
  var MEASUREMENTS = [[33, 166], [51, 171], [84, 164], [95, 136], [122, 114], [137, 112], [167, 99], [181, 95], [208, 88]];
  var STEP = 0.42;

  // the Kalman-filtered track and the predicted continuation
  var TRACK = 'M30 170 C80 165 105 112 150 106 S185 96 205 84';
  var PREDICTION = 'M205 84 C225 72 240 62 258 44';

  // IMM motion-mode bars: [label, labelY, barY, keyframes name]
  var MODES = [
    ['STRAIGHT', 68,  76,  'c-mode-straight'],
    ['TURN',     108, 116, 'c-mode-turn'],
    ['SPEED UP', 148, 156, 'c-mode-speed']
  ];

  function svg() {
    var s = '<svg viewBox="0 0 400 220">';
    var grid = 'style="stroke-width:1;opacity:.5"';

    // map panel + modes panel
    s += '<rect class="c-b" x="16" y="24" width="250" height="172" rx="8"/><rect class="c-b" x="286" y="24" width="98" height="172" rx="8"/>';

    // faint grid
    [56, 96, 136, 176, 216, 256].forEach(function (x) { s += '<path class="c-l" ' + grid + ' d="M' + x + ' 24V196"/>'; });
    [64, 104, 144, 184].forEach(function (y) { s += '<path class="c-l" ' + grid + ' d="M16 ' + y + 'H266"/>'; });

    // measurements
    MEASUREMENTS.forEach(function (m, i) {
      s += '<circle class="c-m" cx="' + m[0] + '" cy="' + m[1] + '" r="2.4" style="animation-delay:' + (i * STEP).toFixed(2) + 's"/>';
    });

    // prediction + track
    s += '<path class="c-pred" d="' + PREDICTION + '"/>';
    s += '<path class="c-trk" pathLength="100" d="' + TRACK + '"/>';

    // vessel arrow following the track (fades out at 65% of the loop)
    s += '<g class="c-d" opacity="0"><polygon points="-7,-5 7,0 -7,5" fill="var(--acc)"/>' +
         '<animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="' + TRACK + '" keyPoints="0;1;1" keyTimes="0;.65;1" calcMode="linear"/>' +
         '<animate attributeName="opacity" dur="6s" repeatCount="indefinite" values="1;1;0;0" keyTimes="0;.65;.66;1"/></g>';

    s += T(26, 40, 'AIS + KALMAN', 'text-anchor:start') + T(335, 40, 'IMM MODES');

    MODES.forEach(function (m) {
      s += T(298, m[1], m[0], 'text-anchor:start') +
           '<rect class="c-w" x="298" y="' + m[2] + '" width="74" height="5" rx="2.5"/>' +
           '<rect class="c-mode" x="298" y="' + m[2] + '" width="74" height="5" rx="2.5" style="animation-name:' + m[3] + '"/>';
    });

    return s + '</svg>';
  }

  P.registerCover('vessel-tracking', {
    label: 'Animated diagram of a vessel track estimated by a Kalman filter from noisy AIS points, with predicted path and motion-model probabilities',
    svg: svg
  });
})(Portfolio);
