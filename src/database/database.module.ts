import { Module } from '@nestjs/common';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users/user.repository';
import { Log } from './logs/log.entity';
import { LogRepository } from './logs/log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Log])],
  providers: [UserRepository, LogRepository],
  exports: [UserRepository, LogRepository],
})
export class DatabaseModule {}
