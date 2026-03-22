import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";


export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest()
        const user = req['user']
        if(!user){
            return false
        }
        return true
    }
    
}