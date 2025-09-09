/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumberString } from 'class-validator';
export class RemoveTaskDto {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
