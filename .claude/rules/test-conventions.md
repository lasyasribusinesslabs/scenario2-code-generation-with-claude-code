---
globs: ["**/*.test.ts", "**/*.spec.ts", "src/tests/**"]
---
# Test Conventions
## Framework
- Use Vitest + Supertest for all tests.
- Import from vitest: describe, it, expect, vi, beforeEach, afterEach.
## Naming Pattern
- Test files: <feature>.test.ts or <feature>.spec.ts
- Describe block: describe('cancelSubscription', () => {
- It block: it('should <outcome> when <condition>', async () => {
## Structure
describe('featureName', () => {
  beforeEach(() => { vi.clearAllMocks(); });
  it('should return 200 when request is valid', async () => { ... });
  it('should return 400 when validation fails', async () => { ... });
  it('should return 401 when unauthenticated', async () => { ... });
});
## Rules
- Always add beforeEach with vi.clearAllMocks().
- Minimum 3 test stubs: happy path, validation error, auth error.
- Mock external dependencies, never call real DB in unit tests.
- Use supertest for route-level integration tests.
- Assert on both status code and response body shape.
