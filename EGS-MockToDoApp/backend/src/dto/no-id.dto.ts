/* eslint-disable prettier/prettier */
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {IsNotEmpty, IsString } from 'class-validator';
@ApiSchema({
  description:
    'Schema that defines a task without an ID.',
})
export class NoID {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Plan weekend trip',
    description: 'The title of the task',
  })
  title: string;
}
