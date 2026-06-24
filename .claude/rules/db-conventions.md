---
globs: ["src/db/**", "prisma/**"]
---
# Database Conventions
## ORM
- Use Prisma exclusively, no raw SQL except in migrations.
- All DB access through repositories in src/db/repositories/.
## Repository Pattern
export async function findSubscriptionById(id: string) {
  return prisma.subscription.findUniqueOrThrow({ where: { id } });
}
## Rules
- Never query the DB from a controller or service directly.
- Repository functions are the only layer that imports prisma.
- Always use findUniqueOrThrow not findUnique so missing records throw.
- Run npm run db:migrate after any schema change.
- Never expose Prisma model objects directly in API responses, map to DTOs.
## Naming
- Repository files: <model>.repository.ts
- Function names: verb + noun e.g. findSubscriptionById, cancelSubscription
