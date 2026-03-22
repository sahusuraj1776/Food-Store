import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { EmailDto } from "./dto/email.dto";
import { firstValueFrom, timeout } from "rxjs";


@Controller('mail')
export class GmailController{

    constructor(@Inject('MAIL_CLIENT') private readonly mailClient:ClientProxy){}

    @Post()
    async sendMail(@Body()body:EmailDto){
        const pattern = 'gmail.sendMail'
        const payload = {mailBody:{to:body.to,subject:"Thanks for Contacting Us!",message:`
        <h2>Hello ${body.name},</h2>
        <p>Thank you for reaching out. Our team will get back to you shortly.</p>
        <p><strong>Your Message:</strong></p>
        <p>${body.message}</p>
        <br>
        <p>Regards,<br>FOOD STORE</p>
      `}}
        try {
            this.mailClient.emit(pattern,payload).pipe(timeout(3000))
            return {status:'Message Sent Successfully',success:true}
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }
}