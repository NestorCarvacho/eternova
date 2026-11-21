---
name: web-animation-skills
description: Web animation for the Eternova frontend — GSAP, micro-interactions, scroll motion, page transitions, SVG/Lottie, and accessible 60fps patterns. Use when adding, polishing, or debugging UI motion on this site.
license: See web-animation-skills-LICENSE.txt (MIT, iart-ai)
---

# Web Animation Skills

Pack from [iart-ai/web-animation-skills](https://github.com/iart-ai/web-animation-skills) (`ed3a045`). Sub-skills live alongside this file under `.agents/skills/`:

| Skill | Use when |
|-------|----------|
| `gsap-web` | Scroll-scrubbed timelines, SplitText, Lenis |
| `60fps-animation` | Jank; only `transform`/`opacity` |
| `page-transition-animation` | Route enter/exit (App Router) |
| `accessible-animation` | `prefers-reduced-motion`, WCAG tiering |
| `micro-interaction` | Hover, press, toasts, drawers |
| `glassmorphism` | Frosted panels (use sparingly here) |
| `svg-animation` | Stroke draw, path morph, icons |
| `lottie-animation` | Lottie / dotLottie playback |
| `ascii-animation` | ASCII / terminal effects |

## Eternova defaults

- Tone is calm and respectful — short fades and subtle press feedback, not playful bounces or parallax heroes.
- Prefer CSS + `RevealOnView` / `useReducedMotion` before adding GSAP or Framer Motion (bundle and a11y).
- Always tier motion per `accessible-animation` (keep opacity/focus; drop large translates).
- Existing tokens: ink `#07182b`, gold `#c6a15b`, cream `#f3eee4`; easing `cubic-bezier(0.16, 1, 0.3, 1)`.

## Site hooks

- `frontend/src/hooks/useReducedMotion.ts`
- `frontend/src/components/RevealOnView.tsx`
- `frontend/src/components/StaggerChildren.tsx`
- Motion utilities in `frontend/src/app/globals.css` (`.reveal-on-view`, `.motion-press`, `.service-card`)