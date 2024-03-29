import { Injectable } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserphrasesService {
  constructor(private prismaService: PrismaService) {}

  async create(
    timesSeen: number,
    timesAttempted: number,
    timesUsed: number,
    status: Status,
    userId: number,
    phraseId: number,
  ) {
    return await this.prismaService.userPhrase.create({
      data: {
        timesAttempted,
        timesSeen,
        timesUsed,
        status,
        phrase: {
          connect: {
            id: phraseId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: {
          select: { username: true },
        },
        phrase: true,
      },
    });
  }

  async findMany(userId: number, category: string | undefined) {
    if (!category) {
      return await this.prismaService.userPhrase.findMany({
        where: { userId },
        include: {
          user: {
            select: { username: true },
          },
          phrase: true,
        },
      });
    }
    return await this.prismaService.userPhrase.findMany({
      where: {
        AND: [
          { userId },
          {
            phrase: {
              category,
            },
          },
        ],
      },
      include: {
        user: {
          select: { username: true },
        },
        phrase: true,
      },
    });
  }

  async update(params: {
    where: Prisma.UserPhraseWhereUniqueInput;
    data: Prisma.UserPhraseUpdateInput;
  }) {
    const { where, data } = params;
    return await this.prismaService.userPhrase.update({ data, where });
  }
}
