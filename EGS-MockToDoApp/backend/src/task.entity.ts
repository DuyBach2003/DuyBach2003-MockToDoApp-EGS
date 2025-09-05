import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('todos')
export class Task {
  @PrimaryColumn({ type: 'bigint' })
  id: number;
  @Column()
  title: string;
}
