import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { FoodCategory } from "../enum/food-category.enum";


export class InsertFoodDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsEnum(FoodCategory)
    @IsNotEmpty()
    category:string;

    @IsString()
    @IsNotEmpty()
    image:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;
}