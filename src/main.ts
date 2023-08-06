import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DomainExceptionFilter } from './shared/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new DomainExceptionFilter());
  await app.listen(4343);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('ITourer API Docs')
    .setDescription('The ITourer API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
}

bootstrap();
