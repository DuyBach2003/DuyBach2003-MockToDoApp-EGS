import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';
@ApiSchema({
  description:
    'Schema that defines the fields used when updating or deleting a task in the system.',
})
export class GetUpdateDeleteDto {
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
}
