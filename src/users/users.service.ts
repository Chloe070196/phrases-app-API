import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// export class User implements PrismaService {}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }
  async getUserBy(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  async createUser(
    UserCreateInput: Prisma.UserCreateInput,
  ): Promise<User | null> {
    UserCreateInput.password = await bcrypt.hash(UserCreateInput.password, 8);
    return this.prisma.user.create({ data: UserCreateInput });
  }
}
