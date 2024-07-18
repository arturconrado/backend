import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS com configurações padrão
  app.enableCors({
    origin: '*', // Permite todas as origens, ajuste conforme necessário
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Usar pipes globais para validação
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3002);
}
bootstrap();
