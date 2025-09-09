/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, Min, Max, IsNumberString } from 'class-validator';
export class RemoveTaskDto {
  @IsNotEmpty()
  @IsNumberString()
  //   @Min(Number.MIN_SAFE_INTEGER)
  //   @Max(Number.MAX_SAFE_INTEGER)
  id: string;
}
