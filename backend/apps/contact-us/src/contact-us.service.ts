import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactUsEntity } from './entity/contact-us.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ContactUsService {
  constructor(@InjectRepository(ContactUsEntity)private readonly contactUsRepository:Repository<ContactUsEntity>){}
  
  async getAllRequest() {
    return await this.contactUsRepository.find()
  }

  async getRequestById(id:number){
    const request = await this.contactUsRepository.findOne({where:{id}})
    if(!request){
      throw new RpcException({message:'Request with this id doesn\'t exists.',status:HttpStatus.CONFLICT})
    }
    return request;
  }

  async getRequestByEmail(email:string){
    const request = await this.contactUsRepository.findOne({where:{email}})
    return request;
  }

  async getRequestByPhone(phone:string){
    const request = await this.contactUsRepository.findOne({where:{phone}})
    return request;
  }
  
  async addRequest(insertContactUsDto: any) {
    const checkPhone = await this.getRequestByEmail(insertContactUsDto.email)
    const checkEmail = await this.getRequestByPhone(insertContactUsDto.phone)

    if(checkPhone || checkEmail){
      throw new RpcException({message:'Request is Already Exists with this Email or Phone No.',status:HttpStatus.CONFLICT})
    }

    const contactUsObject = new ContactUsEntity();
    Object.assign(contactUsObject,insertContactUsDto)
    return await this.contactUsRepository.save(contactUsObject)
  }

  async deleteRequestById(id:number){
    const request = await this.getRequestById(id)
    if(!request.contacted){
      throw new RpcException({message:'You haven\'t contacted to this guy so you can\'t delete it.',status:HttpStatus.CONFLICT})
    }
    return await this.contactUsRepository.delete(id)
  }

  async updateRequestById(id:number){
    const request =await this.getRequestById(id);
    request.contacted = true;
    return await this.contactUsRepository.save(request)
  }
}
