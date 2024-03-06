import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PhrasesService } from './phrases.service';

@Controller('phrases')
export class PhrasesController {
  constructor(private phrasesService: PhrasesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async save(
    @Body()
    createPhraseDto: {
      content: string;
      meaning: string;
      example: string;
    },
  ) {
    return await this.phrasesService.create(createPhraseDto);
  }
}
