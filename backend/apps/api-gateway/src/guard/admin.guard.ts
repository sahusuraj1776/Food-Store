import { CanActivate, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "../services/user/enum/role.enum";


export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean  {
        const req = context.switchToHttp().getRequest()
        const user = req['user'];
        if(user.role === Role.Admin){
            return true
        }
        throw new HttpException("Access to Admin Only",HttpStatus.FORBIDDEN)
    }

}