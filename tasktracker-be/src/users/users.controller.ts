import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(@Body() user: UpdateUserDto, @Param('id') id: string) {
    return this.userService.update(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tasks')
  getTasks(@Request() req) {
    console.log(req.user);
    return this.userService.getUserTasks(req.user.user_id);
  }
}
