import { Test, TestingModule } from '@nestjs/testing';
import { UserphrasesController } from './userphrases.controller';
import { PrismaService } from 'src/prisma.service';
import { UserphrasesService } from './userphrases.service';
import { Status } from '@prisma/client';

describe('UserphrasesController', () => {
  let controller: UserphrasesController;
  let prismaService: PrismaService;

  const mockUserPhraseInput = {
    phrase: { connect: { id: 1 } },
    user: { connect: { id: 1 } },
    status: Status.WIP,
    timesAttempted: 5,
    timesSeen: 8,
    timesUsed: 1,
  };
  const mockUserPhraseReturned = {
    ...mockUserPhraseInput,
    id: 1,
    createAt: 'some time',
    updatedAt: 'some time',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserphrasesService, PrismaService],
      controllers: [UserphrasesController],
    }).compile();

    controller = module.get<UserphrasesController>(UserphrasesController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(': save ', () => {
    it('should save a userphrase and return it', async () => {
      prismaService.userPhrase.create = jest
        .fn()
        .mockReturnValueOnce(mockUserPhraseReturned);
      const result = await controller.save(mockUserPhraseInput);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('id');
      expect(result.status).toEqual('WIP');
    });
  });
  describe(': getMany ', () => {
    it('should return a list of userphrases', async () => {
      prismaService.userPhrase.findMany = jest
        .fn()
        .mockReturnValueOnce([mockUserPhraseInput]);
      const result = await controller.getMany();
      expect(result).not.toBeUndefined();
      if (result) {
        expect(result[0]).not.toBeUndefined();
        if (result) {
          expect(result[0].timesAttempted).toEqual(5);
        }
      }
    });
  });
});
