import { Injectable } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';

const DEFAULT_PAGE_SIZE = 20;

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async getFollowingFeed(userId: string, cursor?: string, limit = DEFAULT_PAGE_SIZE) {
    const follows = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    const followingIds = follows.map((f) => f.followingId);

    const items = await this.prisma.attempt.findMany({
      where: {
        userId: { in: followingIds },
        isPublic: true,
        ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
      include: {
        user: { include: { profile: true } },
        drink: true,
        _count: { select: { likes: true, comments: true } },
      },
    });

    const hasMore = items.length > limit;
    const page = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? page[page.length - 1].createdAt.toISOString() : null;

    return { items: page, nextCursor, hasMore };
  }

  async getDiscoverFeed(cursor?: string, limit = DEFAULT_PAGE_SIZE) {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const items = await this.prisma.attempt.findMany({
      where: {
        isPublic: true,
        createdAt: { gte: oneWeekAgo },
        ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
      },
      orderBy: [{ communityScore: 'desc' }, { createdAt: 'desc' }],
      take: limit + 1,
      include: {
        user: { include: { profile: true } },
        drink: true,
        _count: { select: { likes: true, comments: true } },
      },
    });

    const hasMore = items.length > limit;
    const page = hasMore ? items.slice(0, limit) : items;
    const nextCursor = hasMore ? page[page.length - 1].createdAt.toISOString() : null;

    return { items: page, nextCursor, hasMore };
  }
}
