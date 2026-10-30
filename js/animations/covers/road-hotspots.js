/* ==========================================================================
   COVER: road-hotspots — UK collision map with hotspots building over time.
   CSS: covers-base.css + cover-road-hotspots.css
   Timeline (6s): three hotspots appear at 0s / 1.2s / 2.4s (see HOTSPOTS);
                  each shows 5 collision points then a swelling heat blob.
                  A dot travels along the bottom timeline for the full loop.
   ========================================================================== */
(function (P) {
  var dot = P.svg.dot, T = P.svg.text;

  // roads drawn on the map panel
  var ROADS = [
    'M16 120 C80 100 140 150 266 90',
    'M70 24 C90 80 120 130 110 196',
    'M180 24 L200 196',
    'M16 70 H266',
    'M16 165 C100 150 190 175 266 160'
  ];

  // hotspots: centre + start delay. Points are placed around the centre.
  var HOTSPOTS = [
    { cx: 110, cy: 118, delay: 0 },
    { cx: 200, cy: 96,  delay: 1.2 },
    { cx: 150, cy: 160, delay: 2.4 }
  ];
  // offsets of the 5 collision points relative to a hotspot centre
  var POINT_OFFSETS = [[-9, -6], [8, -10], [4, 9], [-4, 12], [12, 4]];

  // severity bars: [label, labelY, barY, filled width, delay]
  var SEVERITY = [
    ['FATAL',   68,  76,  20, 0.0],
    ['SERIOUS', 108, 116, 43, 0.3],
    ['SLIGHT',  148, 156, 72, 0.6]
  ];

  function f2(n) { return (+n).toFixed(2); }

  function svg() {
    var s = '<svg viewBox="0 0 400 220">';

    // map panel + severity panel
    s += '<rect class="c-b" x="16" y="24" width="250" height="172" rx="8"/><rect class="c-b" x="286" y="24" width="98" height="172" rx="8"/>';

    ROADS.forEach(function (d) { s += '<path class="c-l" style="stroke-width:2" d="' + d + '"/>'; });

    // hotspots
    HOTSPOTS.forEach(function (h) {
      s += '<circle class="c-heat" cx="' + h.cx + '" cy="' + h.cy + '" r="28" style="animation-delay:' + h.delay + 's"/>';
      POINT_OFFSETS.forEach(function (o, i) {
        var d = Math.max(0, h.delay - 0.2 + i * 0.25);
        s += '<circle class="c-pt" cx="' + (h.cx + o[0]) + '" cy="' + (h.cy + o[1]) + '" r="2.4" style="animation-delay:' + f2(d) + 's"/>';
      });
    });

    s += T(26, 40, 'UK COLLISIONS', 'text-anchor:start') + T(335, 40, 'SEVERITY');

    SEVERITY.forEach(function (r) {
      s += T(298, r[1], r[0], 'text-anchor:start') +
           '<rect class="c-w" x="298" y="' + r[2] + '" width="74" height="5" rx="2.5"/>' +
           '<rect class="c-par" x="298" y="' + r[2] + '" width="' + r[3] + '" height="5" rx="2.5" style="animation-delay:' + r[4] + 's"/>';
    });

    // timeline track + travelling dot
    s += '<rect class="c-w" x="16" y="209" width="250" height="2" rx="1"/>';
    s += dot({ path: 'M16 210 H266', begin: 0, travel: 5.5 });

    return s + '</svg>';
  }

  P.registerCover('road-hotspots', {
    label: 'Animated map of UK road collisions forming persistent hotspots over time',
    svg: svg
  });
})(Portfolio);
