---
globs: ["**/*.test.ts", "**/*.spec.ts", "src/tests/**"]
---

# Test Conventions — SubSync

> This file auto-loads ONLY when editing test files (*.test.ts, *.spec.ts).
> Glob pattern in frontmatter triggers it automatically.

## Framework
- Vitest for unit and integration tests
- Supertest for HTTP endpoint tests
- Test files mirror source path: `src/tests/api/subscriptions.test.ts` ↔ `src/api/routes/subscriptions.ts`

## Test Structure
- Always use `describe` / `it` blocks — no top-level `test()`
- Test names follow: `"should <action> when <condition>"`
- One `describe` block per file, named after the module being tested

## Setup & Teardown
- `beforeEach(() => vi.clearAllMocks())` at the top of every describe block
- Mock external services with `vi.mock('../path/to/module')`
- Never call real external APIs or real DB in unit tests

## Assertions
- Every `it` block must have at least one `expect()`
- Prefer specific matchers: `toEqual`, `toMatchObject` over `toBeTruthy`
- For HTTP tests: always assert status code AND response body shape

## Coverage
- New route = new test file with at minimum: happy path, validation error, auth error
