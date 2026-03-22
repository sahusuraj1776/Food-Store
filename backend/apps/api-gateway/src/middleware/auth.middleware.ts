import { HttpException, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { NextFunction, Request, Response } from "express";
import { firstValueFrom, timeout } from "rxjs";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(
        @Inject('AUTH_CLIENT')private readonly authClient:ClientProxy
    ){}

    async use(req: Request, res: Response, next:NextFunction) {
        if(!req.headers.authorization){
            req['user'] = null;
            next()
            return
        }
        const token = req.headers.authorization.split(' ')[1];
        const pattern = 'auth.validateToken'
        const payload = {token}
        try {
            const user = this.authClient.send(pattern,payload).pipe(timeout(3000))
            req['user'] = await firstValueFrom(user);
        } catch (error) {
            throw new HttpException(error.message,error.status);
        }
        next()
    }
    
}