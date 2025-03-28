import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware para cookies
  app.use(cookieParser());

  // Habilita validação global
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Tickets automações')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona suporte a JWT no Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}

bootstrap();
