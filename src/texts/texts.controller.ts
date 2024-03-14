import { Body, Controller, Post } from '@nestjs/common';
import { TextsService } from './texts.service';
import { Prisma } from '@prisma/client';

@Controller('texts')
export class TextsController {
  constructor(private textService: TextsService) {}
  @Post()
  async save(
    @Body()
    fromClient: {
      title: string;
      content: string;
      userPhrasesId: Array<number>;
      userId: number;
    },
  ) {
    const createTextDto: Prisma.TextCreateInput = {
      title: fromClient.title,
      content: fromClient.content,
      user: { connect: { id: Number(fromClient.userId) } },
      userPhrases: {
        connect: fromClient.userPhrasesId.map((id) => ({
          id,
        })),
      },
    };
    return await this.textService.create(createTextDto);
  }
  async getMany() {
    return await this.textService.getMany();
  }
}
