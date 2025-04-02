import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() task: CreateTaskDto, @Request() req) {
    return this.tasksService.createTask(task, req.user.user_id);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() task: UpdateTaskDto, @Request() req) {
    return this.tasksService.updateTask(id, req.user.user_id, task);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.removeTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/complete')
  toggleComplete(
    @Param('id') task_id: string,
    @Request() req,
    @Body() task: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(task_id, req.user.user_id), task;
  }
}
