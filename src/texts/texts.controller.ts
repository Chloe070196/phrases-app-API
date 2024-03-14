import { Body, Controller, Get, Post } from '@nestjs/common';
import { TextsService } from './texts.service';
import { Prisma } from '@prisma/client';

@Controller('texts')
export class TextsController {
  constructor(private textService: TextsService) {}
  @Post()
  async save(
    @Body()
    fromClient: {
      content: string;
      userphrasesId: Array<number>;
      userId: number;
    },
  ) {
    const createTextDto: Prisma.TextCreateInput = {
      content: fromClient.content,
      user: { connect: { id: Number(fromClient.userId) } },
      userPhrases: {
        connect: fromClient.userphrasesId.map((id) => ({
          id,
        })),
      },
    };
    return await this.textService.create(createTextDto);
  }
  @Get()
  async getMany() {
    return await this.textService.getMany();
  }
}
