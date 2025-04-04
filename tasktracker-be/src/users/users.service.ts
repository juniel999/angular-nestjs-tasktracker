import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    return await this.userModel.findOne({ username }).exec();
  }

  async create(user: CreateUserDto): Promise<User> {
    if (await this.userExists(user.username)) {
      throw new ConflictException('Username already exists');
    }

    user.password = await this.hashPassword(user.password);
    return await this.userModel.create(user);
  }

  async update(
    user: UpdateUserDto,
    id: string,
  ): Promise<Omit<User, 'password'>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID'); //  Prevents invalid ObjectId errors
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          ...user,
          password: user.password
            ? await this.hashPassword(user.password)
            : undefined, //  Hash password only if provided
        },
        { new: true, runValidators: true }, //  Returns the updated document and enforces schema validation
      )
      .lean()
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found.'); //  Throws a 404 error if the user is not found
    }

    const { password, ...result } = updatedUser;
    return result;
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    return await this.taskModel.find({ user: userId }).exec();
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async userExists(username: string): Promise<boolean> {
    return !!(await this.userModel.exists({ username }).lean());
  }
}
