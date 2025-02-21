import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EntitySubscriber } from './entity.suscriber';
import { Activity } from 'src/database/activities/activity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule],
  providers: [EntitySubscriber],
  exports: [EntitySubscriber],
})
@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  providers: [EntitySubscriber],
  exports: [EntitySubscriber],
})
export class ActivitiesModule {}
