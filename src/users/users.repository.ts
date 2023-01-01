import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository{
    constructor(
        @InjectModel(User.name)
        private readonly user: Model<User>
    ){}
    async insertOne(data:Partial<User>):Promise<User>{
        const user = new this.user(data);
        return user.save()
    }

    async findMaxUserColumn(maxColumnValue){
        return await this.user.find().sort({maxColumnValue:-1}).limit(1).then(function(u){return u}) ;
    }
    async findUserByEmail(email:string):Promise<User>{
        return await this.user.findOne({email:email});
    }
    async getUserById(userId:string):Promise<User>{
        return await this.user.findById(userId);
    }

    async getAllUsers():Promise<any>{
return await this.user.find();
    }

    async deleteUser(id:string):Promise<User>{
return await this.user.findByIdAndDelete(id);
    }
}