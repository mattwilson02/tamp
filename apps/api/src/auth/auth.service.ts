import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import type { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  // Cast required: Auth<SpecificConfig> isn't assignable to Auth<BetterAuthOptions>
  // due to DBAdapter contravariance — safe because we only use the public API surface.
  readonly auth: ReturnType<typeof betterAuth>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {
    this.auth = betterAuth({
      database: prismaAdapter(this.prisma, { provider: 'postgresql' }),
      secret: this.config.getOrThrow('BETTER_AUTH_SECRET'),
      baseURL: this.config.getOrThrow('API_BASE_URL'),
      emailAndPassword: { enabled: true },
      session: {
        expiresIn: 60 * 60 * 24 * 30,
        updateAge: 60 * 60 * 24,
      },
    }) as ReturnType<typeof betterAuth>;
  }
}
