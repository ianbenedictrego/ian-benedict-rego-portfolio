/* ==========================================================================
   PROFILE — name, hero text, navigation, about, contact, footer.
   Edit the text between the quotes. Section headings for the other
   sections (experience, projects, ...) are in `sections` at the bottom.
   ========================================================================== */
Portfolio.data.profile = {
  name: "Ian Benedict Rego",
  initials: "IR", // logo in the nav bar
  role: "AI Engineer",
  availability: "Open to Werkstudent & Internships", // pill above the name
  location: "Magdeburg, Germany", // shown with a pin icon above the hero buttons (leave "" to hide)
  intro:
    "I build LLM systems that are tested, evaluated and production-minded. As an M.Sc. Data Science student at OVGU, " +
    "I work on agentic routing, hybrid retrieval and evaluation, and I bring nearly two years of QA engineering to everything I ship.",

  // Hero button. Put your CV in the /assets folder with EXACTLY this file name
  // (or change the name here). A .pdf/.doc/.docx link downloads automatically.
  cv: { label: "Download CV", href: "assets/Ian_Benedict_Rego_CV.pdf" },
  contactCta: { label: "Contact me", href: "#contact" },

  // Navigation links (href must match a section id in index.html)
  nav: [
    { label: "About me", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],

  // ---------------------------------------------------------------- ABOUT
  about: {
    paragraphs: [
      "I’m completing an M.Sc. in Digital Engineering (Data Science) at Otto von Guericke Universität Magdeburg. I build agentic systems, retrieval pipelines and evaluation loops, and I teach machine learning tutorials to fellow students.",
      "Before ML, I spent nearly two years in QA, testing web apps, REST APIs and microservices. That is why I care about fallbacks, measurable quality and software that keeps working after the demo.",
    ],
    // The "Currently" card. Add / remove items freely.
    currently: [
      {
        title: "M.Sc. Digital Engineering",
        detail: "Data Science track, OVGU Magdeburg",
      },
      {
        title: "ML Teaching Assistant",
        detail: "Otto von Guericke Universität (OVGU)",
      },
      {
        title: "Research Project",
        detail:
          "Maritime vessel trajectory prediction, Autonomous Multisensor System Labs",
      },
      {
        title: "Looking for",
        detail: "Werkstudent and Internship roles in AI and ML",
      },
    ],
  },

  // -------------------------------------------------------------- CONTACT
  contact: {
    text:
      "I’m looking for Werkstudent and internship roles in AI and ML in Germany, and I’m eligible for Werkstudent and internship employment. " +
      "If you’re working on LLM systems, retrieval or evaluation, I’d love to hear from you.",
    // First entry with primary:true is drawn as the filled button.
    links: [
      {
        label: "ianbenedictrego@gmail.com",
        href: "mailto:ianbenedictrego@gmail.com",
        primary: true,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ian-benedict-rego",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/ianbenedictrego",
        external: true,
      },
    ],
  },

  footer: "© 2026 Ian Benedict Rego · Magdeburg",

  // Behaviour switches
  mobileMenu: true, // hamburger dropdown for the nav links on screens <= 860px

  // -------------------------------------------------- SECTION HEADINGS
  sections: {
    about: { eyebrow: "About me", title: "Testing mindset, applied to LLMs" },
    experience: { eyebrow: "Experience", title: "Where I’ve worked" },
    projects: {
      eyebrow: "Projects",
      title: "Selected work",
      description: "Choose an area to filter the projects.",
    },
    skills: { eyebrow: "Skills", title: "Toolbox" },
    education: { eyebrow: "Education", title: "Education and more" },
    contact: {
      eyebrow: "Contact",
      title: "Let’s build something that’s tested and ships",
    },
  },
};
