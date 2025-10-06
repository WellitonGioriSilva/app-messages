import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove chaves que estão no dto
      forbidNonWhitelisted: true, // Retorna erro se tiver chaves que não estão no dto
      transform: true, // Converte o tipo da requisição para o tipo do dto - ex: string para number
    }),
  );

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle('Recados API')
    .setDescription('API para gerenciamento de recados')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
