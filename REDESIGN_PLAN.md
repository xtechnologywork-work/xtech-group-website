# XTECHNOLOGY GROUP QATAR — Website Redesign Plan

> Status: **PROPOSAL — awaiting approval.** No site files have been changed.
> Goal: a calm, confident, "$1B company" site. Same content, new UI/UX.
> Reference bar: Linear, Vercel, Stripe, Ramp, Anthropic — restraint over effects.

---

## 1. Design principles

1. **Content is the hero.** Typography, spacing and hierarchy do the work — not glow, lasers or WebGL.
2. **One accent color.** XTECH Electric Blue `#1182FF`, used sparingly (links, primary button, focus, small highlights). Everything else is neutral.
3. **Generous whitespace.** Big section padding (120–160px desktop), max content width 1200px, consistent 8px grid.
4. **Quiet motion.** Only a subtle fade-up when sections enter (≤300ms, once), and soft hover states. Everything respects `prefers-reduced-motion`.
5. **Light and dark are equals.** Both themes are designed, not one inverted from the other.
6. **Fast.** No heavy libraries. Target Lighthouse 95+ on all four scores, LCP < 1.5s.

---

## 2. What gets removed (the "too many effects")

| Current element | Decision |
|---|---|
| WebGL light rays in hero (`light-rays.js`, `ogl` dependency) | Remove |
| Typewriter headline loop | Remove — static headline |
| Two skewed infinite marquees | Remove — replaced by a static capabilities row |
| Web Audio sound system, live clock, FPS counter, terminal logger | Remove |
| Radial "cyber radar" network (glows, photons, sonar rings) | Remove — replaced by a clean grid |
| Auto-scrolling 3-column testimonials | Remove — static grid |
| Glow overlays / ambient auras on product cards | Remove |
| Brutalist / "transmission" styling, ALL-CAPS everywhere | Replaced by sentence-case UI |
| `public/vendor/tubes1.min.js`, Archivo Black font | Remove |

Result: `main.js` goes from ~600 lines to ~120; `style.css` from ~3,300 lines to ~900.

---

## 3. New visual system

### 3.1 Typography
- **Inter** (variable) for everything — headings and body. Tight tracking on headings (−0.02em to −0.04em).
- **JetBrains Mono / Space Mono** only for tiny meta labels (status, section numbers). Optional.
- Scale (desktop → mobile via `clamp()`):
  - Display (hero): 72px → 40px, weight 600
  - H2 (section): 48px → 32px, weight 600
  - H3 (card): 20px, weight 600
  - Body large: 20px / body: 16px / small: 14px / eyebrow: 13px
- Line-height 1.1 for headings, 1.6 for body. Body text max ~65 characters wide.

### 3.2 Color tokens (CSS variables on `:root` / `[data-theme]`)

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FFFFFF` | `#0A0A0A` |
| `--bg-subtle` (alt sections) | `#FAFAFA` | `#111111` |
| `--surface` (cards) | `#FFFFFF` | `#141414` |
| `--border` | `#EAEAEA` | `#232323` |
| `--border-strong` | `#D4D4D4` | `#333333` |
| `--text` | `#0A0A0A` | `#EDEDED` |
| `--text-muted` | `#666666` | `#A1A1A1` |
| `--text-faint` | `#8F8F8F` | `#6E6E6E` |
| `--accent` | `#1182FF` | `#3B95FF` (slightly lifted for contrast) |
| `--accent-soft` | `rgba(17,130,255,.08)` | `rgba(59,149,255,.12)` |
| `--success` (Live) | `#16A34A` | `#22C55E` |
| `--warning` (In development) | `#D97706` | `#F59E0B` |

All text/background pairs checked to WCAG AA (4.5:1).

### 3.3 Components
- **Radius:** 12px cards, 8px inputs, full pill for buttons and badges.
- **Borders over shadows:** 1px `--border`; a single soft shadow only on hover / modal.
- **Buttons:** Primary (solid `--text` bg, inverted text — the Vercel style), Secondary (outline), Link (text + arrow →).
- **Badges:** small pill with a colored dot (Live / In development / Pilot).
- **Icons:** keep the existing line icons (Lucide style, 1.5px stroke), single color.

---

## 4. Light / Dark theme switch

