import { execSync } from 'node:child_process';

export default async function globalSetup() {
  // Push schema to test DB without migration history
  execSync('pnpm prisma db push --force-reset', {
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
    stdio: 'inherit',
  });
}
