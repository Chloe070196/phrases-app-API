import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { Prisma } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

@Controller('phrases')
export class PhrasesController {
  constructor(private phrasesService: PhrasesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async save(
    @Body()
    createPhraseDto: Prisma.PhraseCreateInput,
  ) {
    try {
      const phrase = await this.phrasesService.create(createPhraseDto);
      return phrase;
    } catch (e) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getMany(
    @Query() params?: { page_num: string; phrases_num: string },
    @Headers('authorization') authorization?: string,
  ) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!authorization) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const token = authorization.substring('Bearer '.length).trim();
    const payload = jwt.verify(token, secret) as {
      username: string;
      id: number;
    };
    const { id } = payload;

    if (!params || (!params.page_num && !params.phrases_num)) {
      const phrases = await this.phrasesService.findMany(id);
      return phrases;
    }
    const { page_num, phrases_num } = params;
    if (phrases_num && page_num) {
      return await this.phrasesService.findMany(
        id,
        Number(page_num),
        Number(phrases_num),
      );
    }
    if (phrases_num) {
      return await this.phrasesService.findMany(
        id,
        undefined,
        Number(phrases_num),
      );
    }
    if (page_num) {
      return await this.phrasesService.findMany(
        id,
        Number(page_num),
        undefined,
      );
    }
  }
}
