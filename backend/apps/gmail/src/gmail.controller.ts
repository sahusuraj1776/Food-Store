import { Body, Controller, Get, Post } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailDto } from './dto/email.dto';

@Controller()
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @EventPattern('gmail.sendMail')
  async sendMail(@Payload('mailBody') mailBody:EmailDto){
    return await this.gmailService.sendEmail(mailBody);
  }
}
