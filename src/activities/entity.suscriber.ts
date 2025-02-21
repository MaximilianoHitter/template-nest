import { Injectable } from '@nestjs/common';
import { Activity } from 'src/database/activities/activity.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@Injectable()
@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {
  constructor() {
    console.log('EntitySubscriber creado');
  }

  beforeUpdate(event: UpdateEvent<any>) {
    event.metadata.connection.getRepository(Activity).save({
      entity: event.metadata.tableName,
      anterior: event.databaseEntity,
      posterior: event.entity,
      action: 'UPDATE',
    });
  }

  afterInsert(event: InsertEvent<any>) {
    console.log('afterInsert');
    event.manager.getRepository(Activity).save({
      entity: event.metadata.tableName,
      anterior: {},
      posterior: event.entity,
      action: 'CREATE',
    });
  }
}
