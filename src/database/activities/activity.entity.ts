import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('activities')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity: string; // Nombre de la entidad

  @Column({ type: 'json' })
  anterior: any; // Datos antes del cambio

  @Column({ type: 'json' })
  posterior: any; // Datos después del cambio

  @Column()
  action: string; // 'CREATE' | 'UPDATE' | 'DELETE'

  @CreateDateColumn()
  createdAt: Date;
}
