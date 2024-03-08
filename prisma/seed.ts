import { PrismaClient, Prisma } from '@prisma/client';
import { phrasesToBeAdded } from './mockPhrases';
const prisma = new PrismaClient();

async function main() {
  const user1: Prisma.UserCreateInput = {
    email: 'max@test.com',
    username: 'max123',
    password: '$2b$08$..uVOU9NIs5bNdiI2OX2XubLCo4eSWPUCvLn/A7tTVDAiif4wOxhW',
  };
  const max = await prisma.user.create({ data: user1 });
  console.log('user created:', max);

  const createPhrases = async () => {
    return await prisma.phrase.createMany({ data: phrasesToBeAdded });
  };
  const phrases = await createPhrases();
  console.log('phrases created:', phrases);

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
