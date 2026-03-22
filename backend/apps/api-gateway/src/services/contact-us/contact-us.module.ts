import { Module } from "@nestjs/common";
import { ContactUsController } from "./contact-us.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
    imports:[ClientsModule.register([
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
    controllers:[ContactUsController]
})
export class ContactUsModule{}