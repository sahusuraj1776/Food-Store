import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const User = createParamDecorator((data:string,context:ExecutionContext)=>{
    const req = context.switchToHttp().getRequest()
    const user= req['user'];
    if(!user){
        return null
    }
    if(Object.keys(user).includes(data)){
        return user[data]
    }
    return user
})