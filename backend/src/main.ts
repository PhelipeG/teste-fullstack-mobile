import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Documentation - App Fitness')
    .setDescription('Documentação da API do app de atividades físicas')
    .setVersion('1.0')
    .addBearerAuth() // adicionei para autenticação JWT na documentação UI
    .build();

  const document = SwaggerModule.createDocument(app, config); // Cria o documento Swagger
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
