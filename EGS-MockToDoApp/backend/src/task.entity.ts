import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
}
