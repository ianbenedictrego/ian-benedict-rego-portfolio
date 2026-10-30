/* ==========================================================================
   HERO PIPELINE ANIMATION  — returns the <div class="viz"> markup.
   Styles / keyframes: css/animations/hero-pipeline.css  (read its timeline).

   Layout (viewBox 640 x 360):

     DOCUMENTS (x 112-268)        TOOLS (x 352-488)
        [doc][doc][doc]             [globe][db][code]        <- top row,    y = 44
            \  |  /                    \  |  /
   [QUERY] -> RETRIEVAL -> RANKING ->  AI AGENT  -> [RESPONSE]   <- spine, y = 176
            /  |  \                    /  |  \
        [doc][doc][doc]             [globe][doc][db]         <- bottom row, y = 264
     KNOWLEDGE BASE               EXTERNAL SOURCES

   To change the animation edit ONLY the config blocks below.
   ========================================================================== */
(function (P) {
  var dot = P.svg.dot;

  /* ------------------------------ ICONS ----------------------------- */
  var ICONS = {
    doc:   '<path d="M9 15h18M9 23h18M9 31h11" stroke="var(--mute)" stroke-width="2" stroke-linecap="round"/>',
    globe: '<g fill="none" stroke="var(--mute)" stroke-width="1.8"><circle cx="18" cy="22" r="9"/><ellipse cx="18" cy="22" rx="4" ry="9"/><path d="M9 22h18"/></g>',
    db:    '<g fill="none" stroke="var(--mute)" stroke-width="1.8"><ellipse cx="18" cy="14" rx="9" ry="3.5"/><path d="M9 14v16c0 2 4 3.5 9 3.5s9-1.5 9-3.5V14M9 22c0 2 4 3.5 9 3.5s9-1.5 9-3.5"/></g>',
    code:  '<path d="M13 16l-6 6 6 6M23 16l6 6-6 6M20 14l-4 16" fill="none" stroke="var(--mute)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  var ICON_W = 36, ICON_H = 44, TOP_Y = 44, BOTTOM_Y = 264;

  /* ------------------------ INPUT / TOOL ICONS ---------------------- */
  // `hl` = highlight class that decides WHEN the icons light up (see CSS timeline)
  var INPUT_ICONS = {
    hl: 'hl-docs',
    top:    [{ x: 112, i: 'doc' }, { x: 172, i: 'doc' }, { x: 232, i: 'doc' }],
    bottom: [{ x: 112, i: 'doc' }, { x: 172, i: 'doc' }, { x: 232, i: 'doc' }]
  };
  var TOOL_ICONS = {
    hl: 'hl-tools',
    top:    [{ x: 352, i: 'globe' }, { x: 402, i: 'db' },  { x: 452, i: 'code' }],
    bottom: [{ x: 352, i: 'globe' }, { x: 402, i: 'doc' }, { x: 452, i: 'db' }]
  };

  /* ------------------------------ PATHS ----------------------------- */
  // icons -> RETRIEVAL node (x 190) and icons -> AI AGENT node (x 420)
  var INPUT_BRANCHES = {
    top:    ['M130 88 C130 124 190 118 190 150', 'M190 88 V152', 'M250 88 C250 124 190 118 190 150'],
    bottom: ['M130 264 C130 228 190 234 190 202', 'M190 264 V200', 'M250 264 C250 228 190 234 190 202']
  };
  var TOOL_BRANCHES = {
    top:    ['M370 88 C370 124 420 118 420 146', 'M420 88 V146', 'M470 88 C470 124 420 118 420 146'],
    bottom: ['M370 264 C370 228 420 234 420 206', 'M420 264 V206', 'M470 264 C470 228 420 234 420 206']
  };
  // The horizontal spine. flowDelay staggers the dashed "marching ants".
  // dot: when (begin) and how long (travel) the particle takes on this segment.
  var SPINE = [
    { path: 'M110 176 H166', flowDelay: 0,    dot: { begin: 0.1, travel: 0.8, r: 4 } }, // query -> retrieval
    { path: 'M214 176 H280', flowDelay: 0.25, dot: { begin: 2.1, travel: 0.6, r: 4 } }, // retrieval -> ranking
    { path: 'M320 176 H390', flowDelay: 0.5,  dot: { begin: 2.6, travel: 0.7, r: 4 } }, // ranking -> agent
    { path: 'M450 176 H516', flowDelay: 0.75, dot: { begin: 4.5, travel: 0.8, r: 4 } }  // agent -> response
  ];
  // Particle timing for the branches (top row leaves first, bottom row 0.1s later)
  var INPUT_DOTS = { top: 1.0, bottom: 1.1, travel: 0.8, r: 3 };
  var TOOL_DOTS  = { top: 3.4, bottom: 3.5, travel: 0.8, r: 3 };

  /* ----------------------------- TEXT ------------------------------- */
  var TEXT = {
    ariaLabel: 'Animated diagram: a query flows through retrieval and ranking into an AI agent, which uses tools and external sources to produce a response',
    queryLines: ['How does RAG', 'work?']
  };

  /* =========================== BUILDERS ============================== */
  function symbols() {
    return '<defs>' + Object.keys(ICONS).map(function (k) {
      return '<symbol id="hero-icon-' + k + '" viewBox="0 0 36 44"><rect class="vc" x=".5" y=".5" width="35" height="43" rx="7"/>' + ICONS[k] + '</symbol>';
    }).join('') + '</defs>';
  }

  function iconRow(group, y) {
    return group[y === TOP_Y ? 'top' : 'bottom'].map(function (ic) {
      return '<use href="#hero-icon-' + ic.i + '" x="' + ic.x + '" y="' + y + '" width="' + ICON_W + '" height="' + ICON_H + '"/>' +
             '<rect class="vhl ' + group.hl + '" x="' + ic.x + '" y="' + y + '" width="' + ICON_W + '" height="' + ICON_H + '" rx="7"/>';
    }).join('');
  }

  function branchPaths(b) {
    return b.top.concat(b.bottom).map(function (d) { return '<path class="vl" d="' + d + '"/>'; }).join('');
  }

  function branchDots(b, t) {
    return b.top.map(function (d) { return dot({ path: d, begin: t.top, travel: t.travel, r: t.r, cls: 'vdot' }); }).join('') +
           b.bottom.map(function (d) { return dot({ path: d, begin: t.bottom, travel: t.travel, r: t.r, cls: 'vdot' }); }).join('');
  }

  function build() {
    var s = '<svg viewBox="0 0 640 360">';
    s += symbols();

    // 1) static connector lines
    s += branchPaths(INPUT_BRANCHES) + branchPaths(TOOL_BRANCHES);
    s += SPINE.map(function (p) { return '<path class="vl" d="' + p.path + '"/>'; }).join('');
    // 2) animated dashed flow on the spine
    s += SPINE.map(function (p) { return '<path class="vf" d="' + p.path + '" style="animation-delay:' + p.flowDelay + 's"/>'; }).join('');

    // 3) icon cards (+ their highlight overlays)
    s += iconRow(INPUT_ICONS, TOP_Y) + iconRow(INPUT_ICONS, BOTTOM_Y);
    s += iconRow(TOOL_ICONS, TOP_Y) + iconRow(TOOL_ICONS, BOTTOM_Y);

    // 4) QUERY box
    s += '<rect class="vb" x="14" y="140" width="96" height="72" rx="10"/>' +
         '<text class="vt a" x="24" y="162">&gt; QUERY</text>' +
         '<text class="vt s" x="24" y="180" style="fill:var(--text)">' + TEXT.queryLines[0] + '</text>' +
         '<text class="vt s" x="24" y="194" style="fill:var(--text)">' + TEXT.queryLines[1] + '</text>' +
         '<rect class="vcur" x="56" y="186" width="5" height="10"/>';

    // 5) RETRIEVAL node (magnifier)
    s += '<circle class="vn" cx="190" cy="176" r="24"/>' +
         '<g transform="translate(190 176)"><circle class="vi" cx="-2" cy="-2" r="8"/><path class="vi" d="M4 4l7 7"/></g>' +
         '<text class="vt" x="190" y="224">RETRIEVAL</text>';

    // 6) RANKING node
    s += '<circle class="vn" cx="300" cy="176" r="20"/><path class="vi" d="M290 169h20M293 176h14M297 183h6"/>' +
         '<text class="vt" x="300" y="214">RANKING</text>';

    // 7) AI AGENT node (two pulsing rings + network icon)
    s += '<circle class="vr" cx="420" cy="176" r="32"/><circle class="vr b" cx="420" cy="176" r="32"/>' +
         '<circle class="vn" cx="420" cy="176" r="30" style="stroke-width:2"/>' +
         '<g class="vi" transform="translate(420 176)"><circle r="4" fill="var(--acc)" stroke="none"/><circle cx="-12" cy="-8" r="2.5"/><circle cx="12" cy="-8" r="2.5"/><circle cx="0" cy="13" r="2.5"/><path d="M-4 -2l-6 -4M4 -2l6 -4M0 4v7"/></g>' +
         '<text class="vt" x="420" y="232">AI AGENT</text>';

    // 8) group captions
    s += '<text class="vt" x="190" y="30">DOCUMENTS</text><text class="vt" x="420" y="30">TOOLS</text>' +
         '<text class="vt" x="190" y="338">KNOWLEDGE BASE</text><text class="vt" x="420" y="338">EXTERNAL SOURCES</text>';

    // 9) RESPONSE panel (typing lines + context bars)
    s += '<rect class="vb" x="516" y="116" width="112" height="120" rx="10"/>' +
         '<text class="vt a" x="528" y="138">RESPONSE</text>' +
         '<rect class="vw" x="528" y="152" width="88" height="3" rx="1.5"/>' +
         '<rect class="vw" x="528" y="164" width="88" height="3" rx="1.5" style="animation-delay:.2s"/>' +
         '<rect class="vw" x="528" y="176" width="56" height="3" rx="1.5" style="animation-delay:.4s"/>' +
         '<text class="vt s" x="528" y="226">CONTEXT</text>' +
         '<rect class="vbar" x="584" y="212" width="6" height="14" rx="1.5"/>' +
         '<rect class="vbar" x="594" y="204" width="6" height="22" rx="1.5" style="animation-delay:.1s"/>' +
         '<rect class="vbar" x="604" y="196" width="6" height="30" rx="1.5" style="animation-delay:.2s"/>';

    // 10) travelling particles (drawn last so they sit on top)
    s += branchDots(INPUT_BRANCHES, INPUT_DOTS);
    s += SPINE.map(function (p) { return dot({ path: p.path, begin: p.dot.begin, travel: p.dot.travel, r: p.dot.r, cls: 'vdot' }); }).join('');
    s += branchDots(TOOL_BRANCHES, TOOL_DOTS);

    return s + '</svg>';
  }

  /** Public: returns the full hero visual markup. */
  P.animations.heroPipeline = function () {
    return '<div class="viz" role="img" aria-label="' + P.util.esc(TEXT.ariaLabel) + '">' + build() + '</div>';
  };
})(Portfolio);
