# Steven Valiant V. — Personal Portfolio

Personal portfolio of **Steven Valiant V.** — Mobile, Full-Stack Web & Game Developer.
Built with **Astro** (static output) and **React Three Fiber** for a semi-3D WebGL hero.

**Live:** [https://steven2331068.github.io/](https://steven2331068.github.io/)

---

## 👨‍💻 About

- **Role:** Mobile, Full-Stack Web & Game Developer
- **Degree:** Information Systems, Universitas Internasional Batam (UIB)
- **Location:** Monde Bay Residences, Batam City
- **Email:** [stevenvianto@gmail.com](mailto:stevenvianto@gmail.com)
- **Phone / WhatsApp:** [+62-811-7004-788](https://wa.me/628117004788)
- **LinkedIn:** [steven-valiant-vianto](https://www.linkedin.com/in/steven-valiant-vianto-551b50288)
- **GitHub:** [@StevenVianto](https://github.com/StevenVianto)

---

## 🏗️ Architecture

```
├── .github/workflows/deploy.yml   # CI → GitHub Pages
├── public/                        # Static passthrough (images, resume PDF)
├── src/
│   ├── data/                      # Typed content layer — single source of truth
│   │   ├── site.ts                #   identity, nav, socials, stats
│   │   ├── projects.ts            #   project cards + filter categories
│   │   ├── experience.ts          #   work timeline
│   │   ├── skills.ts              #   skill groups
│   │   └── credentials.ts         #   certifications & education
│   ├── components/
│   │   ├── Header · Hero · Experience · Projects
│   │   ├── Skills · Credentials · Contact · Footer · Icon
│   │   └── three/                 # WebGL hero island (React)
│   │       ├── HeroScene.tsx      #   R3F particle field
│   │       └── capabilities.ts    #   quality gating + particle budget
│   ├── layouts/Base.astro         # <head>, meta, background stack
│   ├── pages/index.astro          # page composition
│   ├── scripts/motion.ts          # scroll reveal, tilt, parallax, copy-to-clipboard
│   └── styles/global.css          # design tokens + primitives
└── legacy/                        # Archived pre-Astro static site (not published)
```

**Content lives in `src/data/`.** Components only render; edit the data modules to
change copy, projects, or links — never the markup.

### Semi-3D strategy

The 3D is deliberately *decorative and non-blocking*:

- The WebGL hero is a React island hydrated with `client:visible`, so three.js is
  fetched only when it scrolls into view and never delays first paint or the LCP portrait.
- `capabilities.ts` probes WebGL support, core count, device memory, viewport width and
  `prefers-reduced-motion`, then picks an `off` / `low` / `high` tier (0 / 700 / 2400
  particles, DPR capped at 1.9). Weak devices get the CSS-only background instead.
- The rest of the depth (card tilt, cursor specular highlight, parallax) is pure CSS
  driven by custom properties written from a single passive scroll/pointer listener.
- Every transform is disabled under `prefers-reduced-motion`.

---

## 🛠️ Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 7 (static output) |
| 3D | three.js + `@react-three/fiber` (React 19 island) |
| Styling | Hand-written CSS with design tokens — no framework |
| Type-checking | `astro check` (strict TS) |
| Hosting | GitHub Pages via GitHub Actions |

Typography: **Plus Jakarta Sans** (display/body) and **JetBrains Mono** (labels/data), via Google Fonts.

---

## 🚀 Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # type-check .astro + .ts
npm run build    # static output → dist/
npm run preview  # serve dist/ locally
```

## 📦 Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which installs, type-checks,
builds, and publishes `dist/` to GitHub Pages. In the repo settings, set
**Pages → Source** to **GitHub Actions**.

The legacy static site (`index.html`, `assets/`, `Navbar/`) has been archived under
`legacy/` for reference. It is not built or deployed.
