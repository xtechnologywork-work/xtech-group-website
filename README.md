# XTECHNOLOGY GROUP QATAR

> **TECH SOLUTIONS FOR A SMARTER TOMORROW**  
> Sovereign digital architecture, enterprise multi-cloud platforms, and mission-critical AI systems.

---

## ⚡ Overview

Official website for **XTECHNOLOGY GROUP QATAR** — a calm, typography-led single page built with plain HTML, CSS and JavaScript on Vite.

- **Branding**: XTECH X emblem (inline SVG, adapts to the theme) with Electric Blue (`#1182FF`) as the single accent
- **Themes**: Light and dark, designed as equals. Follows the visitor's system setting by default; the nav toggle and the footer switch (System / Light / Dark) save the choice in `localStorage`
- **Languages**: English and Arabic (full right-to-left layout, IBM Plex Sans Arabic). The nav button switches language and the choice is saved; `?lang=ar` / `?lang=en` links open a language directly. Arabic text lives in `i18n.js`, keyed by the English text in `index.html` — when you change English copy, update its Arabic entry too (in dev, the console lists any missing translations)
- **Key Features**:
  - Design tokens in `style.css` (`:root` / `[data-theme="dark"]`)
  - Sticky navigation with scrollspy and a mobile menu
  - Products, Industries, Testimonials and Contact sections
  - Native `<dialog>` inquiry form with inline validation
  - Subtle reveal-on-scroll, disabled for `prefers-reduced-motion`
  - Fully responsive (640 / 768 / 1024 breakpoints)

See `REDESIGN_PLAN.md` for the design rationale.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
```
Generates production-optimized bundle in `dist/`.

---

## 🏛️ Architecture & Tech Stack
- **Build Engine**: [Vite](https://vitejs.dev/)
- **3D WebGL Graphics**: Three.js WebGL Engine
- **Styling**: Vanilla CSS (Zero Bloat, High-Density CSS Custom Properties)
- **Typography**: Space Mono, Inter, Archivo Black

---

## 📄 License
© 2026 XTECHNOLOGY GROUP QATAR. All Rights Reserved.
