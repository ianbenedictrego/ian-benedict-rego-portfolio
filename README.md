# Ian Benedict Rego – Portfolio

Static site, no build step, no dependencies. **Double-click `index.html`** to preview, or upload the whole folder to any static host (GitHub Pages, Netlify, Vercel, your own server).

## Folder map

```
index.html                  page shell + ordered list of CSS / JS files
assets/                     (create it) put cv.pdf, images here

js/
  data/                     <-- EDIT YOUR CONTENT HERE
    profile.js              name, hero text, nav, about, contact, footer, section titles
    experience.js           jobs / research roles
    projects.js             project cards + filter categories
    skills.js               skill groups
    education.js            degrees, "beyond the degree", languages
  animations/               <-- ALL ANIMATION CODE
    svg-helpers.js          shared helper (travelling dot, label)
    hero-pipeline.js        hero diagram
    covers/                 one file per project cover
  render/                   turns data into HTML (rarely needs edits)
  ui/interactions.js        theme toggle, mobile menu, filters, modal, scrolling
  ui/scrollspy.js           highlights the nav link of the section in view + sliding underline
  core/namespace.js         global `Portfolio` object (loads first)
  main.js                   boots everything (loads last)

css/
  base/                     tokens.css (colours / themes), base.css, background.css (grid + glow)
  components/               nav, buttons, tags, modal, theme-toggle (sun/moon morph)
  sections/                 hero, about, experience, projects, skills, education, footer
  animations/               hero-pipeline.css, covers-base.css, cover-<name>.css
```

## Everyday edits (all in `js/data/`)

**Add a job** – open `experience.js`, copy one `{ ... }` block to the top of the list, change the fields. `end: 'Present'` gives it the filled timeline dot. Add `link: { label, projectId }` to show a "See the project ↓" link.

**Add a skill** – open `skills.js`, add a string to a group's `tags`. **Add a group** by copying a `{ title, tags }` line (an odd last group spans full width automatically).

**Add a project** – open `projects.js`, copy a block in `items`. Set `categories` (filter chips and counts update on their own), `tags`, `github`, `details`, and `cover`. A project with `featured: true` becomes the large card.

**Add a degree / language / activity** – `education.js`.

**Your CV** – put the PDF in `assets/` named `Ian_Benedict_Rego_CV.pdf` (or change `cv.href` in `profile.js`). The hero button downloads it.

**Favicon** – `favicon.svg` (plus `favicon-32.png`, `apple-touch-icon.png`), linked in the `<head>` of `index.html`.

**Colours / themes** – `css/base/tokens.css` (dark values in `:root`, light values in `[data-theme="light"]`). The toggle icon animation is `css/components/theme-toggle.css`.

## Animations – how they are organised

Every animation = one JS file that builds the SVG + one CSS file with its keyframes. Each file starts with a comment describing the **timeline** (what happens at which second). All loops are 6 s so they stay in sync.

| Animation | Markup / timing | Styles |
|---|---|---|
| Hero pipeline | `js/animations/hero-pipeline.js` (config blocks at the top) | `css/animations/hero-pipeline.css` |
| Agentic router | `covers/agentic-router.js` | `covers-base.css` + `cover-agentic-router.css` |
| Hybrid retrieval | `covers/hybrid-retrieval.js` | `covers-base.css` |
| Bias detection | `covers/nlp-bias.js` | `covers-base.css` + `cover-nlp-bias.css` |
| Road hotspots | `covers/road-hotspots.js` | `covers-base.css` + `cover-road-hotspots.css` |
| Vessel tracking | `covers/vessel-tracking.js` | `covers-base.css` + `cover-vessel-tracking.css` |

Naming: `c-*` classes and `c-*` keyframes = covers (shared ones live in `covers-base.css`); `v*` classes and `hero-*` keyframes = hero. Timing of a moving particle = `P.svg.dot({ path, begin, travel })`; timing of a highlight = its inline `animation-delay`.

### Adding a cover animation

1. Copy a file in `js/animations/covers/`, rename it, and call `Portfolio.registerCover('my-id', { label, svg })`.
2. Add `<script src="js/animations/covers/my-id.js"></script>` in `index.html` (with the other covers).
3. Use `cover: 'my-id'` in the project entry. Reuse the shared `c-*` classes, or add `css/animations/cover-my-id.css` and link it.

## Responsive behaviour

| Width | Changes |
|---|---|
| > 860 px | full desktop layout, 2-column project grid |
| ≤ 860 px | hero / about / timeline stack to one column, featured card stacks, nav links become a ☰ dropdown |
| ≤ 600 px | single-column project grid, skills, education |
| ≤ 640 px | project pop-up stacks (animation on top) |

The ☰ dropdown is the only addition to the original design (it had no way to reach sections on phones). To remove it set `mobileMenu: false` in `profile.js`.

Also built in: dark / light theme (follows the OS, remembers the toggle), `prefers-reduced-motion` support, keyboard focus styles.

## Notes

- Content is rendered by JavaScript from `js/data/`. Search engines that run JavaScript (Google) read it fine; the `<title>` and meta description in `index.html` are static.
- Fonts (Inter, JetBrains Mono) load from Google Fonts; the site falls back to system fonts offline.
