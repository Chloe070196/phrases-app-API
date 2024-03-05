import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body()
    createUserDto: {
      username: string;
      password: string;
      email: string;
    },
  ) {
    await this.usersService.createUser({
      ...createUserDto,
      password: await AuthService.hashPassword(createUserDto.password),
    });
    return `created user with username: ${createUserDto.username}`;
  }
}

// TODO: add login route
