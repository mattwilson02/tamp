import { Controller, Post, Req } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import type { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload/attempt-photo')
  async uploadAttemptPhoto(@Req() req: FastifyRequest) {
    const data = await req.file();
    if (!data) throw new Error('No file provided');
    const buffer = await data.toBuffer();
    const url = await this.storageService.uploadAttemptPhoto(
      'current-user-id', // TODO: from session
      buffer,
      data.mimetype
    );
    return { url };
  }
}
