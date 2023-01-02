import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './request/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

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
    @IsString()
    role:string;
    @IsString()
    status: string;
    @IsDate()
    updatedAt: Date;
    @IsString()
    updatedBy: string;

}
