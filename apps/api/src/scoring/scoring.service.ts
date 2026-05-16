import { ConflictException, Injectable } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoringService {
  constructor(private readonly prisma: PrismaService) {}

  async submitScore(
    scorerId: string,
    attemptId: string,
    scores: { criterionKey: string; score: number }[]
  ) {
    const existing = await this.prisma.score.findFirst({
      where: { scorerId, attemptId },
    });
    if (existing) throw new ConflictException('You have already scored this attempt');

    await this.prisma.$transaction(async (tx) => {
      await tx.score.create({
        data: {
          scorerId,
          attemptId,
          criteria: {
            create: scores.map((s) => ({
              criterionKey: s.criterionKey,
              value: s.score,
            })),
          },
        },
      });

      // Recompute community score as average of all criterion scores
      const allCriteria = await tx.scoreCriterion.findMany({
        where: { score: { attemptId } },
        select: { value: true },
      });
      const avg = allCriteria.reduce((sum, c) => sum + c.value, 0) / allCriteria.length;

      await tx.attempt.update({
        where: { id: attemptId },
        data: { communityScore: Math.round(avg * 10) / 10 },
      });
    });
  }

  getCriteriaForDrink(drinkSlug: string) {
    // Dynamically returns scoring criteria per drink slug
    return { drinkSlug };
  }
}