- Toggle button in the nav (sun/moon icon), plus in the mobile menu.
- **Default = visitor's system setting** (`prefers-color-scheme`); their choice is remembered in `localStorage`.
- A tiny inline script in `<head>` sets `data-theme` on `<html>` **before** paint → no white flash on dark mode.
- Smooth 200ms color transition when switching (disabled on first load).
- **Logo handling per theme:**
  - Product logos: `product-*-white.png` in dark, `product-*-orig.png` in light (both already exist).
  - XTECH emblem: chrome/blue PNG works on both; if it looks weak on white, I'll use the SVG lockup (`xtech-horizontal-lockup.svg`) with `currentColor`.

---

## 5. New page structure

Single page, same sections and **same text content**, reordered for a better story:
*who we are → what we built → who we serve → proof → talk to us.*

```
┌ Nav (sticky, 64px) ───────────────────────────────────────────┐
│ [emblem] XTECHNOLOGY GROUP  Products Industries Testimonials   │
│                              Contact     [◐]  [Contact us →]   │
└────────────────────────────────────────────────────────────────┘
 1. Hero
 2. Capabilities row (replaces marquee)
 3. Products
 4. Industries
 5. Testimonials
 6. Contact (CTA)
 7. Footer
 +  Inquiry modal (same form fields)
```

### 5.1 Navigation
- Sticky, transparent at top → solid `--bg` with bottom border + light blur after scrolling.
- Left: emblem + "XTECHNOLOGY GROUP" + small "QATAR" tag.
- Center: Products · Industries · Testimonials · Contact (active section underlined via scrollspy).
- Right: theme toggle + primary button "Contact us" (opens modal).
- Mobile: hamburger → full-screen sheet with links, theme toggle and CTA.

