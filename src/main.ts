import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from './config/cors/cors';
import { ParseTrimStringPipe } from './common/pipes/parse-trim-string.pipe';
import * as cookieParser from 'cookie-parser';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CorsOptions);
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ParseTrimStringPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle('Name of the API')
    .setDescription('Description of the API')
    .setVersion('Version of the API, example: 1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(envs.port ?? 5000);
}
bootstrap();