import { Injectable, NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';

const VALID_CATEGORIES = new Set(['espresso', 'milk', 'filter', 'cold']);

@Injectable()
export class DrinksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(category?: string) {
    const where = category && VALID_CATEGORIES.has(category) ? { category } : undefined;
    return this.prisma.drink.findMany({ where, orderBy: { difficultyRank: 'asc' } });
  }

  async findBySlug(slug: string) {
    const drink = await this.prisma.drink.findUnique({ where: { slug } });
    if (!drink) throw new NotFoundException(`Drink '${slug}' not found`);
    return drink;
  }
}
