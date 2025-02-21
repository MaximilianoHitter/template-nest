import { Module } from '@nestjs/common';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users/user.repository';
import { Activity } from './activities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository, Activity],
  exports: [UserRepository, Activity],
})
export class DatabaseModule {}
