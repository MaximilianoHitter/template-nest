import {
  Controller,
  Get,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import AuthGuard from 'src/auth/guard/auth.guard';

@Controller('users')
export class UsersController {
  constructor() {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Request() req) {
    // throw new UnauthorizedException('error de prueba');
    return {
      user: req.user,
    };
  }

  @Get('mei')
  @UseGuards(AuthGuard)
  mei(@Request() req) {
    throw new Error('error de prueba');
    return {
      user: req.user,
    };
  }
}
