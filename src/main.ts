import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
