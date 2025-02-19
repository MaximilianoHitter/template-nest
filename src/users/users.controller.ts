import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import AuthGuard from 'src/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor() {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Request() req) {
    return {
      user: req.user,
    };
  }
}
