import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

// CONSTS
export const BASE_URL = 'http://localhost:4004/'
export const REDIRECT_URL_AFTER_CONFIRMATION = 'https://trello.com/b/jjlFiGTV/sparkys'
export const AVATARS_STORAGE_URL = (fileName: string, transform: string = '') => {
  return `https://res.cloudinary.com/techstroy/image/upload/${transform}/v1629282964/sparkys/avatars/${fileName}`
}

async function bootstrap() {
  const PORT = process.env.PORT || 4004
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Sparkys api')
    .setDescription('Api for Sparkys social network')
    .setVersion('1.0.0')
    .addTag('YarMolenko13')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

bootstrap();
