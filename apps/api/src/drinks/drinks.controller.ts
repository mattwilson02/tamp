import { Controller, Get, Param } from '@nestjs/common';
import type { DrinksService } from './drinks.service';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  findAll() {
    return this.drinksService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.drinksService.findBySlug(slug);
  }
}
