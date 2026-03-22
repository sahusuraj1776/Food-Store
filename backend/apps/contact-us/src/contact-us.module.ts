import { Module } from '@nestjs/common';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config';
import { ContactUsEntity } from './entity/contact-us.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:DB_PORT,
      database:DB_DATABASE,
      entities:[ContactUsEntity],
      username:DB_USERNAME,
      password:DB_PASSWORD,
      synchronize:true
    }),
    TypeOrmModule.forFeature([ContactUsEntity])
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule {}
