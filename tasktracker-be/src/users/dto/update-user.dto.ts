import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  name: string;
  username: string;
  password: string;

  @IsEmail()
  email: string;
}
