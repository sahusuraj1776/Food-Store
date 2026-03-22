import { NestFactory } from '@nestjs/core';
import { FoodModule } from './food.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FoodModule,
    {
      transport:Transport.RMQ,
      options:{
        urls:['amqp://localhost:5672'],
        queue:'food_queue',
        queueOptions:{
          durable:true
        }
      }
    }
  );
  await app.listen();
}
bootstrap();
