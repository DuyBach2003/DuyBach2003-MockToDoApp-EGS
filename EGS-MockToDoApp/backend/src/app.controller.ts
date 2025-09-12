/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './task.entity';
import { GetUpdateDeleteDto } from './dto/update-delete-task.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDto } from './dto/create-task.dto';
@ApiTags('task')
@Controller({ path: 'tasks', version: '1' })
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) { }
  @ApiResponse({
    status: 200,
    description: 'The found tasks.',
    type: GetUpdateDeleteDto,
    isArray: true,
  })
  @ApiResponse({ status: 500, description: 'Unable to retrieve the tasks.' })
  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  findAll(): Promise<Task[]> {
    this.logger.log(`GET / called`);
    return this.appService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: CreateDto,
  })
  @ApiResponse({ status: 500, description: 'Unable to create a new task.' })
  @ApiResponse({
    status: 400,
    description: 'The format of the body is not appropritate.',
    schema: {
      example: {
        message: [
          "title should not be empty",
        ],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateDto })
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) body: CreateDto): Promise<Task> {
    await this.appService.create(body.title);
    this.logger.log('POST / called with body:', JSON.stringify(body));
    return body;
  }

  @ApiResponse({ status: 500, description: 'Unable to update the task.' })
  @ApiResponse({
    status: 400,
    description: 'The format of the body is not appropritate.',
    schema: {
      example: {
        message: [
          "id must not be greater than 9007199254740991",
          "id must not be less than -9007199254740991",
          "id must be an integer number",
          "id should not be empty",
        ],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
    @ApiResponse({
    status: 404,
    description: 'The task can not be found.',
    schema: {
      example: {
        message: "Task not found",
        error: "Not Found",
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    type: GetUpdateDeleteDto,
  })
  @Patch()
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiBody({ type: GetUpdateDeleteDto })
  async update(
    @Body(new ValidationPipe()) body: GetUpdateDeleteDto,
  ): Promise<Task> {
    await this.appService.update(body.id, body.title);
    this.logger.log('PATCH / called with body:', JSON.stringify(body));
    return body;
  }

  @ApiResponse({ status: 500, description: 'Unable to delete the task.' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
    type: GetUpdateDeleteDto,
  })
  @ApiResponse({
    status: 400,
    description: 'The format of the body is not appropritate.',
    schema: {
      example: {
        message: [
          "id must not be greater than 9007199254740991",
          "id must not be less than -9007199254740991",
          "id must be an integer number",
          "id should not be empty",
        ],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
  @Delete()
  @ApiOperation({ summary: 'Delete a task' })
  @ApiBody({ type: GetUpdateDeleteDto })
  async remove(
    @Body(new ValidationPipe()) body: GetUpdateDeleteDto,
  ): Promise<Task> {
    await this.appService.remove(Number(body.id), body.title);
    this.logger.log('DELETE / called with body:', JSON.stringify(body));
    return body;
  }
}
