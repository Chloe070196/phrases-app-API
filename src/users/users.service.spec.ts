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
        email: 'mock@email1.com',
      });
      const email = 'mock@email1.com';

      const result = await service.getUserBy({ email });
      expect(result).not.toBeUndefined();
      expect(result?.username).toEqual('joe123');
    });
  });
  describe('create', () => {
    it('a new user and return their username', async () => {
      prismaService.user.create = jest.fn().mockReturnValueOnce({
        id: 7,
        username: 'lee765',
        // uses the hash value of a random mock password, not just a random string
        password:
          '$2b$08$jkrHXKQzLOtF2bkBsa6bReoc2yk3qi0SRhv75d.CUbbYibeLiiYde',
        email: 'mock@email2.com',
        createdAt: 'some time',
        updatedAt: 'some time',
      });
      const data = {
        username: 'mock@email2.com',
        password: 'lsthg',
        email: 'mock@email2.com',
      };

      const result = await service.createUser(data);
      expect(result).not.toBeUndefined();
      expect(result?.username).toEqual('lee765');
      expect(result?.id).toEqual(7);
    });
  });
});
