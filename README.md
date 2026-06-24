# SubSync SaaS — Claude Code Workspace

Project made for assessment for BusinessLabs.org
My id is 2026-2403

---

## The 6 Configuration Layers

| Layer | What it does | Files |
|-------|-------------|-------|
| **1. CLAUDE.md hierarchy** | Universal standards + @import modular rules | `CLAUDE.md` + `.claude/rules/*.md` |
| **2. Path-specific rules** | YAML glob frontmatter auto-loads rules per file type | `test-conventions.md` (globs: *.test.ts) |
| **3. Custom skills** | Reusable multi-step workflows in forked context | `.claude/skills/scaffold-endpoint/` |
| **4. MCP servers** | Project-shared (postgres, github) + personal (stripe) | `.mcp.json` + `claude-personal-mcp-example.json` |
| **5. Plan vs direct** | Choosing the right execution mode | See SESSION-GUIDE.md |
| **6. Session management** | Resume and fork across days | `claude --resume`, `claude --fork` |

---

## Demo Prompts

### Prompt 1 — New endpoint with automatic convention loading
```
Scaffold a new 'cancel subscription' endpoint following our API conventions.
```

### Prompt 2 — Test file with auto-loaded test rules
```
Open this test file and add tests for the new endpoint.
```

### Prompt 3 — Plan mode for large refactor
```
Plan a refactor to rename the User model to Account across the codebase.
```

---

## Setup

1. Copy `.env.example` to `.env` and fill in values
2. Run `npm install`
3. Run `npm run db:migrate`
4. For personal MCP: copy the `mcpServers.stripe` block from `claude-personal-mcp-example.json` into `~/.claude.json`

---

## Project Structure

```
saas-workspace/
├── CLAUDE.md                          ← Root: universal standards + @imports
├── .mcp.json                          ← Shared MCP servers (postgres, github)
├── claude-personal-mcp-example.json   ← Template: personal Stripe MCP
├── SESSION-GUIDE.md                   ← Session management + plan mode guide
├── WALKTHROUGH.md                     ← Step-by-step demo walkthrough
├── .claude/
│   ├── rules/
│   │   ├── api-conventions.md         ← @imported into CLAUDE.md
│   │   ├── ui-conventions.md          ← @imported into CLAUDE.md
│   │   ├── db-conventions.md          ← @imported into CLAUDE.md
│   │   └── test-conventions.md        ← Path-specific: globs *.test.ts
│   └── skills/
│       ├── scaffold-endpoint/SKILL.md ← /skill scaffold-endpoint
│       └── pre-pr-check/SKILL.md      ← /skill pre-pr-check
├── src/
│   ├── api/
│   │   ├── errors.ts                  ← AppError class
│   │   └── routes/subscriptions.ts   ← Existing route (no cancel yet)
│   ├── db/models/User.ts
│   └── tests/
└── prisma/schema.prisma
```
