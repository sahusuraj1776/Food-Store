import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.validateToken')
  async validateToken(@Payload('token')token:string){
    return await this.authService.validateToken(token);
  }

  @MessagePattern('auth.generateToken')
  async generateToken(@Payload('email')email:string,@Payload('id')id:number): Promise<{token: string}>{
    return await this.authService.generateToken(email,id)
  }
}
