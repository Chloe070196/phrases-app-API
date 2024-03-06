import { Test, TestingModule } from '@nestjs/testing';
import { PhrasesController } from './phrases.controller';
import { PrismaService } from 'src/prisma.service';
import { PhrasesService } from './phrases.service';

describe('PhrasesController', () => {
  let controller: PhrasesController;
  let prismaService: PrismaService;
  let phraseService: PhrasesService;
  const mockPhraseInput = {
    content: 'time flies',
    meaning: 'time seems to pass so quickly that we do not notice it',
    example:
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
      expect(result.content).toHaveProperty('id');
      expect(result.content).toEqual('time flies');
    });
  });
  describe(': getMany ', () => {
    it('should return a list of phrases', async () => {
      prismaService.phrase.findMany = jest
        .fn()
        .mockReturnValueOnce([mockPhraseReturned]);
      const result = await controller.getMany(mockPhraseInput);
      expect(result).not.toBeUndefined();
      expect(result[0]).not.toBeUndefined();
      expect(result[0].content).toEqual('timeFlies');
      expect(result[0].content).toHaveProperty('id');
    });
  });
});
