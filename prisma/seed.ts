import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type UserType = {
  email: string;
  username: string;
  password: string;
};

async function main() {
  const user1: UserType = {
    email: 'max@test.com',
    username: 'max123',
    password: 'MostInnovativeAndConvolutedPassword',
  };

  const max = await prisma.user.create({ data: user1 });
  console.log('user created:', max);
}

main();
