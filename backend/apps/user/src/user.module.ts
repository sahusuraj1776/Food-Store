import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:DB_PORT,
      database:DB_DATABASE,
      entities:[UserEntity],
      username:DB_USERNAME,
      password:DB_PASSWORD,
      synchronize:true
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
