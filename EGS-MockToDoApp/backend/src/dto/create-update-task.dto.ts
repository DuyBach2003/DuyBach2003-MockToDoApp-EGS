/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsNotEmpty, IsString, Min, Max } from 'class-validator';
export class CreateUpdateTaskDto {
  @IsNotEmpty()
  @IsInt()
  @Min(Number.MIN_SAFE_INTEGER)
  @Max(Number.MAX_SAFE_INTEGER)
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;
}
