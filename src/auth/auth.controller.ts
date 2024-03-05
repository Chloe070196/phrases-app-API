import { Controller, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body()
    loginDto: {
      email: string;
      password: string;
    },
  ) {
    const secret = process.env.JWT_SECRET;
    if (secret) {
      try {
        const jwt = await this.authService.logIn(
          loginDto.email,
          loginDto.password,
          secret,
        );
        return jwt;
      } catch (e) {
        console.error('error log in user: ', e);
      }
    }
  }
}
