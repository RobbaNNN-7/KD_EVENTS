## Quick Context

This repository contains a static/vanilla site alongside a Vite + React conversion located at `react-app/`.
The React app is the primary interactive frontend and was migrated from the top-level HTML/CSS files. Treat `react-app/` as the working application for development, builds, and deployments.

## Big Picture Architecture (how things fit together)

- **`react-app/`**: Vite + React SPA. Entry point: `react-app/src/main.jsx`. Routing is configured in `react-app/src/App.jsx`. Pages live under `react-app/src/pages/` and UI pieces under `react-app/src/components/`.
- **Original static files**: Top-level HTML/CSS/JS files (e.g., `gallery.html`, `index.html`, `styles.css`) are the pre-migration vanilla site. They are reference material but not the active React app.
- **Assets**: `react-app/public/assets/` stores images and videos. Use these for static imports or reference them via the public path in components.

## Key Developer Workflows and Commands

- Install dependencies (from repo root): `cd react-app; npm install`
- Start dev server: `npm run dev` (inside `react-app/`) — Vite serves on `http://localhost:5173` by default.
- Build production: `npm run build` → outputs `dist/` (inside `react-app/`).
- Preview production build: `npm run preview`.
- Lint project: `npm run lint` (project uses `eslint` and `eslint.config.js` inside `react-app/`).

Notes: run these commands from `react-app/` or prefix with `cd react-app; <cmd>` when running from repo root. On Windows PowerShell use `;` to join commands on one line.

## Project-specific Conventions & Patterns

- Pages: Add new page components to `react-app/src/pages/` and register routes in `react-app/src/App.jsx`. Example: create `src/pages/ContactPage.jsx` and add `<Route path="/contact" element={<ContactPage/>} />`.
- Sections vs shared components: Reusable UI lives in `src/components/shared/`; larger page sections are in `src/components/sections/`. Prefer adding small utilities to `shared` and page-specific layout to `sections`.
- Styles: Component CSS files live in `react-app/src/styles/` (imported by components). Some components also have local `.css` files next to JSX. Keep styles colocated when component-specific; use `src/index.css` for global overrides.
- Static content edits: To update copy (team, services, testimonials), edit the corresponding section component (e.g., `src/components/sections/Team.jsx`, `Services.jsx`, `Testimonials.jsx`).

## Integration Points & External Dependencies

- Email sending: `@emailjs/browser` is used for the contact form. Credentials are configured in `react-app/src/components/sections/Contact.jsx` as `serviceID`, `templateID`, and `publicKey`. Don't commit real keys — use environment variables or local dev placeholders.
- Router: `react-router-dom` governs client routes. Be mindful of v6/v7 route APIs when adding or updating routes.
- Vite: The project uses Vite (with an override/alias to `rolldown-vite`) — be careful when editing Vite config (`react-app/vite.config.js`) and when pinning versions in `package.json`.

## Files to Inspect First (fast onboarding)

- `react-app/README.md` — contains high-level instructions and migration notes.
- `react-app/package.json` — scripts, dependencies, and overrides.
- `react-app/src/App.jsx` and `react-app/src/main.jsx` — routing and app bootstrapping.
- `react-app/src/pages/` and `react-app/src/components/` — where most UI changes happen.
- `react-app/src/components/sections/Contact.jsx` — EmailJS integration (requires config).
- `react-app/eslint.config.js` — lint rules to follow when adding code.

## What Agents Should Do (when editing code)

- Always run the dev server locally after changes: `cd react-app; npm run dev` and open `http://localhost:5173`.
- When adding a new page or route, update `src/App.jsx` and verify navigation works (client-side routing). Show the exact file/line snippets you changed in your PR description.
- For front-end assets, add images to `react-app/public/assets/images/` and reference via `/assets/images/...` or import from `src` when bundling is needed.
- If modifying EmailJS config, leave placeholders in source and document required environment variables in your PR.

## Examples (copy/pasteable)

- Dev server (PowerShell):
```
cd react-app; npm install; npm run dev
```
- Add route example (in `react-app/src/App.jsx`):
```jsx
import NewPage from './pages/NewPage'
// inside <Routes>
<Route path="/new" element={<NewPage/>} />
```

## Restrictions / Cautions

- Do not remove or overwrite the top-level vanilla site files unless migrating their content into `react-app/` — they are kept intentionally as source/reference material.
- Do not commit EmailJS keys or other secrets. Prefer documenting where keys go and leaving placeholder values.

## Asking for Clarification

If something isn't discoverable (deployment environment, secret storage policy, or intended route semantics), ask the repo owner these quick questions:
- Which host/service should we target for production (Vercel, Netlify, GitHub Pages)?
- Where should secrets live for CI/CD? (vercel env vars, GitHub Actions secrets, etc.)

---
If you'd like, I can: run the dev server locally (if you want me to run commands), add example environment variable handling for EmailJS, or update `react-app/README.md` with clearer deployment steps. What should I do next?
