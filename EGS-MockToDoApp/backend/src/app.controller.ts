/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './task.entity';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): Promise<Task[]> {
    this.logger.log(`GET / called`);
    return this.appService.findAll();
  }
  @Post()
  async create(@Body() body: { id: number; title: string }): Promise<Task[]> {
    await this.appService.create(body.id, body.title);
    this.logger.log(`POST / called with body: ${body}`);
    return this.appService.findAll();
  }
  @Patch()
  async update(@Body() body: { id: number; title: string }): Promise<Task[]> {
    await this.appService.update(body.id, body.title);
    this.logger.log(`PATCH / called with body: ${body}`);
    return this.appService.findAll();
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Task[]> {
    await this.appService.remove(Number(id));
    this.logger.log(`DELETE / called with id: ${id}`);
    return this.appService.findAll();
  }
}
