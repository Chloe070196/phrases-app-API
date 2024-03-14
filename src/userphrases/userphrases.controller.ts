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
import { Prisma, Status } from '@prisma/client';
import { UserPhrase } from 'docs/entities';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('userphrases')
export class UserphrasesController {
  constructor(private userphrasesService: UserphrasesService) {}

  @ApiOperation({ summary: 'create a userphrase' })
  @ApiResponse({
    status: 201,
    description: 'the created userphrase',
    type: UserPhrase,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/')
  async save(
    @Body()
    data: {
      timesSeen: number;
      timesAttempted: number;
      timesUsed: number;
      status: Status;
      userId: number;
      phraseId: number;
    },
  ) {
    const { timesSeen, timesAttempted, timesUsed, status, userId, phraseId } =
      data;
    return await this.userphrasesService.create(
      timesSeen,
      timesAttempted,
      timesUsed,
      status,
      userId,
      phraseId,
    );
  }

  @ApiOperation({ summary: 'updates a userphrase' })
  @ApiResponse({
    status: 201,
    description: 'the updated userphrase',
    type: UserPhrase,
  })
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

  @ApiOperation({
    summary: 'takes a userId, gets the userphrases for a given user',
  })
  @ApiResponse({
    status: 201,
    description:
      'the list userphrases that match the userId (phrases included)',
    type: [UserPhrase],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:userId')
  async getMany(
    @Param('userId') userId: string,
    @Query() params?: { page_num: string; phrases_num: string },
  ) {
    if (!params || (!params.page_num && !params.phrases_num)) {
      return await this.userphrasesService.findMany(Number(userId));
    }
    const { page_num, phrases_num } = params;
    if (phrases_num && page_num) {
      return await this.userphrasesService.findMany(
        Number(userId),
        Number(page_num),
        Number(phrases_num),
      );
    }
    if (phrases_num) {
      return await this.userphrasesService.findMany(
        Number(userId),
        undefined,
        Number(phrases_num),
      );
    }
    if (page_num) {
      return await this.userphrasesService.findMany(
        Number(userId),
        Number(page_num),
        undefined,
      );
    }
  }
}
