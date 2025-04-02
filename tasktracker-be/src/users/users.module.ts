import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { TasksService } from 'src/tasks/tasks.service';
import { Task, TaskSchema } from 'src/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [UsersService, TasksService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
