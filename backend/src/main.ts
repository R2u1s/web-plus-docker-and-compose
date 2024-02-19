import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule, { cors: true });
  // Добавим глобальный пайплайн валидации на следующей строке
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(helmet());
  await app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));
}
bootstrap();
