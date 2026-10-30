/* ==========================================================================
   COVER: agentic-router  — query -> router -> LLM 1 / LLM 2 -> judge
   CSS: css/animations/covers-base.css + cover-agentic-router.css
   Timeline (6s): 0s query leaves | 0.5s router flashes | 0.9s LLM 1 |
                  2.2s judge + score "0.92" | 3.9s LLM 2 (second route)
   `delay` values below are the animation-delay of each flash highlight.
   ========================================================================== */
(function (P) {
  var dot = P.svg.dot, T = P.svg.text;

  // connectors (shared by the line layer and the particles)
  var P_IN   = 'M90 110 H128';
  var P_TO1  = 'M170 100 C200 100 205 64 230 64';
  var P_TO2  = 'M170 120 C200 120 205 156 230 156';
  var P_OUT1 = 'M310 64 C326 64 336 84 338 100';
  var P_OUT2 = 'M310 156 C326 156 336 136 338 120';

  function svg() {
    var s = '<svg viewBox="0 0 400 220">';

    // lines
    [P_IN, P_TO1, P_TO2, P_OUT1, P_OUT2].forEach(function (d) { s += '<path class="c-l" d="' + d + '"/>'; });

    // QUERY box
    s += '<rect class="c-b" x="20" y="88" width="70" height="44" rx="8"/>' + T(55, 113.5, 'QUERY', 'fill:var(--acc)');

    // ROUTER node
    s += '<circle class="c-n" cx="150" cy="110" r="22"/>' +
         '<circle class="c-f" cx="150" cy="110" r="22" style="--c:var(--acc);animation-delay:0.5s"/>' +
         '<g class="c-i" transform="translate(150 110)"><path d="M-8 0h8l8-8M0 0l8 8M-8 0"/></g>' + T(150, 146, 'ROUTER');

    // LLM 1 (sky) and LLM 2 (violet)
    s += '<rect class="c-b" x="230" y="44" width="80" height="40" rx="8"/>' +
         '<rect class="c-f" x="230" y="44" width="80" height="40" rx="8" style="--c:var(--sky);animation-delay:0.9s"/>' + T(270, 67.5, 'LLM 1', 'fill:var(--sky)');
    s += '<rect class="c-b" x="230" y="136" width="80" height="40" rx="8"/>' +
         '<rect class="c-f" x="230" y="136" width="80" height="40" rx="8" style="--c:var(--violet);animation-delay:3.9s"/>' + T(270, 159.5, 'LLM 2', 'fill:var(--violet)');

    // JUDGE node + score
    s += '<circle class="c-n" cx="358" cy="110" r="20"/>' +
         '<circle class="c-f" cx="358" cy="110" r="20" style="--c:var(--acc);animation-delay:2.2s"/>' +
         '<g class="c-i" transform="translate(358 110)"><path d="M-9 0l6 6 12-12"/></g>' + T(358, 150, 'JUDGE') +
         T(358, 72, '0.92', 'fill:var(--acc)', 'c-t c-sc');

    // particles: first route (0s-1.5s), second route (3s-4.5s)
    s += dot({ path: P_IN,   begin: 0,   travel: 0.6 });
    s += dot({ path: P_TO1,  begin: 0.6, travel: 0.7 });
    s += dot({ path: P_OUT1, begin: 1.5, travel: 0.6 });
    s += dot({ path: P_IN,   begin: 3,   travel: 0.6 });
    s += dot({ path: P_TO2,  begin: 3.6, travel: 0.7 });
    s += dot({ path: P_OUT2, begin: 4.5, travel: 0.6 });

    return s + '</svg>';
  }

  P.registerCover('agentic-router', {
    label: 'Animated diagram of a query routed to one of two LLMs and scored by a judge',
    svg: svg
  });
})(Portfolio);
