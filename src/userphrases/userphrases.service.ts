import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserphrasesService {
  constructor(private prismaService: PrismaService) {}

  async create(userPhrase: Prisma.UserPhraseCreateInput) {
    return await this.prismaService.userPhrase.create({ data: userPhrase });
  }

  async findMany(pageNum: number = 0, userPhrasesNum: number = 6) {
    const startAt = userPhrasesNum * pageNum;
    return await this.prismaService.userPhrase.findMany({
      take: userPhrasesNum,
      skip: startAt,
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