### 5.2 Hero
- Left-aligned (or centered — see decision D3), no background effects; at most a very faint grid / radial gradient in `--bg-subtle`.
- Small eyebrow pill: "Doha, Qatar · Qatar Vision 2030".
- H1: **XTECHNOLOGY GROUP QATAR**
- Subtitle: **Tech solutions for a smarter tomorrow.**
- Capability line: Enterprise Cloud · Intelligent AI · National Expansion
- Two buttons: **Start a project** (primary → modal) · **View products** (secondary → #products).

### 5.3 Capabilities row (replaces the two marquees)
- A quiet bordered strip with the marquee phrases as a static, evenly spaced list:
  Enterprise Cloud · AI Systems · Qatar Vision 2030 · Radical Resilience · Distributed Architecture · Sub-second Latency · Mission Critical · Future Proof
- On mobile: horizontal scroll with snap (no auto-animation).

### 5.4 Products — "Our Products by Xtech"
- Header: eyebrow "Official venture ecosystem", H2, subtitle, and three small stats inline: **1** active in production · **2** in development · Built for Qatar & GCC.
- **Layout:** one large featured card for **ALWALAE** (Live) spanning full width — logo on one side, description + 3 features + "Explore platform →" on the other. Below it, **FlexChange** and **BAQALA** side by side as equal cards.
- Each card: status badge, category tag, name + subname, description, 3 features with check icons, footer pill (Live in Qatar / Active engineering / Pilot in Qatar).
- Hover: border darkens + 2px lift. No glows.

### 5.5 Industries — "Industries We Serve"
- Left: eyebrow "Industry intelligence", H2, subtitle, and the two capability items (Universal Integration, Automated Workflows) as simple check rows.
- Right: **3×2 grid of industry tiles** (Real Estate, Restaurants, Logistics, Retail, Finance, E-Commerce) — icon in a soft square, name below. Clean, scannable, works on mobile (2×3).

### 5.6 Testimonials — "Trusted by teams who ship"
- Static **masonry-style 3-column grid** (2 on tablet, 1 on mobile).
- All 12 testimonials kept. Show 6 by default + "Show all testimonials" button to reveal the rest (keeps the page short).
- Card: quote, then avatar initials circle (neutral, not rainbow), name, role, small tag. Stars removed or made subtle (decision D4).

### 5.7 Contact (CTA)
- Large, calm block on `--bg-subtle` (or inverted: dark block in light mode, light block in dark mode — very "premium").
- Eyebrow: "Ready to scale tomorrow?" · H2: **Let's build** · existing sub-text in sentence case.
- Primary button "Start a project" (opens modal) + email `contact@xtechnology.qa` with a copy-to-clipboard icon and a small "Copied" toast.

### 5.8 Footer
- 4 columns: brand + mission line · Company links · Social links · HQ / compliance info.
- Bottom bar: © 2026 XTECHNOLOGY GROUP QATAR · HQ Doha, Qatar · NCSA compliant · theme toggle repeated.

### 5.9 Inquiry modal
- Same 4 fields (name/entity, email, capability select with the same 5 options, message).
- Clean labels in sentence case, proper focus states, `Esc` to close, focus trap, inline validation, success state with checkmark.

---

## 6. Copy treatment (content stays — only presentation changes)

- **All headings, descriptions, testimonials, product text and form options stay word-for-word.**
- UI micro-labels move from ALL CAPS "terminal" style to sentence case, keeping the meaning. Examples:
  - "TRANSMIT //" → "Contact us"
  - "INITIATE TRANSMISSION" → "Start a project"
  - "CALLSIGN / ENTITY NAME" → "Name or organization"
  - "TRANSMISSION PAYLOAD" → "Project details"
  - "DIRECT UPLINK:" → "Or email us"
  - "// SYSTEM LINKS" → "Company"
- See decision D1 — if you want the original labels kept exactly, I will.

---

## 7. Technical plan

- **Stack stays the same:** Vite + plain HTML/CSS/JS (no framework needed for a one-page site).
- **Files rewritten:** `index.html`, `style.css`, `main.js`.
- **Files removed from use:** `light-rays.js`, `public/vendor/tubes1.min.js`, `ogl` dependency.
- **CSS architecture** (single `style.css`, clearly sectioned): tokens → reset/base → layout utilities → components (button, badge, card, input) → sections → themes → responsive → reduced-motion.
- **main.js modules (~120 lines):** theme toggle, sticky nav + scrollspy, mobile menu, reveal-on-scroll (IntersectionObserver), testimonials "show all", modal (open/close/focus trap/submit), copy email.
- **Responsive breakpoints:** 640 / 768 / 1024 / 1280. Mobile-first.
- **Accessibility:** semantic landmarks, visible focus rings, skip-to-content link, AA contrast in both themes, `aria-expanded` on menu/toggle, reduced-motion support.
- **Performance:** preload Inter, `font-display: swap`, lazy-load images, WebP for product logos, no layout shift.
- **SEO:** keep title/description, add Open Graph + Twitter card tags and `theme-color` for both themes.

---

## 8. Execution phases (after your OK)

| Phase | Work | Commit |
|---|---|---|
| 1 | Design tokens, typography, light/dark theme + toggle, base components | `feat: new design system with light and dark themes` |
| 2 | Nav + Hero + Capabilities row | `feat: redesign navigation and hero` |
| 3 | Products + Industries | `feat: redesign products and industries` |
| 4 | Testimonials + Contact + Footer + Modal | `feat: redesign testimonials, contact and footer` |
| 5 | Remove old effects/files/deps, responsive + a11y + performance pass | `chore: remove legacy effects and polish` |
| 6 | Verify in browser: desktop / tablet / mobile × light / dark, Lighthouse | — |

Work happens on a branch `redesign/v2`; I push / merge to `main` only when you approve the result.

---

## 9. Decisions I need from you

- **D1 — UI labels:** switch "terminal" labels (TRANSMIT, UPLINK, CALLSIGN…) to plain sentence case? *(Recommended: yes)*
- **D2 — Default theme:** follow the visitor's system setting, or always start in dark / light? *(Recommended: system)*
- **D3 — Hero alignment:** left-aligned (Stripe/Linear feel) or centered (Vercel feel)? *(Recommended: centered — matches the current brand lockup)*
- **D4 — Testimonial stars:** remove the ★★★★★ rows? They read as "template" on premium sites. *(Recommended: remove)*
- **D5 — Section order:** Products before Testimonials as proposed above? *(Recommended: yes)*

## 10. Things I noticed (outside this redesign, flagging only)

- The inquiry form doesn't send anywhere — it only shows a success message. Should be wired to email (e.g. Formspree, Resend, or a `mailto:`) in a follow-up.
- Footer social links point to generic `x.com`, `github.com`, `linkedin.com`, `discord.com` — need your real profile URLs.
- Testimonials name real-sounding people and companies — make sure these are approved/real before launch.
