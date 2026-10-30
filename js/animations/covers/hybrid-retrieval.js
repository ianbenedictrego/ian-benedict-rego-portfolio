/* ==========================================================================
   COVER: hybrid-retrieval — query -> dense + BM25 -> RRF -> rerank -> top-k
   CSS: css/animations/covers-base.css only (no special classes)
   Timeline (6s): 0s query splits | 0.9s dense | 1.0s BM25 | 2.3s RRF fuses |
                  3.3s rerank | 4.4s best result (top-k #1) highlights
   ========================================================================== */
(function (P) {
  var dot = P.svg.dot, T = P.svg.text;

  var P_Q_DENSE = 'M70 110 C86 110 84 51 100 51';
  var P_Q_BM25  = 'M70 110 C86 110 84 169 100 169';
  var P_DENSE   = 'M176 51 C200 51 208 84 214 97';
  var P_BM25    = 'M176 169 C200 169 208 136 214 123';
  var P_RRF     = 'M244 110 H262';
  var P_RERANK  = 'M318 110 H338';

  function svg() {
    var s = '<svg viewBox="0 0 400 220">';

    [P_Q_DENSE, P_Q_BM25, P_DENSE, P_BM25, P_RRF, P_RERANK].forEach(function (d) { s += '<path class="c-l" d="' + d + '"/>'; });

    // QUERY
    s += '<rect class="c-b" x="14" y="90" width="56" height="40" rx="8"/>' + T(42, 113.5, 'QUERY', 'fill:var(--acc)');

    // DENSE (sky) / BM25 (violet)
    s += '<rect class="c-b" x="100" y="36" width="76" height="30" rx="8"/>' +
         '<rect class="c-f" x="100" y="36" width="76" height="30" rx="8" style="--c:var(--sky);animation-delay:0.9s"/>' + T(138, 54.5, 'DENSE', 'fill:var(--sky)');
    s += '<rect class="c-b" x="100" y="154" width="76" height="30" rx="8"/>' +
         '<rect class="c-f" x="100" y="154" width="76" height="30" rx="8" style="--c:var(--violet);animation-delay:1s"/>' + T(138, 172.5, 'BM25', 'fill:var(--violet)');

    // RRF fusion node
    s += '<circle class="c-n" cx="226" cy="110" r="18"/>' +
         '<circle class="c-f" cx="226" cy="110" r="18" style="--c:var(--acc);animation-delay:2.3s"/>' +
         '<g class="c-i" transform="translate(226 110)"><path d="M-8 -7C-2 -7 -2 0 4 0M-8 7C-2 7 -2 0 4 0M4 0h5"/></g>' + T(226, 146, 'RRF');

    // RERANK
    s += '<rect class="c-b" x="262" y="92" width="56" height="36" rx="8"/>' +
         '<rect class="c-f" x="262" y="92" width="56" height="36" rx="8" style="--c:var(--acc);animation-delay:3.3s"/>' + T(290, 113.5, 'RERANK', 'fill:var(--acc)');

    // TOP-K results: three rows with bars of decreasing width
    [[70, 80, 32], [98, 108, 24], [126, 136, 16]].forEach(function (r) {
      s += '<rect class="c-b" x="338" y="' + r[0] + '" width="48" height="24" rx="6"/>' +
           '<rect class="c-bar" x="346" y="' + r[1] + '" width="' + r[2] + '" height="5" rx="2.5"/>';
    });
    s += '<rect class="c-f" x="338" y="70" width="48" height="24" rx="6" style="--c:var(--acc);animation-delay:4.4s"/>';

    s += T(200, 22, 'HYBRID RETRIEVAL') + T(362, 60, 'TOP-K');

    // particles
    s += dot({ path: P_Q_DENSE, begin: 0,   travel: 0.8 });
    s += dot({ path: P_Q_BM25,  begin: 0.1, travel: 0.8 });
    s += dot({ path: P_DENSE,   begin: 1.8, travel: 0.6 });
    s += dot({ path: P_BM25,    begin: 1.9, travel: 0.6 });
    s += dot({ path: P_RRF,     begin: 2.9, travel: 0.4 });
    s += dot({ path: P_RERANK,  begin: 3.9, travel: 0.4 });

    return s + '</svg>';
  }

  P.registerCover('hybrid-retrieval', {
    label: 'Animated diagram of dense and BM25 retrieval merged by rank fusion, reranked into top results',
    svg: svg
  });
})(Portfolio);
