# Project guide for coding agents

This repository is John Patrick Soriaga's personal portfolio. Use the current site as the source of truth for visual and coding decisions. Make focused changes that fit the existing design; do not redesign unrelated sections while completing a task.

## Project layout

- `client/` is the application. Run npm commands from this directory.
- `client/src/pages/MainPage.tsx` composes the page and controls the selected `Project`, `Fun`, or `About` section.
- `client/src/components/` groups components by section: `HeroSection`, `Navigation`, `RecentProject`, `About`, `Personal`, and `Footer`. Keep section-specific helpers beside their parent component.
- `client/src/assets/` holds imported images; `client/public/` holds files served by URL. Reuse existing assets when appropriate.
- `client/src/styles/index.css` contains global styles, the Inter font, Tailwind imports, and a few shared classes. Most component styling lives in Tailwind utility classes in TSX.
- `.github/workflows/deploy.yml` builds `client/` with Node 22 and deploys `client/dist` to GitHub Pages. `CNAME` configures the custom domain.

## Visual direction

- Keep the portfolio clean, personal, and understated. Favor generous white space, a white background, black text, warm neutral grays, and small, deliberate accents. The colorful hero particles are an accent, not a cue to make the whole interface colorful.
- Use Inter, light or medium font weights, small muted uppercase labels, readable body text, and restrained hierarchy. Preserve the existing wording and personal voice unless the task asks for copy changes.
- Follow the existing centered content width (`max-w-[1120px]`) and responsive padding pattern. Sections generally become two columns from `md` upward and stack on small screens.
- Prefer subtle rounded corners, thin borders, and soft shadows. Avoid heavy gradients, glass effects, oversized cards, loud colors, or dense layouts that compete with the content.
- Interactions should feel polished and quiet: small lifts, fades, scales, and staggered entrances. Keep hover effects secondary to content and make touch layouts usable without hover.
- Check the changed UI at mobile and desktop widths. Preserve spacing, legibility, and the visual rhythm of nearby sections.

## Implementation conventions

- Use React function components and TypeScript. Define prop types near the component; use `import type` for type-only imports.
- Use the `@/` alias for imports from `client/src` and relative imports for files in the same component folder. Follow the local file's formatting rather than reformatting unrelated code.
- Build on the current stack: Vite, React, Tailwind CSS v4, GSAP, and the icon packages already installed. Avoid adding dependencies for small UI changes.
- Keep reusable UI or behavior in a focused component, but do not split simple markup into unnecessary files. Put project-specific data and assets near the section that renders them.
- For GSAP effects, use refs and `gsap.context()` inside `useLayoutEffect`, then call `ctx.revert()` on cleanup. Clean up timers, listeners, observers, and animation frames as well.
- Keep controls semantic and keyboard accessible. Give images useful alt text, icon-only links accessible names, external links appropriate `rel` attributes, and status messages `aria-live` when needed. Respect reduced-motion preferences when adding or changing animation.
- Do not assume the site has a full dark theme. A dark variant exists in CSS, but most components are currently designed for the light appearance.
- The navigation is state-driven within `MainPage.tsx`; there is no router or backend in this repo. Match that structure unless the task calls for a larger change.

## Verification

- From `client/`, run `npm run lint` and `npm run build` after code changes.
- For visual changes, run `npm run dev` and inspect the affected section on a narrow and a wide viewport, including hover and keyboard behavior where relevant.
- Keep changes limited to the requested work and report any checks you could not run.
