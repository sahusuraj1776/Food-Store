import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './config';

@Module({
  imports: [
    JwtModule.register({
      global:true,
      secret:JWT_SECRET,
      signOptions:{
        expiresIn:'1d'
      }
    }),
    ClientsModule.register([
      {
        name:'USER_CLIENT',
        transport:Transport.RMQ,
        options:{
          urls:['amqp://localhost:5672'],
          queue:'user_queue'
        }
      }
  ])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
