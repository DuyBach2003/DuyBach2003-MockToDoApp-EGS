import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './task.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.appService.findAll();
  }
  @Post()
  async create(@Body() body: { id: number; title: string }): Promise<Task[]> {
    await this.appService.create(body.id, body.title);
    return this.appService.findAll();
  }
  @Patch()
  async update(@Body() body: { id: number; title: string }): Promise<Task[]> {
    await this.appService.update(body.id, body.title);
    return this.appService.findAll();
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Task[]> {
    await this.appService.remove(Number(id));
    return this.appService.findAll();
  }
}
