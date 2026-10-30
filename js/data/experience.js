/* ==========================================================================
   EXPERIENCE — newest first. The timeline renders in the order listed.

   TO ADD A JOB: copy one block below, paste it at the TOP of the list
   (newest first), and edit the fields. Don't forget the comma between blocks.

   Fields
     start / end   dates as text. Use end: 'Present' for a current role
                   (it gets a filled timeline dot automatically).
     location      shown under the dates
     title / org   "Title · Organisation"
     summary       one-line intro under the title
     bullets       list of achievements (add / remove lines freely)
     id            optional; lets other things link to this entry
     link          optional; adds "See the project ↓" and jumps to the project
                   with that id (see js/data/projects.js)
   ========================================================================== */
Portfolio.data.experience = [
  {
    start: '10/2026', end: 'Present',
    location: 'Magdeburg, Germany',
    title: 'Machine Learning Teaching Assistant', org: 'OVGU',
    summary: 'Teaching machine learning to fellow students through weekly tutorials and hands-on Python work.',
    bullets: [
      'Delivered weekly tutorials on regression, decision trees, neural networks, clustering, reinforcement learning and model evaluation, balancing technical rigor with intuitive understanding.',
      'Guided students in implementing ML models in Python and analyzing experimental results.'
    ]
  },
  {
    id: 'research-role',
    start: '10/2026', end: 'Present',
    location: 'Magdeburg, Germany',
    title: 'Research Project', org: 'Autonomous Multisensor System Labs',
    summary: 'Learning Multiple Interacting Motion Models to Predict Maritime Vessel Trajectories.',
    bullets: [
      'Developing a JAX-based maritime vessel tracking system using a six-state motion model and Kalman filtering, with AIS trajectory data to learn vessel-specific motion parameters and improve trajectory prediction.',
      'Exploring Interacting Multiple Model (IMM) filtering.'
    ],
    link: { label: 'See the project', projectId: 'research-project' }
  },
  {
    start: '03/2024', end: '09/2025',
    location: 'Mangaluru, India',
    title: 'Associate QA Engineer', org: 'Sclera',
    summary: 'Quality assurance for web applications and microservices, from regression suites to REST API and Selenium checks.',
    bullets: [
      'Executed functional, regression, smoke and integration testing, identifying defects, validating fixes and supporting reliable feature releases.',
      'Designed and executed REST API tests in a microservices environment, validating inter-service communication and resolving integration defects with developers.',
      'Supported Selenium-based test automation to expand regression coverage across key user journeys and reduce repetitive manual validation.'
    ]
  },
  {
    start: '01/2024', end: '03/2024',
    location: 'Mangaluru, India',
    title: 'QA Intern', org: 'Sclera',
    summary: 'First hands-on QA role, across asset-management workflows.',
    bullets: [
      'UI and API testing, including test-case design, regression testing and defect tracking.',
      'Collaborated with QA and development teams to understand system architecture and microservices-based communication.'
    ]
  }
];
