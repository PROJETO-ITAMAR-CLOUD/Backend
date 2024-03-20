import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import path, { dirname, join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

console.log(process.env.DATABASE_URL);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/images',
  });

  app.enableCors();
  await app.listen(4000);
}
bootstrap();
