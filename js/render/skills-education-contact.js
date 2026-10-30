/* ==========================================================================
   RENDER: skills, education, contact, footer
   (data: js/data/skills.js, education.js, profile.js)
   ========================================================================== */
(function (P) {
  var e = P.util.esc;

  P.render.skills = function () {
    document.getElementById('skills').innerHTML =
      P.util.sectionHead(P.data.profile.sections.skills) +
      '<div class="skills">' + P.data.skills.map(function (g) {
        return '<div class="box"><h3>' + e(g.title) + '</h3>' + P.util.tagList(g.tags) + '</div>';
      }).join('') + '</div>';
  };

  function languages(list) {
    return list.map(function (l) {
      return '<div class="lang">' + e(l.name) + ' <span>' + e(l.label) + '</span></div>' +
        '<div class="lv">' + (l.target ? '<i class="t" style="width:' + +l.target + '%"></i>' : '') +
        '<i style="width:' + +l.level + '%"></i></div>';
    }).join('');
  }

  P.render.education = function () {
    var D = P.data.education;
    document.getElementById('education').innerHTML =
      P.util.sectionHead(P.data.profile.sections.education) +
      '<div class="edu">' + D.degrees.map(function (d) {
        return '<div class="ec' + (d.completed ? ' done' : '') + '">' +
          '<div class="d mono"><span>' + e(d.start) + ' – ' + e(d.end) + '</span><b>' + (d.completed ? 'Completed' : 'In progress') + '</b></div>' +
          '<h3>' + e(d.title) + '</h3><p>' + e(d.school) + '</p></div>';
      }).join('') + '</div>' +
      '<h3 class="beyond-h">' + e(D.beyondTitle) + '</h3>' +
      '<div class="beyond">' + D.beyond.map(function (b) {
        return '<div class="bc"><h4>' + e(b.title) + '</h4>' + (b.languages ? languages(b.languages) : '<p>' + e(b.text) + '</p>') + '</div>';
      }).join('') + '</div>';
  };

  P.render.contact = function () {
    var c = P.data.profile.contact;
    document.getElementById('contact').innerHTML =
      P.util.sectionHead({ eyebrow: P.data.profile.sections.contact.eyebrow, title: P.data.profile.sections.contact.title, description: c.text }) +
      '<div class="btns">' + c.links.map(function (l) {
        return '<a class="btn' + (l.primary ? ' p' : '') + '" href="' + e(l.href) + '"' + (l.external ? ' target="_blank" rel="noopener"' : '') + '>' + e(l.label) + '</a>';
      }).join('') + '</div>';
  };

  P.render.footer = function () {
    document.getElementById('footer-text').textContent = P.data.profile.footer;
  };
})(Portfolio);
