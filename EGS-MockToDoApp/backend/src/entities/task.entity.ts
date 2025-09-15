/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export enum TaskStatus {
  UNCOMPLETED = 'uncompleted',
  COMPLETED = 'completed',
}
@Entity('todos')
export class Task {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  title: string;
  @Column({type: 'enum', enum: TaskStatus, default: TaskStatus.UNCOMPLETED})
  status?: string;
}
