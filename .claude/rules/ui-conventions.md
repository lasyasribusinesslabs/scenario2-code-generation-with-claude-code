# UI Conventions — SubSync

> Auto-loaded by CLAUDE.md via @import. Applies to all files in src/ui/.

## Component Rules
- Functional components only — no class components
- Every component file exports one default component
- Props typed with explicit interface: `interface <ComponentName>Props { ... }`
- No inline styles — Tailwind utility classes only

## State Management
- Use React Query (`useQuery`, `useMutation`) for all server state
- Local UI state only (open/closed, tab index) goes in `useState`
- No prop drilling beyond 2 levels — use Context or React Query cache

## Loading & Error States
- Every async operation must show a loading state
- Every async operation must handle error state with user-visible message
- Use the shared `<Spinner />` and `<ErrorAlert />` components

## File Naming
- Component files: `PascalCase.tsx`
- Hook files: `useHookName.ts`
- Utility files: `kebab-case.ts`

## Accessibility
- All interactive elements must have accessible labels
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, not `<div onClick>`)
- Color contrast must meet WCAG AA
