import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TextsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.TextCreateInput) {
    return await this.prismaService.text.create({
      data,
      include: {
        userPhrases: {
          select: {
            phrase: { select: { id: true, category: true, content: true } },
          },
        },
      },
    });
  }

  async getMany() {
    return await this.prismaService.text.findMany();
  }
}
