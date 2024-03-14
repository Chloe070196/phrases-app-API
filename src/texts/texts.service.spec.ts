import { Test, TestingModule } from '@nestjs/testing';
import { TextsService } from './texts.service';
import { PrismaService } from 'src/prisma.service';

describe('TextsService', () => {
  let service: TextsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextsService, PrismaService],
    }).compile();

    service = module.get<TextsService>(TextsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
