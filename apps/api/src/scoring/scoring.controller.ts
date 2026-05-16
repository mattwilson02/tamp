import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { ScoringService } from './scoring.service';

@Controller('scoring')
export class ScoringController {
  constructor(private readonly scoringService: ScoringService) {}

  @Get('criteria/:drinkSlug')
  getCriteria(@Param('drinkSlug') drinkSlug: string) {
    return this.scoringService.getCriteriaForDrink(drinkSlug);
  }

  @Post('attempts/:attemptId')
  score(
    @Param('attemptId') attemptId: string,
    @Body() body: { scores: { criterionKey: string; score: number }[] }
  ) {
    // TODO: extract scorerId from session
    return this.scoringService.submitScore('current-user-id', attemptId, body.scores);
  }
}
