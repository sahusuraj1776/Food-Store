import { Body, Controller, Get, HttpException, Inject, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import { UserResponseInterface } from "./type/user-response.interface";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "../../guard/auth.guard";
import { AdminGuard } from "../../guard/admin.guard";
import { User } from "../../decorator/user.decorator";

@Controller('user')
export class UserController{
    constructor(
        @Inject('USER_CLIENT')private readonly userClient:ClientProxy,
        @Inject('AUTH_CLIENT')private readonly authClient:ClientProxy
    ){}

    @Get()
    @UseGuards(AuthGuard,AdminGuard)
    async findAll(): Promise<UserResponseInterface[]>{
        const pattern = 'user.findAll'
        const payload = ''
        const response = this.userClient.send(pattern,payload).pipe(timeout(3000))
        const users = await firstValueFrom(response)
        return users;
    }

    @Post('register')
    async registerUser(@Body()createUserDto:CreateUserDto): Promise<UserResponseInterface>{
        const pattern = 'user.createUser'
        const payload = {createUserDto}
        console.log(createUserDto)
        try {
            const response = this.userClient.send(pattern,payload).pipe(timeout(3000))
            const user = await firstValueFrom(response)
            return user;
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Post('login')
    async login(@Body()loginDto){
        console.log(loginDto)
        const pattern = 'user.login'
        const payload = {loginDto}
        try {
            const response = this.userClient.send(pattern,payload).pipe(timeout(3000))
            const user = await firstValueFrom(response)
            return await firstValueFrom(this.authClient.send('auth.generateToken',{email:user.email,id:user.id}))
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Get('me')
    @UseGuards(AuthGuard)
    whoAmI(@User()user){
        return user
    }

    @Get(':id')
    @UseGuards(AuthGuard,AdminGuard)
    async findUserById(@Param('id',ParseIntPipe)id:number): Promise<UserResponseInterface>{
        const pattern = 'user.createUser'
        const payload = {id}
        try {
            const response = this.userClient.send(pattern,payload).pipe(timeout(3000))
            const user = await firstValueFrom(response)
            return user;
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }
}