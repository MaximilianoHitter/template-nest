import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/database/users/user.repository';
import * as argon2 from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/database/users/user.entity';
import { Cache } from 'cache-manager';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    @Inject('CACHE_MANAGER') private cache: Cache,
  ) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const user = await this.userRepository.findByEmail(authDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // const hashed_password = await argon2.hash(authDto.password);
    if (!(await argon2.verify(user.password, authDto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token: string = this.authService.getToken(user.id);
    //aca se lo debería cargar en caché
    const nombreCached: string = `user-${user.id}`;
    await this.cache.set(nombreCached, token, 3600 * 1000);
    const user_clean = user;
    delete user_clean.password;
    return {
      token: token,
      user: user_clean,
      status: HttpStatus.OK,
    };
  }

  @Get('logout')
  async logout(@Body() req) {
    //hay que eliminarlo del cache
    await this.cache.del(`user-${req.user.id}`);
    return {
      message: 'Logged out',
      status: HttpStatus.OK,
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userRepository.findByEmail(registerDto.email);
    if (user) {
      throw new UnprocessableEntityException(
        'Other user has register this email, please select another',
      );
    } else {
      const data: Omit<User, 'id'> = {
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        email: registerDto.email,
        password: await argon2.hash(registerDto.password),
        isActive: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const new_user = await this.userRepository.createUser(data);
      const user_clean = new_user;
      delete user_clean.password;
      //obtener token
      const token: string = this.authService.getToken(new_user.id);
      return {
        token: token,
        user: user_clean,
        status: HttpStatus.OK,
      };
    }
  }
}
