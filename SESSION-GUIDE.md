# Claude Code Session Management — SubSync Workspace

## Why Sessions Matter

Claude Code sessions persist your context across terminal closes.
Real work spans days — you don't re-explain the whole codebase each morning.

---

## Starting a Named Session

```
# Start a new named session for a specific feature
claude --session cancel-subscription-feature

# Resume the exact same session tomorrow
claude --resume cancel-subscription-feature
```

---

## Forking a Session (Try Two Approaches)

When you want to explore two implementation approaches without losing your place:

```
# You're mid-session and want to try a risky refactor
# Fork creates a copy — original session is untouched

claude --fork cancel-sub-approach-a     # First approach: soft-delete pattern
claude --fork cancel-sub-approach-b     # Second approach: status enum pattern

# Compare results, then resume the original if neither was better
claude --resume cancel-subscription-feature
```

---

## Practical Session Workflow

```
# Monday morning: start the feature
claude --session "rename-user-to-account"

# (work all day)

# End of day — Claude Code auto-saves the session
# Just close the terminal

# Tuesday morning: pick up exactly where you left off
claude --resume "rename-user-to-account"

# Mid-week: want to try renaming via migration vs app-layer
claude --fork "rename-via-migration"
claude --fork "rename-via-app-layer"
# ...compare outputs...
claude --resume "rename-user-to-account"   # back to safe base
```

---

## Session Commands Reference

| Command                    | What it does                          |
| -------------------------- | ------------------------------------- |
| `claude --session <name>`  | Start or attach to a named session    |
| `claude --resume <name>`   | Resume a specific saved session       |
| `claude --fork <new-name>` | Fork current session into new branch  |
| `/cost`                    | Check token usage in current session  |
| `/compact`                 | Compress context when it gets large   |
| `/clear`                   | Clear context (keeps CLAUDE.md rules) |

---

## Plan Mode vs Direct Execution

| Task size                  | Mode           | How to trigger                              |
| -------------------------- | -------------- | ------------------------------------------- |
| One-line bug fix           | Direct         | Just describe the fix                       |
| New feature (< 5 files)    | Direct         | Just describe it                            |
| Big rename across codebase | **Plan first** | "Plan a refactor to rename User to Account" |
| Architectural change       | **Plan first** | "Plan how we'd add multi-tenancy"           |
| Anything irreversible      | **Plan first** | Always                                      |

### Plan Mode Example

```
You: "Plan a refactor to rename the User model to Account across the codebase."

Claude will:
1. Explore all files that reference "User"
2. List every change needed (schema, repos, services, tests, UI)
3. Show the plan WITHOUT making changes
4. Wait for your approval before touching any file
```

---

## Tips

- Name sessions after the **feature or ticket**, not the date.
- Fork before any refactor you're not 100% sure about.
- Run `/compact` when token usage (shown by `/cost`) gets above 50%.
- CLAUDE.md rules reload automatically in every new and resumed session.
