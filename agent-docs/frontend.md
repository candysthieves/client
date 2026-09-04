# Frontend Guidelines

The project is a Next.js 16 App Router app currently developed as a client-side SPA. Build UI, navigation, interactions,
and data loading with a client-side approach unless the task explicitly requests server-side behavior.

- Add `'use client'` to components that need state, event handlers, effects, browser APIs, or client routing hooks.
- Keep route files under `src/app` focused on routing and composition; move reusable UI into clearly named component
  files as the app grows.
- Use `next/link` for internal navigation.
- Use `next/image` for images when the Next.js image component fits the use case.
- Use SCSS Modules for route or component styles and keep `src/styles/index.scss` limited to resets, variables, and element
  defaults.
- Prefer accessible HTML controls, clear focus states, and responsive layouts that work at mobile and desktop widths.
- Do not add SEO metadata, Open Graph images, server data loading, Server Actions, or API routes unless the task
  explicitly asks for them.

## Shared SCSS primitives and breakpoints

Before writing or reviewing component styles, inspect `src/styles/_mixins.scss` and reuse the applicable primitive:

- `content` for the standard centered content area;
- `width-height` for paired dimensions;
- `transition-basic` for transitions using the standard timing tokens;
- `media-desktop` (`1280px`), `media-tablet` (`768px`), `media-tablet-small` (`640px`), and `media-mobile` (`360px`) for responsive rules.

Do not add a local numeric `@media` query or an ad hoc breakpoint. If the shared breakpoints cannot express a
required layout, add a named shared token and mixin in `src/styles/_mixins.scss` only when the task explicitly requires
that new responsive tier; otherwise ask for direction.

`next/image` `sizes` cannot read Sass values at runtime, so use only the same established breakpoint values in its
string (`1280px`, `768px`, `640px`, `360px`). During review, check that `sizes` matches the SCSS grid at every responsive tier.
