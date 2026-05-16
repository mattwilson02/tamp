import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttemptsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: {
    drinkId: string;
    photoUrls: string[];
    notes?: string;
    grindSetting?: string;
    doseGrams?: number;
    yieldGrams?: number;
    isPublic?: boolean;
  }) {
    return this.prisma.attempt.create({
      data: {
        userId,
        drinkId: dto.drinkId,
        photoUrls: dto.photoUrls,
        notes: dto.notes,
        grindSetting: dto.grindSetting,
        doseGrams: dto.doseGrams,
        yieldGrams: dto.yieldGrams,
        isPublic: dto.isPublic ?? true,
      },
    });
  }

  findByUser(userId: string) {
    return this.prisma.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const attempt = await this.prisma.attempt.findUnique({ where: { id } });
    if (!attempt) throw new NotFoundException('Attempt not found');
    return attempt;
  }

  findByDrink(drinkId: string, userId: string) {
    return this.prisma.attempt.findMany({
      where: { drinkId, userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
