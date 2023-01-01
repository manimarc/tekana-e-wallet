import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {hash,compare} from 'bcrypt';
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
  async validateUser(email:string,password:string):Promise<UserResponse>{
    const user = await this.usersRepository.findUserByEmail(email);

    if(!user){
      throw new NotFoundException(`User does not exists by email: '${email}'.`);
    }
    const passwordIsValid = await compare(password,user.password);
    if(!passwordIsValid){
      throw new UnauthorizedException(`Invalid username or password!!!`);
    }

    return this.buildResponse(user);
  }
private buildResponse(user:User):UserResponse{
  return {
      _id:user._id.toHexString(),
      email:user.email,
      names:user.names,
      phone:user.phone,
      currency:user.currency,
      role:user.role
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
 async findAll():Promise<UserResponse> {
  const users = await this.usersRepository.getAllUsers();
  console.log(users);
  return this.buildResponse(users);
    
  }

  async findOne(id: string):Promise<UserResponse> {
    const user = await this.usersRepository.getUserById(id);
    return this.buildResponse(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string):Promise<UserResponse> {
    const deletedUser = await this.usersRepository.deleteUser(id);
if(!deletedUser){
  throw new BadRequestException(`There is a problem deleting user with _id: ${id}`);
}
    return await this.buildResponse(deletedUser);
  }
}
