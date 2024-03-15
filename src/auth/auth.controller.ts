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
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoggedInUser, Username } from 'src/entities';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'creates (registers) a new user' })
  @ApiResponse({
    status: 201,
    description: 'the username of the created user',
    type: Username,
  })
  @Post('register')
  async register(
    @Body()
    createUserDto: Prisma.UserCreateInput,
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

  @ApiOperation({ summary: 'logs in a user' })
  @ApiResponse({
    status: 201,
    description: 'the username and id of the user, and a jwt',
    type: LoggedInUser,
  })
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
