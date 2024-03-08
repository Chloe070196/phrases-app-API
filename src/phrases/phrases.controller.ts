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

@Controller('phrases')
export class PhrasesController {
  constructor(private phrasesService: PhrasesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async save(
    @Body()
    createPhraseDto: {
      category: string;
      content: string;
      meaning: string;
      example: string;
      shortExample: string;
    },
  ) {
    return await this.phrasesService.create(createPhraseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getMany(@Query() params: { page_num: string; phrases_num: string }) {
    const { page_num, phrases_num } = params;
    if (page_num && phrases_num) {
      return await this.phrasesService.findMany(
        Number(page_num),
        Number(phrases_num),
      );
    }
    return await this.phrasesService.findMany();
  }
}
