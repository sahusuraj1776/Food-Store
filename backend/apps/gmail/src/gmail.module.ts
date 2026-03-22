import { Module } from '@nestjs/common';
import { GmailController } from './gmail.controller';
import { GmailService } from './gmail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from './config';

@Module({
  imports: [MailerModule.forRoot({
      transport:{
        host:SMTP_HOST,
        port:SMTP_PORT,
        secure:false,
        auth:{
          user:SMTP_USER,
          pass:SMTP_PASS
        }
      }
  })],
  controllers: [GmailController],
  providers: [GmailService],
})
export class GmailModule {}
