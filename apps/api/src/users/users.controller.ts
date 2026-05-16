import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  getProfile(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post(':id/follow')
  follow(@Param('id') id: string) {
    // TODO: extract current user from session
    return this.usersService.follow('current-user-id', id);
  }

  @Delete(':id/follow')
  unfollow(@Param('id') id: string) {
    return this.usersService.unfollow('current-user-id', id);
  }
}
