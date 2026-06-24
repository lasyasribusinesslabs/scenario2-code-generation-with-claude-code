# Demo Walkthrough — SubSync Workspace

## Prompt 1: Scaffold the cancel subscription endpoint

**You type:**
> Scaffold a new 'cancel subscription' endpoint following our API conventions.

**What Claude does:**
- Reads CLAUDE.md automatically (loaded at session start)
- Sees @import for api-conventions.md → reads it
- Generates route with: authMiddleware, CancelSubscriptionSchema (Zod), asyncHandler, sendSuccess envelope
- Generates service stub: cancelSubscriptionService.ts
- All without being told any of these requirements explicitly

**Concepts proved:** 3.1 (CLAUDE.md hierarchy), 3.3 (path-specific rules)

---

## Prompt 2: Add tests to a test file

**You type:**
> Open this test file and add tests for the new endpoint.

**What Claude does:**
- Detects the file matches `**/*.test.ts`
- Auto-loads test-conventions.md (glob match)
- Generates describe/it blocks with `should X when Y` naming
- Adds beforeEach with vi.clearAllMocks()
- Adds 3 test stubs: happy path, validation error, auth error

**Concepts proved:** 3.3 (path-specific rules), 3.2 (skill), 3.5 (iterative refinement)

---

## Prompt 3: Plan mode for rename refactor

**You type:**
> Plan a refactor to rename the User model to Account across the codebase.

**What Claude does:**
- Switches to plan mode (explores before changing)
- Reads all files referencing "User"
- Lists every required change: schema, repositories, services, routes, tests, UI
- Writes a plan WITHOUT touching any file
- Waits for approval before executing

**Concepts proved:** 3.4 (plan mode vs direct), 5.4 (context in large codebase)
