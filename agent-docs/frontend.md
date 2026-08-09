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
