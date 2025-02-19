import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    /* private readonly configService: ConfigService,
    private readonly cryptService: CryptService,
    @Inject('CACHE_MANAGER') private readonly cache: Cache, */
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    //validar si el token nunca vino en el header
    if (token == null) {
      throw new HttpException('Token inválido 1', HttpStatus.UNAUTHORIZED);
    }
    const tokenBearerLess = token.replace('Bearer ', '');

    request.user = await this.authService.checkToken(tokenBearerLess);
    return true;
  }
}
