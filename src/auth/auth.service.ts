import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {Response} from 'express';
import { UserResponse } from 'src/users/dto/response/user-response.dto';

export interface TokenPayload {
userId : string;
roles:string;
// email:string;
//     names:string;
//      phone:string;
 
}

@Injectable()
export class AuthService {
  
  constructor(private readonly configService: ConfigService, private readonly jwtService:JwtService){}
  async login(user:UserResponse, response:Response):Promise<void>{

const tokenPayload :TokenPayload ={
  userId:user._id,
  roles:user.role
}
const expires = new Date();
expires.setSeconds(expires.getDate()+ this.configService.get('JWT_EXPIRATION_TIME'));

const token = this.jwtService.sign(tokenPayload);
// console.log(token)
response.cookie('Authentication',token,{httpOnly:true,expires})
  }
}
