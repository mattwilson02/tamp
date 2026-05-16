import { All, Controller, Req, Res } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';
import type { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

/**
 * Forwards all /api/auth/* requests to Better Auth's handler.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @All('*')
  async handler(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const response = await this.authService.auth.handler(req as unknown as Request);
    res.status(response.status);
    for (const [key, value] of response.headers.entries()) res.header(key, value);
    const body = await response.text();
    res.send(body);
  }
}
