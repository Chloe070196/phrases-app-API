import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserphrasesService } from './userphrases.service';
import { Prisma } from '@prisma/client';

@Controller('userphrases')
export class UserphrasesController {
  constructor(private userphrasesService: UserphrasesService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async save(
    @Body()
    createUserphraseDto: Prisma.UserPhraseCreateInput,
  ) {
    return await this.userphrasesService.create(createUserphraseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async update(
    @Body()
    updateUserphraseDto: Prisma.UserPhraseUpdateInput,
    @Param('id') id: string,
  ) {
    return await this.userphrasesService.update({
      data: updateUserphraseDto,
      where: { id: Number(id) },
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getMany(@Query() params?: { page_num: string; phrases_num: string }) {
    if (!params || (!params.page_num && !params.phrases_num)) {
      return await this.userphrasesService.findMany();
    }
    const { page_num, phrases_num } = params;
    if (phrases_num && page_num) {
      return await this.userphrasesService.findMany(
        Number(page_num),
        Number(phrases_num),
      );
    }
    if (phrases_num) {
      return await this.userphrasesService.findMany(
        undefined,
        Number(phrases_num),
      );
    }
    if (page_num) {
      return await this.userphrasesService.findMany(
        Number(page_num),
        undefined,
      );
    }
  }
}
