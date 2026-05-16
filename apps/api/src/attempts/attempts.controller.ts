import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { AttemptsService } from './attempts.service';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Post()
  create(@Body() body: Parameters<AttemptsService['create']>[1]) {
    // TODO: extract userId from session
    return this.attemptsService.create('current-user-id', body);
  }

  @Get('me')
  myAttempts() {
    return this.attemptsService.findByUser('current-user-id');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attemptsService.findById(id);
  }
}
