/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, Max, IsIn } from 'class-validator';
import { TaskStatus } from 'src/entities/task.entity';
@ApiSchema({
  description:
    'Schema that defines a task that includes its ID.',
})
export class WithID {
  @IsNotEmpty()
  @IsInt()
  @Min(Number.MIN_SAFE_INTEGER)
  @Max(Number.MAX_SAFE_INTEGER)
  @ApiProperty({ example: '1757410217438', description: 'The ID of the task' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Plan weekend trip',
    description: 'The title of the task',
  })
  title: string;
  @ApiProperty({
    example: 'uncompleted',
    description: 'The status of the task, must be either "uncompleted" or "completed".',
    enum: TaskStatus,
  })
  @IsIn(Object.values(TaskStatus), {
    message: 'status must be either "uncompleted" or "completed"',
  })
  status: string;
}
