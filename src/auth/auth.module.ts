import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CryptModule } from 'src/crypt/crypt.module';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [CryptModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {
  constructor(private dataSource: DataSource) {}
}
