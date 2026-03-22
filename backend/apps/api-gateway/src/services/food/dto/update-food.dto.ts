import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateFoodDto{

    @IsOptional()
    @IsString()
    description:string;

    @IsOptional()
    @IsNumber()
    price:number;
}