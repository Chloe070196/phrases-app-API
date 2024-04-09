import * as jwt from 'jsonwebtoken';
import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
@Controller('users')
export class UsersController {
  @Get('/me')
  async getSelf(@Headers('authorization') authorization?: string) {
    const secret = process.env.JWT_SECRET;
    const token = authorization?.substring('Bearer '.length).trim();

    if (!secret) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!token) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const payload = jwt.verify(token, secret) as jwt.JwtPayload;
    const user = { id: payload.id, username: payload.username };
    return user;
  }
}
