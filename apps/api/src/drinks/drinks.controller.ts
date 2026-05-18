import { Controller, Get, Param, Query } from '@nestjs/common';
import type { DrinksService } from './drinks.service';

@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.drinksService.findAll(category);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.drinksService.findBySlug(slug);
  }
}
