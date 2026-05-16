# ── Stage 1: install all workspace deps and build ────────────────────────────
FROM node:22-alpine AS builder

RUN corepack enable pnpm

WORKDIR /app

# Copy workspace manifests so pnpm can resolve the graph without all source
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/types/package.json ./packages/types/

RUN pnpm install --frozen-lockfile

# Copy full source (prisma schema needed for codegen)
COPY prisma ./prisma
COPY packages/types ./packages/types
COPY apps/api ./apps/api

# Generate Prisma client and compile TypeScript
RUN pnpm --filter api exec prisma generate
RUN pnpm --filter api build

# ── Stage 2: prune to a standalone deployment bundle ─────────────────────────
FROM node:22-alpine AS deployer

RUN corepack enable pnpm

WORKDIR /app

COPY --from=builder /app .

# pnpm deploy produces a self-contained dir with dereferenced prod deps only
RUN pnpm deploy --filter api --prod /deploy

# ── Stage 3: minimal production image ────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Carry over the standalone bundle
COPY --from=deployer /deploy .

# Prisma schema lives at the repo root; the client expects it for migrations
COPY --from=builder /app/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 3000

# Run pending migrations then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
