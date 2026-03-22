import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.setGlobalPrefix('api')
  app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
})
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.port ?? 8080);
}
bootstrap();
