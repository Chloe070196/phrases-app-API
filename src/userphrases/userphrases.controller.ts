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
    @Query()
    params?: { category: string },
  ) {
    return await this.userphrasesService.findMany(
      Number(userId),
      params?.category,
    );
  }
}
