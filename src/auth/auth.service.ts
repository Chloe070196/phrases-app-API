import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  async logIn(email: string, password: string, secret: string): Promise<any> {
    const user = await this.usersService.getUserBy({ email });
    if (!user) {
      throw new Error('user not found');
    }
    if (user) {
      const verified = await bcrypt.compare(password, user.password);
      if (verified) {
        const token = jwt.sign(
          { username: user.username, id: user.id },
          secret,
        );
        return { token, username: user.username, id: user.id };
      }
    }
    throw new Error('unauthorised');
  }
}
