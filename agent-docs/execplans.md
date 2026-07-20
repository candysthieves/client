# Exec Plans

Use an execution plan when a task has multiple dependent steps, touches more than one area of the app, or needs visible
progress tracking. Keep the plan short and update it as work completes.

- Start by reading [README.md](../README.md), [CONTRIBUTING.md](../CONTRIBUTING.md), the relevant files, package
  scripts, and local Next.js 16 docs under `node_modules/next/dist/docs/` when Next.js behavior is involved.
- Define the smallest deliverable that satisfies the current task.
- List implementation, validation, and documentation steps separately.
- Keep unrelated cleanup out of the plan unless it is required for the task.
- Finish by running `pnpm check` and `pnpm build`, or state why either command could not be run.
