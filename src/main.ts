import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { NestiaSwaggerComposer } from '@nestia/sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = await NestiaSwaggerComposer.document(app, {});
  SwaggerModule.setup('docs', app, document as any);

  await app.listen(8005);
}
bootstrap();
