---
name: pre-pr-check
description: Runs a pre-PR quality checklist — lint, tests, type-check, and convention audit — before opening a pull request.
context: fork
allowed-tools:
  - Read
  - Bash
---

# Skill: pre-pr-check

## Purpose
One-command pre-PR gate that catches issues before review.
Runs in forked context so output is isolated.

## Usage
```
/skill pre-pr-check
```

## Steps

1. Run `npm run lint` — report any ESLint or Prettier failures
2. Run `npm run build` — report TypeScript type errors
3. Run `npm run test` — report failing tests with names
4. Scan changed files for `console.log`, hardcoded secrets, and `any` types
5. Print a pass/fail summary for each check

## Output Format
```
Pre-PR Check — SubSync
======================
✅ Lint: passed
✅ Build: passed (0 type errors)
❌ Tests: 2 failing
   - should cancel subscription when user is authenticated
   - should return 400 when subscriptionId is missing
⚠️  Convention issues:
   - src/api/routes/billing.ts line 34: console.log found
Result: NOT READY — fix 1 test failure and 1 convention issue
```
