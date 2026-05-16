import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  readonly auth: ReturnType<typeof betterAuth>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.auth = betterAuth({
      database: prismaAdapter(this.prisma, { provider: 'postgresql' }),
      secret: this.config.getOrThrow('BETTER_AUTH_SECRET'),
      baseURL: this.config.getOrThrow('API_BASE_URL'),
      emailAndPassword: { enabled: true },
      session: {
        expiresIn: 60 * 60 * 24 * 30, // 30 days
        updateAge: 60 * 60 * 24,       // refresh if > 1 day old
      },
    });
  }
}
