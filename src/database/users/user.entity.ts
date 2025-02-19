import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  updated_at: Date;

  @Column()
  created_at: Date;
}
