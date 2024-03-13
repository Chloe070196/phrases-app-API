import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PhrasesService {
  constructor(private prismaService: PrismaService) {}

  async create(phrase: Prisma.PhraseCreateInput) {
    return await this.prismaService.phrase.create({ data: phrase });
  }

  async findMany(userId: number, pageNum: number = 0, phrasesNum: number = 6) {
    const startAt = phrasesNum * pageNum;
    return await this.prismaService.phrase.findMany({
      take: phrasesNum,
      skip: startAt,
      where: {
        userPhrases: {
          none: {
            userId: userId,
          },
        },
      },
    });
  }
}
