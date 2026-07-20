# AI Agent Guide

This file is a short navigation guide for AI agents. It does not replace the team documentation.

Before making changes, read:

- [README.md](./README.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)

## Project Context

This is a Next.js 16 client application for a social network. It uses the App Router and TypeScript. At the first
development stage, treat it as a client-side SPA. Do not add SSR, Server Actions, server-side data loading, Route
Handlers, or SEO functionality unless the task explicitly asks for them.

Application code currently lives in `src/app`. Static assets belong in `public/` when present.

## Next.js Documentation

Before changing Next.js APIs, routing, metadata, configuration, or file structure, read the relevant installed Next.js
16 guide in `node_modules/next/dist/docs/`. Treat deprecation notices in those docs as authoritative for this project.

## Task-Specific Notes

- [Exec Plans](./agent-docs/execplans.md): use for multi-step tasks or progress tracking.
- [Frontend](./agent-docs/frontend.md): use for UI, interactions, navigation, and client-side state.
- [Architecture](./agent-docs/architecture.md): use before changing module boundaries, routing shape, shared state, or
  data flow.

## External Tools

Do not assume external CLI tools, IDE integrations, MCP servers, or AI-agent features are available unless they are
configured in the repository or confirmed in the current environment. Check tool availability before using
environment-specific capabilities.
