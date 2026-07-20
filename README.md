# Client

Client is the frontend application for a social network. It uses Next.js 16, the App Router, TypeScript, React, and
pnpm. During the first development stage, treat the project as a client-side SPA: keep rendering behavior, state,
navigation, and data loading on the client unless a task explicitly requires server-side functionality.

## Requirements

- Node.js installed locally.
- pnpm installed locally.

Exact Node.js and pnpm versions are not pinned in this repository.

## Setup

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

Use pnpm for all project commands because the repository includes `pnpm-lock.yaml`.

- `pnpm dev`: start the Next.js development server.
- `pnpm build`: create a production build and run Next.js compile-time checks.
- `pnpm start`: serve the production build after `pnpm build`.
- `pnpm lint`: run ESLint and Stylelint.
- `pnpm lint:code`: run ESLint.
- `pnpm lint:styles`: run Stylelint for CSS files.
- `pnpm lint:fix`: fix auto-fixable ESLint and Stylelint issues.
- `pnpm format`: format files with Prettier.
- `pnpm format:check`: check Prettier formatting without writing files.
- `pnpm typecheck`: run TypeScript with `tsc --noEmit`.
- `pnpm check`: run type checking, linting, and Prettier format checks.

## Project Structure

```text
.
+-- agent-docs/              # Task-specific guidance for AI-assisted work
+-- public/                  # Static assets served from the web root
+-- src/
|   +-- app/
|       +-- globals.css      # Global CSS variables, resets, and element defaults
|       +-- layout.tsx       # Root App Router layout
|       +-- page.tsx         # Home route
+-- AGENTS.md                # Navigation notes for AI agents
+-- CONTRIBUTING.md          # Team workflow and contribution rules
+-- eslint.config.mjs        # ESLint configuration
+-- next.config.ts           # Next.js configuration
+-- package.json             # Dependencies and scripts
+-- pnpm-lock.yaml           # pnpm lockfile
+-- pnpm-workspace.yaml      # pnpm workspace settings
+-- prettier.config.mjs      # Prettier configuration
+-- stylelint.config.mjs     # Stylelint configuration
+-- tsconfig.json            # TypeScript configuration
```

## Environment Variables

Do not commit secrets or local environment files. Put local runtime configuration in `.env.local`.

This repository does not currently include `.env.example`. If required environment variables are added, document them in
`.env.example` and keep secret values out of version control.

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before creating branches, commits, or pull requests.
