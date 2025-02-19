import { Module } from '@nestjs/common';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
