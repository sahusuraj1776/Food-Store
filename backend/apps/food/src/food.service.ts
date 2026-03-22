import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodEntity } from './entity/food.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { InsertFoodDto } from './dto/insert-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(@InjectRepository(FoodEntity) private readonly foodRespository:Repository<FoodEntity>){}
  
  async getAllFood(query:{category:string,page:number,size:number}) {
    const queryBuilder = this.foodRespository.createQueryBuilder('foods').select().addOrderBy('foods.id','ASC')
    if(query.category){
      queryBuilder.andWhere('foods.category=:category',{category:query.category})
    }
    const totalFoodItems = await queryBuilder.getCount();

    if(query.page && query.size){
      queryBuilder.limit(query.size)
      queryBuilder.offset((query.page - 1) * query.size)
    }
    const foods = await queryBuilder.getMany()
    const response = {foods,totalFoodItems}

    return response
  }

  async insertFood(insertFoodDto:InsertFoodDto) {
    console.log(insertFoodDto);
    
    const check = await this.foodRespository.findOne({where:{name:insertFoodDto.name}})
    console.log(check);
    
    if(check){
      throw new RpcException({message:"Food Item Already Exists",status:HttpStatus.CONFLICT})
    }
    const food = new FoodEntity();
    Object.assign(food,insertFoodDto);
    return await this.foodRespository.save(food);

    // for(let i=1;i<=50;i++){
    //   const foodObj = new FoodEntity()
    //   const data = await (await fetch(`https://dummyjson.com/recipes/${i}`)).json();
    //   const description = data.instructions.join(" ");
    //   const add = {
    //     name:data.name,
    //     description:description,
    //     category:data.cuisine,
    //     image:data.image,
    //     price:Math.random()*100
    //   }
    //   Object.assign(foodObj,add)
    //   await this.foodRespository.save(foodObj);
    // }
  }

  async getFoodById(id:number){
    const food = await this.foodRespository.findOne({where:{id}})
    if(!food){
      throw new RpcException({message:"Food Item Not Found",status:HttpStatus.NOT_FOUND})
    }
    return food;
  }

  async updateFood(id:number,updateFoodDto:UpdateFoodDto) {
    const food = await this.getFoodById(id);
    Object.assign(food,updateFoodDto)
    return await this.foodRespository.save(food);

  }

  async deleteFood(id:number){
    await this.getFoodById(id)
    return await this.foodRespository.delete({id})
  }
}
