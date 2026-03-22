import { Body, Controller, Delete, Get, HttpException, Inject, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import { InsertContactUsDto } from "./dto/insert-contact-us.dto";
import { AdminGuard } from "../../guard/admin.guard";


@Controller('contact-us')
export class ContactUsController{
    constructor(
        @Inject('CONTACT_US_CLIENT')private readonly contactUsClient:ClientProxy,
        @Inject('MAIL_CLIENT')private readonly mailClient:ClientProxy
    ){}

    @Get()
    @UseGuards(AdminGuard)
    async getAllRequest(){
        const pattern = 'contact-us.getAllRequest'
        const payload = {}
        try {
            const response = this.contactUsClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Post()
    async addRequest(@Body()insertContactUsDto:InsertContactUsDto){
        console.log("Inside Add Request")
        const pattern = 'contact-us.addRequest'
        const payload = {insertContactUsDto}
        const mailpattern = 'gmail.sendMail'
        const mailpayload = {mailBody:{to:insertContactUsDto.email,subject:"Thanks for Contacting Us!",message:`
            <h2>Hello ${insertContactUsDto.name},</h2>
            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
            <p><strong>Your Message:</strong></p>
            <p>${insertContactUsDto.message}</p>
            <br>
            <p>Regards,<br>FOOD STORE</p>
        `}}
        try {
            const response = this.contactUsClient.send(pattern,payload).pipe(timeout(3000))
            const res =  await firstValueFrom(response)
            this.mailClient.emit(mailpattern,mailpayload).pipe(timeout(3000))
            return res
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Get(':id')
    @UseGuards(AdminGuard)
    async getRequestById(@Param('id')id:number){
        const pattern = 'contact-us.getRequestById'
        const payload = {id}
        try {
            const response = this.contactUsClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }
    @Delete(':id')
    @UseGuards(AdminGuard)
    async deleteRequestById(@Param('id')id:number){
        const pattern = 'contact-us.deleteRequestById'
        const payload = {id}
        try {
            const response = this.contactUsClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Patch(':id')
    @UseGuards(AdminGuard)
    async updateRequestById(@Param('id')id:number){
        const pattern = 'contact-us.updateRequestById'
        const payload = {id}
        try {
            const response = this.contactUsClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }
}