/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './entities/task.entity';
import { WithID } from './dto/with-id.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NoID } from './dto/no-id.dto';
import { DeleteTodoResponseDto } from './dto/delete-todo.dto';
import { DeleteResult } from 'typeorm';
@ApiTags('task')
@Controller({ path: 'tasks', version: '1' })
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) { }
  @ApiResponse({
    status: 200,
    description: 'The found tasks.',
    type: WithID,
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
    type: WithID,
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
  @ApiBody({ type: NoID })
  @HttpCode(201)
  async create(@Body(new ValidationPipe()) body: NoID): Promise<Task> {
    const newTask = await this.appService.create(body.title);
    this.logger.log('POST / called with body:', JSON.stringify(newTask));
    return {
      id: newTask.id,
      title: newTask.title,
      status: newTask.status
    };
  }

  @ApiResponse({ status: 500, description: 'Unable to update the task.' })
  @ApiResponse({
    status: 400,
    description: 'The format of the body is not appropritate.',
    schema: {
      example: {
        message: [
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
    type: WithID,
  })
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing task' })
  async update(
    @Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) body: NoID,
  ): Promise<Task> {
    const updatedTask = await this.appService.update(id, body.title);
    this.logger.log('PATCH / called with body:', JSON.stringify(updatedTask));
    return { id: updatedTask.id, title: updatedTask.title, status: updatedTask.status};
  }

  @ApiResponse({ status: 500, description: 'Unable to update the task status.' })
  @ApiResponse({
    status: 400,
    description: 'The format of the body is not appropritate.',
    schema: {
      example: {
        message: [
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
    description: 'The task status has been successfully updated.',
    type: WithID,
  })
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of an existing task' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    const updatedTask = await this.appService.updateStatus(id);
    this.logger.log('PATCH / called with body:', JSON.stringify(updatedTask));
    return { id: updatedTask.id, title: updatedTask.title, status: updatedTask.status };
  }

  @ApiResponse({ status: 500, description: 'Unable to delete the task.' })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
    type: DeleteTodoResponseDto,
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
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    const deletedTask = await this.appService.remove(id);
    this.logger.log('DELETE / called with message:', JSON.stringify(deletedTask));
    return deletedTask;
  }
}
