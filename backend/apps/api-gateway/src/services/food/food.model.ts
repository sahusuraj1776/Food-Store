import { Module } from "@nestjs/common";
import { FoodController } from "./food.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
    imports:[
        ClientsModule.register([
            {
                name:'FOOD_CLIENT',
                transport:Transport.RMQ,
                options:{
                    queue:'food_queue',
                    urls:['amqp://localhost:5672']
                }
            }
        ])
    ],
    controllers:[FoodController],
})
export class FoodModule{}