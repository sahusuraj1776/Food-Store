import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports:[
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
    }
        ])
    ],
    controllers:[UserController],
})
export class UserModule{}