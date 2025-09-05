import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  create(id: number, title: string) {
    const task = this.taskRepository.create({ id, title });
    return this.taskRepository.save(task);
  }
  async update(id: number, title: string) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');

    task.title = title;
    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
  }
}
