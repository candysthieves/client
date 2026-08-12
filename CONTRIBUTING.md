# Contributing

## Branch Workflow

1. Update `dev` before starting a task.
2. Create each working branch from `dev`.
3. Use branch names in this format:

```text
<change-type>/<id task>-<short-task-description>
```

Use English, lowercase words, and hyphens.

Examples:

- `feat/SCRUM-27-implement-the-registration-page`
- `fix/SCRUM-28-change-the-sign-in-page`
- `chore/SCRUM-30-add-configs-to-the-project`

Do not commit directly to `main` or `dev`.

## Commits

Use Conventional Commits in this format:

```text
<id task> <type>: <subject>
Refs: #<issue-number>
```

Examples:

```text
SCRUM-27 feat: create registration form

Refs: #243
```

```text
SCRUM-30 chore: add-configs-to-the-project
Refs: #287
```

Keep each commit focused on one logical change.

## Pull Requests

Open Pull Requests back into `dev`.

Each PR should include:

- A concise summary.
- A link or reference to the task.
- Results of validation commands.
- Screenshots for visible UI changes.

Before opening a PR, run:

```bash
pnpm check
pnpm build
```

Do not mix functional changes, refactoring, dependency updates, and mass formatting unless the task requires it.

## Code Style

- Write TypeScript and React function components.
- Keep App Router route files in lowercase Next.js conventions such as `page.tsx` and `layout.tsx`.
- Use PascalCase for exported components and camelCase for variables.
- Prefer the `@/*` path alias for imports from `src`.
- Use CSS Modules for component or route-specific styles.
- Keep `src/styles/index.scss` limited to global CSS variables, resets, and element defaults.
- Follow ESLint, Prettier, and Stylelint. Run project scripts through pnpm instead of global tools.
- Follow `.editorconfig`: UTF-8, LF line endings, two-space indentation, final newline, and trimmed trailing whitespace.
