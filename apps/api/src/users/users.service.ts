import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.userProfile.findUnique({ where: { userId: id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.userProfile.findUnique({ where: { username } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async follow(followerId: string, followingId: string) {
    return this.prisma.follow.upsert({
      where: { followerId_followingId: { followerId, followingId } },
      create: { followerId, followingId },
      update: {},
    });
  }

  async unfollow(followerId: string, followingId: string) {
    return this.prisma.follow.deleteMany({ where: { followerId, followingId } });
  }
}
