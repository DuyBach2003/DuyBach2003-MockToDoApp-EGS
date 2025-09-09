/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './task.entity';
import { CreateUpdateTaskDto } from './dto/create-update-task.dto';
import { RemoveTaskDto } from './dto/remove-task.dto';

@Controller({ version: '1' })
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): Promise<Task[]> {
    this.logger.log(`GET / called`);
    return this.appService.findAll();
  }
  @Post()
  async create(
    @Body(new ValidationPipe()) body: CreateUpdateTaskDto,
  ): Promise<Task[]> {
    await this.appService.create(body.id, body.title);
    this.logger.log(`POST / called with body: ${body}`);
    return this.appService.findAll();
  }
  @Patch()
  async update(
    @Body(new ValidationPipe()) body: CreateUpdateTaskDto,
  ): Promise<Task[]> {
    await this.appService.update(body.id, body.title);
    this.logger.log(`PATCH / called with body: ${body}`);
    return this.appService.findAll();
  }
  @Delete(':id')
  async remove(
    @Param(new ValidationPipe()) params: RemoveTaskDto,
  ): Promise<Task[]> {
    await this.appService.remove(Number(params.id));
    this.logger.log(`DELETE / called with id: ${params.id}`);
    return this.appService.findAll();
  }
}
