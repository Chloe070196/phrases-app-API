import {
  Controller,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
    res.status(201).json(newUser);
    return res;
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
        const response = await this.authService.logIn(
          loginDto.email,
          loginDto.password,
          secret,
        );
        res.status(201).json(response);
        return res;
      } catch (e) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
  }
}
