import { Controller, Get } from '@nestjs/common';
import { FoodService } from './food.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InsertFoodDto } from './dto/insert-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @MessagePattern('food.getAllFood')
  getAllFood(@Payload('query')query:{category:string,page:number,size:number}){
    return this.foodService.getAllFood(query);
  }

  @MessagePattern('food.insertFood')
  insertFood(@Payload('insertFoodDto')insertFoodDto:InsertFoodDto){
    return this.foodService.insertFood(insertFoodDto)
  }

  @MessagePattern('food.getFoodById')
  async getFoodById(@Payload('id')id:number){
    return await this.foodService.getFoodById(id)
  }

  @MessagePattern('food.updateFood')
  async updateFood(@Payload('id')id:number,@Payload('updateFoodDto')updateFoodDto:UpdateFoodDto){
    return await this.foodService.updateFood(id,updateFoodDto);
  }

  @MessagePattern('food.deleteFood')
  async deleteFood(@Payload('id')id:number){
    return await this.foodService.deleteFood(id)
  }
}
