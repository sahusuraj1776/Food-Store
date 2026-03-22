import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './services/user/user.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { FoodModule } from './services/food/food.model';
import { ContactUsModule } from './services/contact-us/contact-us.module';
import { GmailModule } from './services/gmail/gmail.module';


@Module({
  imports: [
    UserModule,
    FoodModule,
    ContactUsModule,
    GmailModule,
    ClientsModule.register([
    {
      name:'USER_CLIENT',
      transport:Transport.RMQ,
      options:{
        urls:['amqp://localhost:5672'],
        queue:'user_queue'
      }
    },
    {
      name:'AUTH_CLIENT',
      transport:Transport.RMQ,
      options:{
        urls:['amqp://localhost:5672'],
        queue:'auth_queue'
      }
    },
    {
      name:'FOOD_CLIENT',
      transport:Transport.RMQ,
      options:{
        queue:'food_queue',
        urls:['amqp://localhost:5672']
      }
    },
    {
      name:'CONTACT_US_CLIENT',
      transport:Transport.RMQ,
      options:{
        urls:['amqp://localhost:5672'],
        queue:'contact_queue',
      }
    },
    {
      name:'MAIL_CLIENT',
      transport:Transport.RMQ,
      options:{
          urls:['amqp://localhost:5672'],
          queue:'mail_queue',
      }
    }
  ])],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes({
      path:'*',
      method:RequestMethod.ALL
    })
  }
}
