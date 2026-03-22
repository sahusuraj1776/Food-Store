import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SMTP_USER } from './config';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class GmailService {
  
  constructor(private readonly mailerService:MailerService){}

  async sendEmail(mailBody:EmailDto){
    try {
      const res = await this.mailerService.sendMail({
      to:mailBody.to,
      from:SMTP_USER,
      subject:mailBody.subject,
      html:mailBody.message
      });
      console.log("Email Sent with Id:",res.messageId)
    } catch (error) {
      console.log(error)
    }
  }
}
