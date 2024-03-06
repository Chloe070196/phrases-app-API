import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PhrasesService, PrismaService],
  controllers: [PhrasesController],
})
export class PhrasesModule {}
