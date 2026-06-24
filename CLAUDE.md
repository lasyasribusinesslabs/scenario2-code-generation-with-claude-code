# SubSync SaaS — Claude Code Workspace

> SubSync is a subscription management SaaS (cancel/pause/upgrade flows).
> This file is read automatically by Claude Code every session.
---

## 1. Project Overview

| Layer | Location     | Stack                          |
| ----- | ------------ | ------------------------------ |
| API   | `src/api/`   | Node.js + Express + TypeScript |
| UI    | `src/ui/`    | React 18 + Tailwind CSS        |
| DB    | `src/db/`    | PostgreSQL + Prisma ORM        |
| Tests | `src/tests/` | Vitest + Supertest             |

---

## 2. Universal Rules (apply everywhere)

- **TypeScript strict mode** — never use `any`; use `unknown` + type guards.
- **No inline secrets** — all env vars come from `process.env`, never hardcoded.
- **Error handling** — always use the shared `AppError` class from `src/api/errors.ts`.
- **Imports** — use path aliases: `@api/`, `@ui/`, `@db/`, `@tests/`.
- **Commits** — conventional commits only: `feat:`, `fix:`, `refactor:`, `test:`.
- **No `console.log`** in production code — use the `logger` utility.

---

## 3. Imported Rule Files

@import .claude/rules/api-conventions.md
@import .claude/rules/ui-conventions.md
@import .claude/rules/db-conventions.md
@import .claude/rules/test-conventions.md

---

## 4. Architecture Principles

- **Controllers stay thin** — no business logic; delegate to service layer.
- **Services are pure** — no HTTP req/res objects inside service functions.
- **DB layer only in repositories** — never query the DB from a controller or service directly.
- **All routes versioned** — prefix every endpoint with `/api/v1/`.

---

## 5. Common Commands

```
npm run dev          # Start dev server (hot reload)
npm run test         # Run all tests
npm run test:watch   # Watch mode
npm run lint         # ESLint + Prettier
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed dev data
npm run build        # Production build
```

---

## 6. Directory Map

```
saas-workspace/
├── CLAUDE.md                  ← you are here
├── .claude/
│   ├── rules/                 ← path-specific rules (auto-loaded)
│   └── skills/                ← reusable command workflows
├── .mcp.json                  ← project-scoped MCP servers
├── src/
│   ├── api/                   ← Express routes + controllers + services
│   ├── ui/                    ← React components + pages
│   ├── db/                    ← Prisma schema + repositories
│   └── tests/                 ← unit + integration + e2e tests
└── prisma/
    └── schema.prisma
```
