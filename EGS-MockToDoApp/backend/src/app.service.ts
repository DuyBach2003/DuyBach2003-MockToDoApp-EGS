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

  create(id: number, title: string) {
    const task = this.taskRepository.create({ id, title });
    this.logger.log(`Task ${title} created successfully`);
    return this.taskRepository.save(task);
  }
  async update(id: number, title: string) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      this.logger.error('Task not found');
      throw new NotFoundException('Task not found');
    }
    task.title = title;
    this.logger.log(`Task ${title} updated successfully`);
    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
    this.logger.log(`Task ${id} removed successfully`);
  }
}
