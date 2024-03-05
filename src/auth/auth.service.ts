import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }
}
