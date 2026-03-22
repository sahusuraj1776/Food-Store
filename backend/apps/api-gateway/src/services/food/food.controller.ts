import { Body, Controller, Delete, Get, HttpException, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, timeout } from "rxjs";
import { InsertFoodDto } from "./dto/insert-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { AdminGuard } from "../../guard/admin.guard";
import { AuthGuard } from "../../guard/auth.guard";

@Controller('food')
export class FoodController{

    constructor(@Inject('FOOD_CLIENT')private readonly foodClient:ClientProxy){}

    @Get()
    async getAllFood(@Query()query:{category:string,page:number,size:number}){
        const pattern = 'food.getAllFood'
        const payload = {query}
        try {
            const response = this.foodClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Post()
    @UseGuards(AuthGuard,AdminGuard)
    async insertFood(@Body()insertFoodDto:InsertFoodDto){
        const pattern = 'food.insertFood'
        const payload = {insertFoodDto}
        try {
            const response = this.foodClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Get(':id')
    async getFoodById(@Param('id',ParseIntPipe)id:number){
        console.log("Get Single item")
        const pattern = 'food.getFoodById'
        const payload = {id}
        try {
            const response = this.foodClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Patch(':id')
    @UseGuards(AuthGuard,AdminGuard)
    async updateFood(@Param('id',ParseIntPipe)id:number,@Body()updateFoodDto:UpdateFoodDto){
        const pattern = 'food.updateFood'
        const payload = {id,updateFoodDto}
        try {
            const response = this.foodClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard,AdminGuard)
    async deleteFood(@Param('id',ParseIntPipe)id:number){
        const pattern = 'food.deleteFood'
        const payload = {id}
        try {
            const response = this.foodClient.send(pattern,payload).pipe(timeout(3000))
            return await firstValueFrom(response)
        } catch (error) {
            throw new HttpException(error.message,error.status)
        }
    }
}