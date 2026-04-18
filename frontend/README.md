<div align="center">

<br/>

# 🎨 VelaAI — Frontend

### React 18 · Vite · Glacier Design System

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-BD34FE?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![CSS Variables](https://img.shields.io/badge/CSS-Variables%20Theme-4BBDE0?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
[![Playfair Display](https://img.shields.io/badge/Font-Playfair%20Display-C8ECFA?style=flat-square)](https://fonts.google.com/specimen/Playfair+Display)

<br/>

A production-grade React frontend with a custom **Glacier** design system — deep ocean blues, frosted glass panels, and ice-white typography. Zero external UI libraries; every component is hand-crafted with CSS variables and inline styles for full theme control.

<br/>

</div>

---

## 📁 Project Structure

```
frontend/
└── src/
    ├── App.jsx                     # Root component — page router
    │
    ├── styles/
    │   └── theme.css               # Glacier CSS variables + animations
    │
    ├── components/
    │   ├── Background.jsx          # Layered aurora + noise grain + ice grid
    │   ├── Nav.jsx                 # Frosted glass navigation bar
    │   └── SimpleMarkdown.jsx      # Inline markdown renderer
    │
    └── pages/
        ├── HomePage.jsx            # Hero, feature cards, stat pills, CTA
        ├── ChatPage.jsx            # Sidebar config + message bubbles + input
        └── AboutPage.jsx           # Architecture flow, tech stack, bots grid
```

---

## 🎨 Glacier Design System

All colors and typographic scales are defined as CSS custom properties in `theme.css` and referenced everywhere — making global retheming a single-file change.

### Color Palette

| Variable | Hex | Role |
|---|---|---|
| `--bg` | `#060E14` | Deep ocean black (page background) |
| `--bg2` | `#0B1825` | Sidebar / panel background |
| `--bg3` | `#0F2035` | Elevated surfaces, input fields |
| `--bg4` | `#142840` | Highest-elevation cards |
| `--primary` | `#1B6FA8` | Brand blue — buttons, user bubbles |
| `--accent` | `#4BBDE0` | Ice blue — icons, active states, glow |
| `--glow` | `#7ED6F0` | Code syntax highlight |
| `--highlight` | `#C8ECFA` | Headings, emphasized text |
| `--text` | `#E8F5FB` | Body text |
| `--text2` | `#85BACF` | Secondary / muted text |
| `--text3` | `#3E6E85` | Disabled / placeholder text |
| `--border` | `rgba(148,210,240,0.10)` | Default border |
| `--border2` | `rgba(148,210,240,0.22)` | Hover border |
| `--border3` | `rgba(148,210,240,0.40)` | Active border |
| `--glass` | `rgba(11,24,37,0.72)` | Frosted glass base |
| `--glass2` | `rgba(20,40,64,0.55)` | Lighter frosted glass |

### Typography

| Variable | Font | Usage |
|---|---|---|
| `--serif` | Playfair Display | Headings, logo wordmark |
| `--sans` | DM Sans | Body, UI labels, buttons |
| `--mono` | Fira Code | Code blocks, session IDs |

### Animations

| Class / Keyframe | Effect |
|---|---|
| `.fade-up` | Slides in from below on mount (staggered via `animation-delay`) |
| `.fade-in` | Simple opacity fade — used on chat messages |
| `.float` | Gentle vertical oscillation — hero orb |
| `.ice-glow` | Pulsing box-shadow — CTA button |
| `spin` | 360° rotation — loading spinner |
| `pulse` | Opacity throb — typing dots, status indicator |

---

## ⚡ Setup & Development

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 18 |
| npm | ≥ 9 |

### Install & run

```bash
# 1. Navigate to frontend directory
cd llm/frontend

# 2. Install dependencies
npm install

# 3. Start dev server (hot-reload)
npm run dev
```

> ✅ App available at **http://localhost:5173**

### Build for production

```bash
npm run build       # outputs to dist/
npm run preview     # locally preview the production build
```

---

## 🧩 Component Reference

### `Background.jsx`

Renders three stacked fixed layers:
1. **Radial gradient aurora** — dual-orb glow at top-left and bottom-right
2. **SVG noise grain** — `feTurbulence` at 0.85 frequency, 45% opacity
3. **Ice crystal grid** — 80×80px faint crosshatch

### `Nav.jsx`

- Fixed top bar with `backdrop-filter: blur(16px)`
- Logo: *Vela* (Playfair, weight 600) + *AI* (italic, accent color)
- Active page pill: `rgba(75,189,224,0.12)` fill + `var(--accent)` border
- Hover: border fades in, text brightens

### `SimpleMarkdown.jsx`

Lightweight markdown renderer — no external library. Supports:

```
# ## ###    Headings (serif for h1/h2, sans for h3)
**bold**    → <strong> in highlight color
`code`      → <code> with ice-blue background
- / *       Bullet list with ◆ accent marker
1.          Numbered list with accent number
```backtick → Fenced code block with language label
```

All inline parsing (`**bold**`, `` `code` ``) is handled by a shared `inlineParse()` helper that runs on **every** line type — bullets, numbered items, and paragraphs alike.

### `ChatPage.jsx`

Sub-components:
- **`<Sidebar />`** — collapsible 272px panel; bot selector, provider toggle, temperature slider, memory toggle, active config summary, clear button
- **`<MessageBubble />`** — user bubbles right-aligned with `var(--primary)` gradient; assistant bubbles left-aligned with avatar icon
- **`<TypingIndicator />`** — 3-dot pulse animation while awaiting response

State managed entirely in `ChatPage` via `useState` hooks — no global state library needed.

---

## 🔌 Connecting to the Backend

The frontend sends requests to `http://localhost:8000/chat`. To change the API base URL:

```jsx
// src/pages/ChatPage.jsx  — line ~89
const res = await fetch("http://localhost:8000/chat", { ... });
```

For production, set via an environment variable in `.env`:

```env
VITE_API_URL=https://your-api.example.com
```

Then in code:

```jsx
const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const res = await fetch(`${API}/chat`, { ... });
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| Blank page / white flash | Check browser console for import errors |
| Fonts not loading | Confirm internet connection (Google Fonts CDN) |
| `fetch failed` in chat | Ensure backend is running at `:8000` |
| CORS error | Add `http://localhost:5173` to backend CORS origins |
| Hot-reload not working | Delete `node_modules/.vite` and restart |

---

<div align="center">
<sub>🎨 VelaAI Frontend · React 18 + Vite + Glacier Design System</sub>
</div>