import { Controller, Get } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @MessagePattern('contact-us.getAllRequest')
  async getAllRequest(){
    return await this.contactUsService.getAllRequest()
  }

  @MessagePattern('contact-us.addRequest')
  async addRequest(@Payload('insertContactUsDto')insertContactUsDto){
    return await this.contactUsService.addRequest(insertContactUsDto);
  }

  @MessagePattern('contact-us.getRequestById')
  async getRequestById(@Payload('id')id:number){
    return await this.contactUsService.getRequestById(id);
  }

  @MessagePattern('contact-us.deleteRequestById')
  async deleteRequestById(@Payload('id')id:number){
    return await this.contactUsService.deleteRequestById(id)
  }

  @MessagePattern('contact-us.updateRequestById')
  async updateRequestById(@Payload('id')id:number){
    return await this.contactUsService.updateRequestById(id);
  }
}
