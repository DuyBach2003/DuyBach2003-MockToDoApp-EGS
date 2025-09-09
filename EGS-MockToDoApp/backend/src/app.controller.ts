/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './task.entity';
import { CUDTaskDto } from './dto/create-update-delete-task.dto';

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
  async create(@Body(new ValidationPipe()) body: CUDTaskDto): Promise<Task[]> {
    await this.appService.create(body.id, body.title);
    this.logger.log('POST / called with body:', JSON.stringify(body));
    return this.appService.findAll();
  }
  @Patch()
  async update(@Body(new ValidationPipe()) body: CUDTaskDto): Promise<Task[]> {
    await this.appService.update(body.id, body.title);
    this.logger.log('PATCH / called with body:', JSON.stringify(body));
    return this.appService.findAll();
  }
  @Delete()
  async remove(@Body(new ValidationPipe()) body: CUDTaskDto): Promise<Task[]> {
    await this.appService.remove(Number(body.id), body.title);
    this.logger.log('DELETE / called with body:', JSON.stringify(body));
    return this.appService.findAll();
  }
}
