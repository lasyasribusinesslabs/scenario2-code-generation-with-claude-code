---
name: pre-pr-check
description: Runs lint, build, tests, and convention scan before opening a PR.
context: fork
allowed-tools: [Bash, Read]
---
# Skill: Pre-PR Check
## Steps
### Step 1 - Lint
Run: npm run lint. Record PASS or FAIL with error count.
### Step 2 - Build
Run: npm run build. Record PASS or FAIL.
### Step 3 - Tests
Run: npm run test. Record passed / failed / skipped.
### Step 4 - Convention Scan
Check: no console.log in src/api/ or src/ui/, no hardcoded secrets, all routes under /api/v1/.
## Output Report Format
===== PRE-PR CHECK REPORT =====
Lint:        ✅ PASS  (0 errors)
Build:       ✅ PASS
Tests:       ✅ PASS  (42 passed, 0 failed)
Conventions: ✅ PASS  (no violations found)
Overall:     ✅ READY TO PR
================================
If any step fails, Overall shows BLOCKED and lists specific failures.
