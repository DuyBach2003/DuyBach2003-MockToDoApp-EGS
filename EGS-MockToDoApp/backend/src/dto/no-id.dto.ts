import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
@ApiSchema({
  description:
    'Schema that defines the fields used when creating a task in the system.',
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
