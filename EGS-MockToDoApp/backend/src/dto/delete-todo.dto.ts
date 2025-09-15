import { ApiProperty, ApiSchema } from '@nestjs/swagger';
@ApiSchema({
  description:
    'Schema that defines the fields used when deleting a task in the system.',
})
export class DeleteTodoResponseDto {
  @ApiProperty({
    example: [],
    description:
      'Raw database response returned by the underlying database driver.',
  })
  raw: any;

  @ApiProperty({
    example: 1,
    description: 'Number of records affected by the delete operation. ',
  })
  affected: number;
}
