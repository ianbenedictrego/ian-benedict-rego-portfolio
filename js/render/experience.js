/* ==========================================================================
   RENDER: experience timeline  (data: js/data/experience.js)
   ========================================================================== */
(function (P) {
  var e = P.util.esc;

  function job(j) {
    var ongoing = /^present$/i.test(j.end);
    return '<div class="job' + (ongoing ? ' ongoing' : '') + '"' + (j.id ? ' id="' + e(j.id) + '"' : '') + '>' +
      '<div class="d mono">' + e(j.start) + ' – ' + e(j.end) + '<span>' + e(j.location) + '</span></div>' +
      '<div>' +
        '<h3>' + e(j.title) + ' <span>· ' + e(j.org) + '</span></h3>' +
        '<p class="job-sum">' + e(j.summary) + '</p>' +
        '<ul>' + (j.bullets || []).map(function (b) { return '<li>' + e(b) + '</li>'; }).join('') + '</ul>' +
        (j.link ? '<a class="goto" href="#' + e(j.link.projectId) + '" data-go="' + e(j.link.projectId) + '">' + e(j.link.label) + ' <span aria-hidden="true">↓</span></a>' : '') +
      '</div></div>';
  }

  P.render.experience = function () {
    document.getElementById('experience').innerHTML =
      P.util.sectionHead(P.data.profile.sections.experience) +
      '<div class="tl">' + P.data.experience.map(job).join('') + '</div>';
  };
})(Portfolio);
