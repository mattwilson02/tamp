import { All, Controller, Req, Res } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';

/**
 * Forwards all /api/auth/* requests to Better Auth's handler.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @All('*')
  async handler(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const response = await this.authService.auth.handler(req as unknown as Request);
    res.status(response.status);
    response.headers.forEach((value, key) => res.header(key, value));
    const body = await response.text();
    res.send(body);
  }
}
