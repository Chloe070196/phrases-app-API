import { Test, TestingModule } from '@nestjs/testing';
import { PhrasesService } from './phrases.service';
import { PrismaService } from 'src/prisma.service';

describe('PhrasesService', () => {
  let service: PhrasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhrasesService, PrismaService],
    }).compile();

    service = module.get<PhrasesService>(PhrasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
