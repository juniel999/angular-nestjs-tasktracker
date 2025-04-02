import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/schemas/enums/task-status';

export class CreateTaskDto {
  user_id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional() // Optional so if not provided, it defaults in schema
  status?: TaskStatus;
}
