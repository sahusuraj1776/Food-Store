import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class InsertContactUsDto{

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @Length(10,10)
    phone:string;

    @IsString()
    @IsNotEmpty()
    message:string;
}