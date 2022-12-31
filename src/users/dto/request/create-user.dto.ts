import { IsEmail, isEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class CreateUserDto {
    // @IsNumber()
    // user_id: number;
    @IsString()
    names:string;
    @IsEmail()
    email:string;
    @IsString()
    @IsNotEmpty()
    password:string;
    @IsString()
    phone:string;
    @IsString()
    currency: string;
    
}
