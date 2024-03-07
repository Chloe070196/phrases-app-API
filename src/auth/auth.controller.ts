import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body()
    createUserDto: {
      username: string;
      password: string;
      email: string;
    },
    @Res() res: Response,
  ) {
    const response = await this.usersService.createUser({
      ...createUserDto,
      password: await AuthService.hashPassword(createUserDto.password),
    });
    const newUser = { username: response?.username };
    return res.json(newUser);
  }

  @Post('login')
  async login(
    @Body()
    loginDto: {
      email: string;
      password: string;
    },
    @Res() res: Response,
  ) {
    const secret = process.env.JWT_SECRET;
    if (secret) {
      try {
        const jwt = await this.authService.logIn(
          loginDto.email,
          loginDto.password,
          secret,
        );
        res.json(jwt);
      } catch (e) {
        console.error('error loggin in user: ', e);
      }
    }
  }
}
