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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('task')
@Controller({ version: '1' })
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}
  @ApiResponse({
    status: 200,
    description: 'The found tasks.',
    type: CUDTaskDto,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  findAll(): Promise<Task[]> {
    this.logger.log(`GET / called`);
    return this.appService.findAll();
  }
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully created.',
    type: CUDTaskDto,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CUDTaskDto })
  async create(@Body(new ValidationPipe()) body: CUDTaskDto): Promise<Task[]> {
    await this.appService.create(body.id, body.title);
    this.logger.log('POST / called with body:', JSON.stringify(body));
    return this.appService.findAll();
  }
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    type: CUDTaskDto,
  })
  @Patch()
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiBody({ type: CUDTaskDto })
  async update(@Body(new ValidationPipe()) body: CUDTaskDto): Promise<Task[]> {
    await this.appService.update(body.id, body.title);
    this.logger.log('PATCH / called with body:', JSON.stringify(body));
    return this.appService.findAll();
  }
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
    type: CUDTaskDto,
  })
  @Delete()
  @ApiOperation({ summary: 'Delete all tasks' })
  @ApiBody({ type: CUDTaskDto })
  async remove(@Body(new ValidationPipe()) body: CUDTaskDto): Promise<Task[]> {
    await this.appService.remove(Number(body.id), body.title);
    this.logger.log('DELETE / called with body:', JSON.stringify(body));
    return this.appService.findAll();
  }
}
