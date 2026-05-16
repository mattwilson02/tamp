import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DrinksModule } from './drinks/drinks.module';
import { AttemptsModule } from './attempts/attempts.module';
import { FeedModule } from './feed/feed.module';
import { ScoringModule } from './scoring/scoring.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DrinksModule,
    AttemptsModule,
    FeedModule,
    ScoringModule,
    StorageModule,
  ],
})
export class AppModule {}
