import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Wallet } from "./entities/wallet.entity";

@Injectable()
export class WalletRepository{
    constructor(
        @InjectModel(Wallet.name)
        private readonly wallet: Model<Wallet>
    ){}
    async insertOne(data:Partial<Wallet>):Promise<any>{
        try{
          const wallet = await new this.wallet(data);
        return wallet.save()  
        }catch(err){
            throw new BadRequestException(err.message);
        }
        
    }

  
    async findWalletByUserId(userId:string):Promise<Wallet>{
        try{
             const wallet = await this.wallet.findOne({user_id:userId});
        if(!wallet){
            throw new HttpException(`Wallet for userId: ${userId} not found!!`, HttpStatus.NOT_FOUND);
        }
        return wallet;
        }catch(err){
            throw new BadRequestException(err);
        }
       
    }

    async getWalletByCurrencyAndUserId(userId:string, currencyCode:string):Promise<any>{
        try{
            const wallet = await this.wallet.find( {$and: [{user_id:userId,currency:currencyCode} ]});
         return wallet
        }catch(err){
            throw new BadRequestException(err.message);
        }
        
    }
    
    async getWalletById(id:string):Promise<Wallet>{
        try{
        const wallet = await this.wallet.findById(id);
        if(!wallet){
            throw new HttpException(`Wallet for _id: ${id} not found!!`, HttpStatus.NOT_FOUND);
         }
        return wallet;
    }catch(err){
        throw new BadRequestException(err.message);
    }
    }

    async getAllWallet():Promise<Wallet[]>{
return await this.wallet.find();
    }

    async deleteWallet(id:string):Promise<Wallet>{
        try{
       return await this.wallet.findByIdAndDelete(id);     
        }catch(err){
            throw new BadRequestException(err.message);
        }

    }

    async updateWallet(id:string, data:any):Promise<Wallet>{
        try{
           const wallet = await this.wallet.findByIdAndUpdate(id,data,{new:true});
        if(!wallet){
            throw new HttpException(`Wallet for _id: ${id} not found!!`, HttpStatus.NOT_FOUND);
        }
        return wallet; 
        }catch(err){
            throw new BadRequestException(err.message);
        }
        
    }

}