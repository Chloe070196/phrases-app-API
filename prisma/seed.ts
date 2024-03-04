import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1: Prisma.UserCreateInput = {
    email: 'max@test.com',
    username: 'max123',
    password: 'MostInnovativeAndConvolutedPassword',
  };

  const max = await prisma.user.create({ data: user1 });
  console.log('user created:', max);

  const phrase1: Prisma.PhraseCreateInput = {
    content: 'until the cows come home',
    meaning: 'for a very long time',
    example:
      "I can't stand here until the cows come home, it's way too cold for that. Hurry!",
  };
  const untilTheCowsComeHome = await prisma.phrase.create({ data: phrase1 });
  console.log('phrase created:', untilTheCowsComeHome);

  const userPhrase1: Prisma.UserPhraseCreateInput = {
    phrase: { connect: { id: 1 } },
    user: { connect: { id: 1 } },
    status: 'WIP',
    timesAttempted: 2,
    timesSeen: 2,
    timesUsed: 0,
  };

  const MaxUntilTheCowsComeHome = await prisma.userPhrase.create({
    data: userPhrase1,
  });
  console.log('userphrase created: ', MaxUntilTheCowsComeHome);

  const text1: Prisma.TextCreateInput = {
    title: 'Something attention-catching',
    content:
      'Some quick anecdote about a holiday where stuff went wrong and then <insert newly learnt phrase> had to wait until the cows come home.',
    user: { connect: { id: 1 } },
    userPhrases: {
      connect: [{ id: 1 }],
    },
  };

  const firstText = await prisma.text.create({
    data: text1,
  });
  console.log('text created: ', firstText);
}

main();
