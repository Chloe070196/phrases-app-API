import { Test, TestingModule } from '@nestjs/testing';
import { UserphrasesService } from './userphrases.service';
import { PrismaService } from 'src/prisma.service';

describe('UserphrasesService', () => {
  let service: UserphrasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserphrasesService, PrismaService],
    }).compile();

    service = module.get<UserphrasesService>(UserphrasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
