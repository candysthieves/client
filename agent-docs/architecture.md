# Architecture Notes

Keep the architecture simple while the app is in its initial SPA stage. Prefer client-side data flow and browser-first
interactions until a task introduces a concrete server requirement.

- `src/app/layout.tsx` owns the root document shell and global imports.
- `src/app/page.tsx` owns the home route and should compose feature components rather than growing into a large
  implementation file.
- Shared code should use the `@/*` path alias and live under `src` in purpose-named folders when it is reused by more
  than one route or feature.
- Read the relevant Next.js 16 docs before changing routing, metadata, config, file conventions, or rendering mode.
- Avoid adding new architectural layers, global state libraries, or data-fetching libraries until the current task
  demonstrates a real need.
