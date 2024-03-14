import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { PhrasesModule } from './phrases/phrases.module';
import { UserphrasesService } from './userphrases/userphrases.service';
import { UserphrasesController } from './userphrases/userphrases.controller';
import { UserphrasesModule } from './userphrases/userphrases.module';
import { TextsService } from './texts/texts.service';
import { TextsController } from './texts/texts.controller';
import { TextsModule } from './texts/texts.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PhrasesModule,
    UserphrasesModule,
    TextsModule,
  ],
  controllers: [AppController, UserphrasesController, TextsController],
  providers: [
    AppService,
    UsersService,
    PrismaService,
    UserphrasesService,
    TextsService,
  ],
})
export class AppModule {}
