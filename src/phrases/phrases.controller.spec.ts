import { Test, TestingModule } from '@nestjs/testing';
import { PhrasesController } from './phrases.controller';
import { PrismaService } from 'src/prisma.service';
import { PhrasesService } from './phrases.service';

describe('PhrasesController', () => {
  let controller: PhrasesController;
  let prismaService: PrismaService;

  const mockPhraseInput = {
    category: 'making small talk',
    content: 'time flies',
    meaning: 'time seems to pass so quickly that we do not notice it',
    example:
      "As I'm scrolling through my social media feed, time flies by faster than I realize. One moment, I'm checking out funny memes, and the next, it's already been an hour.",
    shortExample:
      "Wow, it's already midnight! Time flies by when you're having fun.",
  };
  const mockPhraseReturned = {
    ...mockPhraseInput,
    id: 1,
    createAt: 'some time',
    updatedAt: 'some time',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhrasesService, PrismaService],
      controllers: [PhrasesController],
    }).compile();

    controller = module.get<PhrasesController>(PhrasesController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(': save ', () => {
    it('should save a phrase and return it', async () => {
      prismaService.phrase.create = jest
        .fn()
        .mockReturnValueOnce(mockPhraseReturned);
      const result = await controller.save(mockPhraseInput);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('id');
      expect(result.content).toEqual('time flies');
    });
  });
  describe(': getMany ', () => {
    it('should return a list of phrases', async () => {
      prismaService.phrase.findMany = jest
        .fn()
        .mockReturnValueOnce([mockPhraseReturned]);
      const result = await controller.getMany();
      expect(result).not.toBeUndefined();
      if (result) {
        expect(result[0]).not.toBeUndefined();
        if (result[0]) {
          expect(result[0].content).toEqual('time flies');
          expect(result[0]).toHaveProperty('id');
        }
      }
    });
  });
  describe(': getAllCategories ', () => {
    it('should return a list of distinct categories', async () => {
      prismaService.phrase.findMany = jest
        .fn()
        .mockReturnValueOnce([
          { category: 'Small talk' },
          { category: 'Business Meetings' },
        ]);
      const result = await controller.getAllCategories();
      expect(result).not.toBeUndefined();
      expect(result.length).toEqual(2);
    });
  });
});
