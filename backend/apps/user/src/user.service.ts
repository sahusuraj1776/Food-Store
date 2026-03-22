import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { UserResponseInterface } from './type/user-response.interface';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity)private readonly userRepository:Repository<UserEntity>){}

  response(user:UserEntity):UserResponseInterface{
    return {
      id:user?.id,
      email:user?.email,
      name:user?.name,
      role:user?.role
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async createUser(createUserDto) {
    const userInstance = new UserEntity;
    Object.assign(userInstance,createUserDto);
    const user = await this.findUserByEmail(userInstance.email);
    if(user){
      throw new RpcException({message:"User Already Exists",status:HttpStatus.CONFLICT})
    }
    return await this.userRepository.save(userInstance)
  }

  async findUserById(id:number) {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new RpcException({message:"User Not Found",status:HttpStatus.CONFLICT})
    }
    return user
  }

  async findUserByEmail(email:string) {
    return await this.userRepository.findOne({where:{email}})
  }

  async login(loginDto: any): Promise<UserEntity> {
    const user = await this.findUserByEmail(loginDto.email)
    if(!user){
      throw new RpcException({message:'User Doesn\'t Exists',status:HttpStatus.NOT_FOUND})
    }
    const checkPassword =await compare(loginDto.password,user.password);
    
    if(!checkPassword){
      throw new RpcException({message:'Invalid Password',status:HttpStatus.CONFLICT})
    }
    return user
  }
}
