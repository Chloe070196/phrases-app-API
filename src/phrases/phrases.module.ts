import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';

@Module({
  providers: [PhrasesService],
  controllers: [PhrasesController],
})
export class PhrasesModule {}
