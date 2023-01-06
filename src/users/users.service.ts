import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {hash,compare} from 'bcrypt';
import { UserStatus } from 'src/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserResponse } from './dto/response/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository:UsersRepository){}
  async create(userId:string,createUserDto: CreateUserDto):Promise<UserResponse> {
    await this.validateCreateUserEmail(createUserDto);

    const user= await this.usersRepository.insertOne({...createUserDto,
    password:await hash(createUserDto.password,10),status:UserStatus.OPEN, createdAt:new Date(),createdBy:userId});
     return this.buildResponse(user);
  }


  async validateUser(email:string,password:string):Promise<UserResponse>{
    const user = await this.usersRepository.findUserByEmail(email);
 if(!user){
      throw new NotFoundException(`User does not exists by email: '${email}'.`);
    }
    const passwordIsValid = await compare(password,user.password);
    if(!passwordIsValid){
      throw new UnauthorizedException(`Invalid username or password!!!`);
    }
    if(user.status !== UserStatus.OPEN){
      throw new UnauthorizedException('Error occurred, Please contact the Administrator!!');
  }

    return this.buildResponse(user);
  }
private async buildResponse(user:User):Promise<UserResponse>{
  return await{
      _id:user._id.toHexString(),
      email:user.email,
      names:user.names,
      phone:user.phone,
      role:user.role,
      status:user.status
  };
}
private async validateCreateUserEmail(createUserDto:CreateUserDto){
    const user = await this.usersRepository.findUserByEmail(createUserDto.email);
    if(user){
      throw new BadRequestException('This email already exist!');
    }
}
async  getUserById(userId:string):Promise<UserResponse>{
const user = await this.usersRepository.getUserById(userId);
if(!user){
  throw new NotFoundException(`User not found by _id: ${userId}`);
}
return this.buildResponse(user);
}
 async findAll():Promise<any> {
  const users = await this.usersRepository.getAllUsers();
  return users;
    
  }

  async findOne(id: string):Promise<UserResponse> {
    const user = await this.usersRepository.getUserById(id);
    if(!user){
      throw new BadRequestException(`User does not exists for _id: ${id}.`)
    }
    return this.buildResponse(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto,userId:string):Promise<UserResponse> {
    let  {names,email,password,phone,currency,updatedAt,updatedBy,status,...rest}= updateUserDto;

   const _updateUserDto = {names:names,email:email,password:password,phone:phone,updatedAt:new Date(),updatedBy:userId,status}
    if(password !==''??'undefined'){
      const user = await this.usersRepository.updateUser(id,{..._updateUserDto,password:await hash(updateUserDto.password,10),});
      return await this.buildResponse(user);
 
    }
    const user = await this.usersRepository.updateUser(id,{names,email,phone,updatedAt:new Date(),updatedBy:userId,status});
    return await this.buildResponse(user);
  }

  async remove(id: string):Promise<UserResponse> {
   
    const deletedUser = await this.usersRepository.deleteUser(id);
   

if(!deletedUser){
  throw new BadRequestException(`There is a problem deleting user with _id: ${id}`);
}
    return await this.buildResponse(deletedUser);
  }
}
