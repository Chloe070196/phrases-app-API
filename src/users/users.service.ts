import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';

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
}

// TODO: add createUser
