import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsString, Matches } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNumber()
  created_by: number;

  @IsNumber()
  project_id: number;

  @IsString()
  @Matches(/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/, {
    message: 'ExpirationDate date format invalid!',
  })
  due_date: string;

  @IsNumber()
  worker_user_id: number;

  @IsString()
  status: string;

  @IsBoolean()
  done_at: boolean;
}
