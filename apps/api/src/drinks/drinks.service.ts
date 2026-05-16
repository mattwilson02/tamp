import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DrinksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.drink.findMany({ orderBy: { difficultyRank: 'asc' } });
  }

  async findBySlug(slug: string) {
    const drink = await this.prisma.drink.findUnique({ where: { slug } });
    if (!drink) throw new NotFoundException(`Drink '${slug}' not found`);
    return drink;
  }
}
