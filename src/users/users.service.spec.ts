import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, AuthService],
      controllers: [AuthController],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserBy', () => {
    it('returns a user', async () => {
      prismaService.user.findUnique = jest.fn().mockReturnValueOnce({
        username: 'joe123',
        password: 'segboerg',
        email: 'mock@email.com',
      });
      const email = 'mock@email.com';

      const result = await service.getUserBy({ email });
      expect(result).not.toBeUndefined();
      expect(result?.username).toEqual('joe123');
    });
  });
});
