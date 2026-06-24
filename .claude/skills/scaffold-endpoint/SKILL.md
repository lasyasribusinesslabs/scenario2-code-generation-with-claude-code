---
name: scaffold-endpoint
description: Scaffolds a complete API endpoint with route file, Zod schema, service stub, and test file following SubSync conventions.
context: fork
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# Skill: scaffold-endpoint

## Purpose
Generate a production-ready endpoint scaffold in one command.
Runs in a forked context so output doesn't pollute main chat.

## Usage
```
/skill scaffold-endpoint <ResourceName>
```
Example: `/skill scaffold-endpoint CancelSubscription`

## Steps

1. **Read conventions** — Load `CLAUDE.md`, `.claude/rules/api-conventions.md`, and `.claude/rules/test-conventions.md` before generating anything.

2. **Create route file** — `src/api/routes/<resource>.ts`
   - Express Router with authMiddleware
   - Zod schema named `<Action><Resource>Schema`
   - asyncHandler wrapper
   - sendSuccess response envelope
   - Correct HTTP status codes per api-conventions

3. **Create service file** — `src/api/services/<resource>Service.ts`
   - Pure async functions (no req/res)
   - Typed inputs and return values
   - AppError for domain errors
   - Stub implementation with TODO comments

4. **Create test file** — `src/tests/api/<resource>.test.ts`
   - describe block named after the route
   - beforeEach with vi.clearAllMocks()
   - Three test stubs: happy path, validation error, auth error

5. **Print summary** — List all files created with their paths.

## Output Format
```
✅ scaffold-endpoint complete
Files created:
  - src/api/routes/cancelSubscription.ts
  - src/api/services/cancelSubscriptionService.ts
  - src/tests/api/cancelSubscription.test.ts
```
