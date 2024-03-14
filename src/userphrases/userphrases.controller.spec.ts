import { Test, TestingModule } from '@nestjs/testing';
import { UserphrasesController } from './userphrases.controller';
import { PrismaService } from 'src/prisma.service';
import { UserphrasesService } from './userphrases.service';
import { Status } from '@prisma/client';

fdescribe('UserphrasesController', () => {
  let controller: UserphrasesController;
  let prismaService: PrismaService;

  const mockPhraseInput1 = {
    category: 'making small talk',
    content: 'time flies',
    meaning: 'time seems to pass so quickly that we do not notice it',
    example:
      "As I'm scrolling through my social media feed, time flies by faster than I realize. One moment, I'm checking out funny memes, and the next, it's already been an hour.",
    shortExample:
      "Wow, it's already midnight! Time flies by when you're having fun.",
  };
  const mockPhraseReturned1 = {
    ...mockPhraseInput1,
    id: 1,
    createAt: 'some time',
    updatedAt: 'some time',
  };
  const mockPhraseInput2 = {
    category: 'talking about learning',
    content: 'practice makes perfect',
    meaning: 'the way to get better at something is to keep doing it',
    example:
      "I've not managed to have a full conversation in Spanish yet where I haven't relied on Google translate. But I'm attending lessongs, and I'll be spending the summer in Madrid, so I'm bound to improve a lot. As they say, practice makes perfect!",
    shortExample: "I'm not really good at it yet, but practice makes perfect!",
  };
  const mockPhraseReturned2 = {
    ...mockPhraseInput2,
    id: 1,
    createAt: 'some time',
    updatedAt: 'some time',
  };

  const mockUserPhraseInput1 = {
    phraseId: 1,
    userId: 1,
    status: Status.WIP,
    timesAttempted: 5,
    timesSeen: 8,
    timesUsed: 1,
  };
  const mockUserPhraseReturned1 = {
    ...mockUserPhraseInput1,
    id: 1,
    phrase: mockPhraseReturned1,
    createAt: 'some time',
    updatedAt: 'some time',
  };
  const mockUserPhraseInput2 = {
    phraseId: 2,
    userId: 1,
    status: Status.WIP,
    timesAttempted: 5,
    timesSeen: 8,
    timesUsed: 1,
  };
  const mockUserPhraseReturned2 = {
    ...mockUserPhraseInput2,
    id: 1,
    phrase: mockPhraseReturned2,
    createAt: 'some time',
    updatedAt: 'some time',
  };
  const mockModifiedUserPhrase = {
    ...mockUserPhraseReturned1,
    status: Status.LEARNT,
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
        .mockReturnValueOnce(mockUserPhraseReturned1);
      const result = await controller.save(mockUserPhraseInput1);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('id');
      expect(result.status).toEqual('WIP');
    });
  });
  describe(': getMany ', () => {
    it('should return a list of userphrases', async () => {
      prismaService.userPhrase.findMany = jest
        .fn()
        .mockReturnValueOnce([mockUserPhraseReturned1]);
      const result = await controller.getMany('1', {
        category: 'Everyday Conversations',
      });
      expect(result).not.toBeUndefined();
      if (result) {
        expect(result[0]).not.toBeUndefined();
        if (result) {
          expect(result.length).toEqual(1);
        }
      }
    });
    it('should return an unfiltered list of all userphrases', async () => {
      prismaService.userPhrase.findMany = jest
        .fn()
        .mockReturnValueOnce([
          mockUserPhraseReturned1,
          mockUserPhraseReturned2,
        ]);
      const result = await controller.getMany('1');
      expect(result).not.toBeUndefined();
      if (result) {
        expect(result[0]).not.toBeUndefined();
        if (result) {
          expect(result.length).toEqual(2);
        }
      }
    });
  });
  describe(': update ', () => {
    it('should return an updated userphrase', async () => {
      prismaService.userPhrase.findMany = jest
        .fn()
        .mockReturnValueOnce(mockModifiedUserPhrase);
      const result = await controller.update({ status: Status.LEARNT }, '1');
      expect(result).not.toBeUndefined();
      if (result) {
        expect(result.status).toEqual('LEARNT');
      }
    });
  });
});
