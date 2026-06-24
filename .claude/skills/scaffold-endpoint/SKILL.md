---
name: scaffold-endpoint
description: Scaffolds a complete API endpoint following SubSync conventions.
context: fork
allowed-tools: [Read, Write, Bash]
---
# Skill: Scaffold Endpoint
## Steps
### Step 1 - Read Conventions
Read .claude/rules/api-conventions.md and .claude/rules/test-conventions.md before writing any code.
### Step 2 - Create Route File
Write src/api/routes/<endpoint>.routes.ts with authMiddleware, Zod schema, asyncHandler, /api/v1/ prefix.
### Step 3 - Create Service File
Write src/api/services/<endpoint>.service.ts as a pure function taking a validated DTO, calling repository only.
### Step 4 - Create Repository Function
Add to src/db/repositories/<resource>.repository.ts using Prisma findUniqueOrThrow.
### Step 5 - Create Test File
Write src/tests/<endpoint>.test.ts with describe, 3 it blocks (happy/validation/auth), beforeEach vi.clearAllMocks(), mocked repository.
## Output Summary Format
Print after all steps:
✅ Scaffold complete for: <endpoint name>
Files created:
  src/api/routes/<endpoint>.routes.ts
  src/api/services/<endpoint>.service.ts
  src/db/repositories/<resource>.repository.ts (updated)
  src/tests/<endpoint>.test.ts
Next: run npm run test to verify stubs pass.
