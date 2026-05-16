import { Controller, Get, Query } from '@nestjs/common';
import type { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  following(@Query('cursor') cursor?: string, @Query('limit') limit?: string) {
    // TODO: extract userId from session
    return this.feedService.getFollowingFeed(
      'current-user-id',
      cursor,
      limit ? Number(limit) : undefined
    );
  }

  @Get('discover')
  discover(@Query('cursor') cursor?: string, @Query('limit') limit?: string) {
    return this.feedService.getDiscoverFeed(cursor, limit ? Number(limit) : undefined);
  }
}
