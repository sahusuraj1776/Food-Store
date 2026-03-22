import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport:Transport.RMQ,
      options:{
        urls:['amqp://localhost:5672'],
        queue:'auth_queue',
        queueOptions:{
          durable:true
        }
      }
    }
  );
  app.useGlobalPipes(new ValidationPipe())
  await app.listen();
}
bootstrap();
