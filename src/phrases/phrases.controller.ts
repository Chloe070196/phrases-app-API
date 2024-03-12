import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { Prisma } from '@prisma/client';

@Controller('phrases')
export class PhrasesController {
  constructor(private phrasesService: PhrasesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async save(
    @Body()
    createPhraseDto: Prisma.PhraseCreateInput,
  ) {
    return await this.phrasesService.create(createPhraseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getMany(@Query() params?: { page_num: string; phrases_num: string }) {
    if (!params) {
      return await this.phrasesService.findMany();
    }
    const { page_num, phrases_num } = params;
    if (phrases_num && page_num) {
      return await this.phrasesService.findMany(
        Number(page_num),
        Number(phrases_num),
      );
    }
    if (phrases_num) {
      return await this.phrasesService.findMany(undefined, Number(phrases_num));
    }
    if (page_num) {
      return await this.phrasesService.findMany(Number(page_num), undefined);
    }
  }
}
