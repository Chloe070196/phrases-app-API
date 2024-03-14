import { Test, TestingModule } from '@nestjs/testing';
import { TextsController } from './texts.controller';
import { PrismaService } from 'src/prisma.service';
import { TextsService } from './texts.service';

describe('TextsController', () => {
  let controller: TextsController;
  let prismaService: PrismaService;

  const mockTextInput = {
    title: 'test one',
    content:
      'Et dolores quia a quia iusto sit atque Quis et possimus laudantium est nemo aperiam quo recusandae necessitatibus ut laboriosam modi. Ut eaque consequatur ut rerum magni est suscipit voluptatum hic perspiciatis placeat non blanditiis molestiae. Et esse exercitationem et perspiciatis quia est consectetur necessitatibus non necessitatibus odit qui atque maiores ea voluptas quia. Non perspiciatis nisi est quam repellat et nesciunt earum.',
    userPhrasesId: [1],
    userId: 1,
  };

  const mockTextReturnedValue = {
    id: 1,
    title: 'test one',
    content:
      'Et dolores quia a quia iusto sit atque Quis et possimus laudantium est nemo aperiam quo recusandae necessitatibus ut laboriosam modi. Ut eaque consequatur ut rerum magni est suscipit voluptatum hic perspiciatis placeat non blanditiis molestiae. Et esse exercitationem et perspiciatis quia est consectetur necessitatibus non necessitatibus odit qui atque maiores ea voluptas quia. Non perspiciatis nisi est quam repellat et nesciunt earum.',
    userPhrases: [
      {
        phrase: {
          id: 1,
          category: 'Everyday Conversations',
          content: 'Bite the bullet',
        },
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextsController],
      providers: [PrismaService, TextsService],
    }).compile();

    controller = module.get<TextsController>(TextsController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe(': save ', () => {
    it('should save a text and return it', async () => {
      prismaService.text.create = jest
        .fn()
        .mockReturnValueOnce(mockTextReturnedValue);
      const result = await controller.save(mockTextInput);
      expect(result).not.toBeUndefined();
      expect(result).toHaveProperty('id');
    });
  });
});
