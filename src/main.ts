import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.use((req, _, next) => {
    console.log(new Date(), `[${req.method}]`, req.url);
    next();
  });

  await app.listen(process.env.PORT || 5050);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
