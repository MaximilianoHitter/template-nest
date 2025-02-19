import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as CryptoJs from 'crypto-js';

@Injectable()
export class CryptService {
  constructor(private readonly configService: ConfigService) {}

  encrypt(text: string): string {
    return CryptoJs.AES.encrypt(
      text,
      this.configService.get('SECRET_CRYPT'),
    ).toString();
  }

  decrypt(encriptedText: string): string {
    const bytes = CryptoJs.AES.decrypt(
      encriptedText,
      this.configService.get('SECRET_CRYPT'),
    );
    return bytes.toString(CryptoJs.enc.Utf8);
  }
}
