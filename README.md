# Adway | Portfolio

A premium, interactive 3D developer portfolio. Dark, editorial, cinematic.
Built with React + TypeScript + Vite, React Three Fiber, GSAP, Framer Motion,
Lenis and Tailwind CSS.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # preview the build
```

## Where to edit content (no UI code required)

All copy and links live in `src/data/`:

| File | What it holds |
| --- | --- |
| `src/data/experience.ts` | Walmart + Enquero roles, highlights, keywords |
| `src/data/projects.ts` | Selected work (name, problem/solution/impact, stack, links) |
| `src/data/skills.ts` | Skill categories for the constellation |
| `src/data/principles.ts` | "How I Think" principles |
| `src/data/about.ts` | Bio, interests, learning, favourite tech |
| `src/data/socialLinks.ts` | Email / LinkedIn / GitHub / résumé URLs |

Placeholders are marked with `// TODO`. Search the repo for `TODO` to find
everything that still needs your real details.

## Animated background

The site has a full-bleed animated 3D backdrop (`src/components/ui/BackgroundScene.tsx`):
a morphing self-lit blob, a faint geometric cage, drifting particles and an
orbiting accent light. It's prominent in the hero and fades back on scroll so
content stays legible. It's frozen for `prefers-reduced-motion` and lightened on
mobile. Accent colors live in `src/lib/constants.ts`.

## Design tokens

Colors, fonts and the fluid type scale are defined in `tailwind.config.js` and
`src/styles/globals.css`. Animation timings/easings live in `src/lib/constants.ts`
and reusable motion variants in `src/lib/animations.ts`.

## Accessibility & performance

- Full `prefers-reduced-motion` support (animations + 3D are reduced/disabled).
- Semantic landmarks, keyboard focus states, ARIA labels.
- Custom cursor and heavy 3D are disabled on touch / low-power devices.
- The hero WebGL loop pauses when scrolled out of view; the contact orb is
  lazy-loaded and desktop-only.
```
© 2026 Adway
```
