import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CryptService } from 'src/crypt/crypt.service';
import { User } from 'src/database/users/user.entity';
import { UserRepository } from 'src/database/users/user.repository';
import { Token } from 'src/models/token.class';

@Injectable()
export class AuthService {
  constructor(
    private readonly cryptService: CryptService,
    private readonly configService: ConfigService,
    @Inject('CACHE_MANAGER') private readonly cache: Cache,
    private readonly userRepository: UserRepository,
  ) {}

  getToken(user_id: number): string {
    const token: Token = {
      header: {
        app_name: this.configService.get('APP_NAME'),
      },
      payload: {
        user_id,
        expires_in: Date.now(),
      },
      signature: {
        secret: this.configService.get('SECRET_CRYPT'),
      },
    };
    return this.cryptService.encrypt(JSON.stringify(token));
  }

  async checkToken(token: string): Promise<Omit<User, 'password'>> {
    const tokenDecrypted = JSON.parse(this.cryptService.decrypt(token));
    //validar si el app_name es correcto
    if (tokenDecrypted.header.app_name != this.configService.get('APP_NAME')) {
      throw new HttpException('Token inválido 2', HttpStatus.UNAUTHORIZED);
    }
    //validar si el secret_crypt es correcto
    if (
      tokenDecrypted.signature.secret != this.configService.get('SECRET_CRYPT')
    ) {
      throw new HttpException('Token inválido 3', HttpStatus.UNAUTHORIZED);
    }
    //validar el expires in
    if (Date.now() < tokenDecrypted.payload.expires_in) {
      throw new HttpException('Token expirado 4', HttpStatus.UNAUTHORIZED);
    }
    //validar si el token está en cache
    const tokenCached = await this.cache.get(
      `user-${tokenDecrypted.payload.user_id}`,
    );
    if (tokenCached == null) {
      throw new HttpException('Token inválido 5', HttpStatus.UNAUTHORIZED);
    }
    const user = this.userRepository.findById(tokenDecrypted.payload.user_id);
    if (user == null) {
      throw new HttpException('Token inválido 6', HttpStatus.UNAUTHORIZED);
    }
    delete (await user).password;
    return user;
  }
}
