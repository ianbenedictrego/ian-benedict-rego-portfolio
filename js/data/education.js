/* ==========================================================================
   EDUCATION — degrees, extra activities, languages.
   ========================================================================== */
Portfolio.data.education = {

  // Degrees (newest first). completed:true -> grey accent + "Completed" badge.
  degrees: [
    { start: '10/2025', end: 'Present', completed: false,
      title: 'M.Sc. Digital Engineering (Data Science)', school: 'Otto von Guericke Universität, Magdeburg' },
    { start: '12/2020', end: '05/2024', completed: true,
      title: 'B.Eng. Electrical & Electronics', school: 'N.M.A.M. Institute of Technology, Karkala' }
  ],

  // "Beyond the degree" cards
  beyondTitle: 'Beyond the degree',
  beyond: [
    { title: 'Sakura Science Exchange',
      text: 'Represented my college at Ritsumeikan University, Japan, through the JST programme.' },
    { title: 'Communities',
      text: 'Member of the Google Developer Student Club and the SI@FIN Academic Club.' },

    // A card with `languages` shows level bars instead of text.
    //   level     bar length in % (current level)
    //   target    optional faded bar in % (the level you are working toward)
    { title: 'Languages',
      languages: [
        { name: 'English', label: 'C1',                     level: 83 },
        { name: 'German',  label: 'A2, working toward B1',  level: 33, target: 50 }
      ] }
  ]
};
