import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Learn phrases API')
    .setDescription(
      'An api for English learners (intermediate and up) to access resources, store their work, and access and store their progress',
    )
    .setVersion('1.0')
    .addTag('phrases')
    .build();
  const corsOptions: CorsOptions = {
    origin: [
      'english-phrases-learning-app.vercel.app',
      'english-phrases-learning-app.vercel.app/login',
    ],
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
