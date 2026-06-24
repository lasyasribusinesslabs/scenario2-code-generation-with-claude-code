# DB Conventions — SubSync

> Auto-loaded by CLAUDE.md via @import. Applies to all files in src/db/.

## ORM
- Use Prisma for all database access
- No raw SQL queries outside of migration files
- All DB logic lives in repository files under `src/db/repositories/`

## Repository Pattern
- One repository file per model: `src/db/repositories/<Model>Repository.ts`
- Repositories export async functions only — no classes
- Pass `prisma` client as a parameter (never import globally in repositories)

## Data Integrity
- Transactions required for any operation touching 2+ tables
- Use `prisma.$transaction([...])` for atomic operations
- Never delete records — use soft delete with `deletedAt: DateTime?`

## Schema Rules
- Every model must have: `id`, `createdAt`, `updatedAt`, `deletedAt`
- Foreign keys must have a corresponding Prisma `@relation`
- Add `@@index` for every foreign key field

## Migrations
- Run `npm run db:migrate` after any schema change
- Never edit migration files after they've been committed
- Seed file lives at `prisma/seed.ts`
