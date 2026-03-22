import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "../enum/role.enum";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    // @IsStrongPassword({minLength:8})
    @IsNotEmpty()
    password:string;

    @IsOptional()
    @IsEnum(Role)
    role:Role;
}