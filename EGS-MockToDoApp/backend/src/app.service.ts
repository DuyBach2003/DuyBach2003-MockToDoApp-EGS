/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  create(title: string) {
    const task = this.taskRepository.create({ title });
    this.logger.log(`Task named ${title} created successfully`);
    return this.taskRepository.save(task);
  }
  async update(id: number, title: string) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      this.logger.error('Task not found');
      throw new NotFoundException('Task not found');
    }
    task.title = title;
    this.logger.log(`Task named ${title} updated successfully`);
    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      this.logger.error('Task not found');
      throw new NotFoundException('Task not found');
    }
    const deletedTask = await this.taskRepository.delete(id);
    this.logger.log(`Task with id ${id} removed successfully`);
    return deletedTask;
  }
}
