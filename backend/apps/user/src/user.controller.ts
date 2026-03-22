import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserResponseInterface } from './type/user-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.findAll')
  async findAll(): Promise<UserResponseInterface[]>{
    const users = await this.userService.findAll();
    const response = users.map(user=>this.userService.response(user))
    return response;
  }

  @MessagePattern('user.createUser')
  async createUser(@Payload('createUserDto')createUserDto:CreateUserDto): Promise<UserResponseInterface>{
    const user = await this.userService.createUser(createUserDto);
    return this.userService.response(user)
  }
  @MessagePattern('user.whoAmI')
  async whoAmI(@Payload('user')user){
    return user
  }

  @MessagePattern('user.findUserById')
  async findUserById(@Payload('id')id:number): Promise<UserResponseInterface>{
    const user = await this.userService.findUserById(id)
    return this.userService.response(user)
  }

  @MessagePattern('user.findUserByEmail')
  async findUserByEmail(@Payload('email')email:string): Promise<UserEntity | null>{
    return await this.userService.findUserByEmail(email);
  }

  @MessagePattern('user.login')
  async login(@Payload('loginDto')loginDto){
    console.log(loginDto)
    const user = await this.userService.login(loginDto)
    return this.userService.response(user);
  }
}
