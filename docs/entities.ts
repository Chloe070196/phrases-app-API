import { ApiProperty } from '@nestjs/swagger';

export class Username {
  @ApiProperty({
    example: 'somecreativeUsername123',
    description: 'refers to the user',
  })
  username: string;
}

export class LoggedInUser {
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;
  @ApiProperty({
    example: 'somecreativeUsername123',
    description: 'refers to the user',
  })
  username: string;

  @ApiProperty({
    example: 'some jwt token',
    description: "the user's unique token",
  })
  token: string;
}

export class User {
  @ApiProperty({
    example: 1,
    description: 'unique identifier',
  })
  id: number;
  @ApiProperty({
    example: 'somecreativeUsername123',
    description: 'refers to the user',
  })
  username: string;
  @ApiProperty({
    example: 'a hashed value',
    description: 'a hashed value of the user`s password',
  })
  password: string;
  @ApiProperty({
    example: 'example@email.sth',
    description: "the user's email address which must be unique",
  })
  email: string;
}

export class Phrase {
  @ApiProperty({ example: 'beat around the bush', description: 'the phrase' })
  content: string;
  @ApiProperty({
    example:
      'to hesitate and take a long time before saying what you need to, usually because saying it will be uncomfortable',
    description: 'its explanation',
  })
  meaning: string;
  @ApiProperty({
    example: 'describing conversations',
    description: 'the category of use the phrase belongs to',
  })
  category: string;
  @ApiProperty({
    example: `Stop beating around the bush. If you're not happy with our plans, tell us.`,
    description: 'a quick example of use',
  })
  shortExample: string;
  @ApiProperty({
    example:
      'I understand that it is not easy to tell management that we have made a costly mistake, but I do not think that beating around the bush for much longer will help either. We will need all the time we can get to resolve the issue. And the first step is to report it.',
    description: 'a longer example of use',
  })
  example: string;
}

export class UserPhrase {
  @ApiProperty({ example: new Phrase(), description: 'the phrase object' })
  phrase: Phrase;
  @ApiProperty({ example: new User(), description: 'the user object' })
  user: User;
  @ApiProperty({
    example: 5,
    description: 'the number of time a user has interacted with a phrase',
  })
  timesSeen: string;
  @ApiProperty({
    example: 6,
    description:
      'the number of tries it took to figure out where that phrase must be used',
  })
  timesAttempted: string;
  @ApiProperty({
    example: 2,
    description:
      'the number of times the user has managed to use that phrase in writing',
  })
  timesUsed: string;
}

export class Category {
  @ApiProperty({
    example: 'describing conversations',
    description: 'a context of use (phrase category)',
  })
  category: string;
}
