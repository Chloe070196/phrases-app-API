import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type UserInputType = {
  email: string;
  username: string;
  password: string;
};

type PhraseInputType = {
  content: string;
  meaning: string;
  example: string;
};

async function main() {
  const user1: UserInputType = {
    email: 'max@test.com',
    username: 'max123',
    password: 'MostInnovativeAndConvolutedPassword',
  };

  const max = await prisma.user.create({ data: user1 });
  console.log('user created:', max);

  const phrase1: PhraseInputType = {
    content: 'until the cows come home',
    meaning: 'for a very long time',
    example:
      "I can't stand here until the cows come home, it's way too cold for that. Hurry!",
  };
  const untilTheCowsComeHome = await prisma.phrase.create({ data: phrase1 });
  console.log('phrase created:', untilTheCowsComeHome);
}

main();
