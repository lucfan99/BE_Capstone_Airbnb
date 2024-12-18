import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //add validation input
  app.useGlobalPipes(new ValidationPipe());

  //config swagger ui
  const configSwagger = new DocumentBuilder()
    .setTitle('API Capstone AirBnB Nodejs47')
    .setDescription('Danh sách API AirBnB')
    .setVersion('1.0')
    .build();

  const swagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('swagger', app, swagger);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
