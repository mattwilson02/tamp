# ADR-0001: Instantiate Better Auth inside a NestJS service

**Status:** Accepted  
**Date:** 2026-05-16

## Context

Better Auth's own documentation shows a module-level singleton pattern:

```ts
// auth.ts
export const auth = betterAuth({
  database: prismaAdapter(new PrismaClient(), { provider: 'postgresql' }),
})
```

We use NestJS with a managed `PrismaService` (connects on `onModuleInit`, disconnects on `onModuleDestroy`) and `ConfigService` for environment variables.

## Decision

Instantiate `betterAuth(...)` inside the `AuthService` constructor, injecting `PrismaService` and `ConfigService` via NestJS DI.

## Consequences

**Why not the module-level singleton:**

1. **Prisma lifecycle** — a `new PrismaClient()` at module load time is a separate instance from the NestJS-managed one. In e2e tests, `app.close()` disconnects the NestJS client but leaves the auth client open. Jest hangs on open handles, and subsequent test files get connection errors.

2. **Env var timing** — module-level code runs on first import, before `ConfigModule` has resolved the `.env` file. `process.env.BETTER_AUTH_SECRET` can be `undefined` at that point.

**Trade-off accepted:**

The `auth` object is only accessible through DI (not importable as a bare constant), which is a minor inconvenience. Any code that needs the auth handler — controllers, guards, middleware — must receive `AuthService` via injection. This is idiomatic NestJS and not a real constraint.
