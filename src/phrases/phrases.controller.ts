import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
  async getMany() {
    return await this.phrasesService.findMany();
  }
}
