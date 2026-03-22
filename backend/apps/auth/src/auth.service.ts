import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT') private readonly userClient:ClientProxy,
    private readonly jwtService:JwtService
  ){}

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token);
      const userPayload = {id:payload.id}
      const pattern = 'user.findUserById'
      const response = this.userClient.send(pattern,userPayload).pipe(timeout(3000))
      return await firstValueFrom(response);

    } catch (error) {
      throw new RpcException({message:"Invalid Token",status:HttpStatus.UNAUTHORIZED});
    }
  }

  async generateToken(email:string,id:number) {
    const payload = {email,id}
    const token = this.jwtService.sign(payload)
    return {token}
  }
}
