import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    // @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createTask(task: CreateTaskDto, user_id: string): Promise<Task> {
    return (
      await this.taskModel.create({
        ...task,
        user: user_id,
      })
    ).populate('user');
  }

  async findAll(): Promise<Task[]> {
    return await this.taskModel.find().exec();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id).populate('user').exec();
  }

  async updateTask(
    task_id: string,
    user_id: string,
    updateData: Partial<UpdateTaskDto> = {}, // Allow partial updates
  ): Promise<Task | null> {
    const task = await this.taskModel
      .findById(task_id)
      .select('_id user isComplete')
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    if (!task.user || task.user.toString() !== user_id) {
      throw new ForbiddenException(
        'You are not authorized to update this task.',
      );
    }

    return this.taskModel
      .findByIdAndUpdate(task_id, updateData, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  removeTask(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }
}
