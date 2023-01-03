import { BadRequestException, Injectable } from "@nestjs/common";
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
        const wallet = await new this.wallet(data);
        return wallet.save()
    }

  
    async findWalletByUserId(userId:string):Promise<Wallet>{
        const wallet = await this.wallet.findOne({user_id:userId});
        if(!wallet){
            throw new BadRequestException(`Wallet for userid: ${userId} not found!!!!`);
        }
        return wallet;
    }

    async getWalletByCurrencyAndUserId(userId:string, currencyCode:string):Promise<any>{
        const wallet = await this.wallet.find( {$and: [{user_id:userId,currency:currencyCode} ]});
        if(!wallet){
            throw new BadRequestException(`Wallet for userid: ${userId} and currency: ${currencyCode} not found!!!`);
        }

        return wallet
    }
    
    async getWalletById(id:string):Promise<Wallet>{
        const wallet = await this.wallet.findById(id);
        if(!wallet){
            throw new BadRequestException(`Wallet with _id: ${id} not found!!.`);
        }
        return wallet;
    }

    async getAllWallet():Promise<Wallet[]>{
return await this.wallet.find();
    }

    async deleteWallet(id:string):Promise<Wallet>{
return await this.wallet.findByIdAndDelete(id);
    }

    async updateWallet(id:string, data:any):Promise<Wallet>{
        const wallet = await this.wallet.findByIdAndUpdate(id,data,{new:true});
        if(!wallet){
            throw new BadRequestException(`Wallet with _id: ${id} not found!!.`);
        }
        return wallet;
    }
}