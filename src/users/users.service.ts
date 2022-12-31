import { BadRequestException, Injectable } from '@nestjs/common';
import {hash} from 'bcrypt';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UserResponse } from './dto/response/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository:UsersRepository){}
  async create(createUserDto: CreateUserDto):Promise<UserResponse> {
    await this.validateCreateUserEmail(createUserDto);
    
    const user= await this.usersRepository.insertOne({...createUserDto,
    password:await hash(createUserDto.password,10),});
     return this.buildResponse(user);
  }
private buildResponse(user:User):UserResponse{
  return {
      _id:user._id.toHexString(),
      email:user.email,
      names:user.names,
      phone:user.phone,
      currency:user.currency
  };
}
private async validateCreateUserEmail(createUserDto:CreateUserDto){
    const user = await this.usersRepository.findUserByEmail(createUserDto.email);
    if(user){
      throw new BadRequestException('This email already exist!');
    }
}
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
