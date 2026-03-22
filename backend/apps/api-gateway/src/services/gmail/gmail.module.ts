import { Module } from "@nestjs/common";
import { GmailController } from "./gmail.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports:[ClientsModule.register([
        {
            name:'MAIL_CLIENT',
            transport:Transport.RMQ,
            options:{
                urls:['amqp://localhost:5672'],
                queue:'mail_queue',
            }
        }
    ])],
    controllers:[GmailController]
})
export class GmailModule{}