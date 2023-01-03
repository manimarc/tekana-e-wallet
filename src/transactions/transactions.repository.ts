

import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "./entities/transaction.entity";

@Injectable()
export class TransactionsRepository{
    constructor(
        @InjectModel(Transaction.name)
        private readonly transaction: Model<Transaction>
    ){}
    async insertOne(data:Partial<Transaction>):Promise<any>{
        const transaction = await new this.transaction(data);
        return transaction.save()
    }

  
    async findWalletByUserId(userId:string):Promise<Transaction>{
        const transaction = await this.transaction.findOne({user_id:userId});
        if(!transaction){
            throw new BadRequestException(`transaction for userid: ${userId} not found!!!!`);
        }
        return transaction;
    }

    async getWalletByCurrencyAndUserId(userId:string, currencyCode:string):Promise<any>{
        const transaction = await this.transaction.find( {$and: [{user_id:userId,currency:currencyCode} ]});
        if(!transaction){
            throw new BadRequestException(`transaction for userid: ${userId} and currency: ${currencyCode} not found!!!`);
        }

        return transaction
    }
    
    async getWalletById(id:string):Promise<Transaction>{
        const transaction = await this.transaction.findById(id);
        if(!transaction){
            throw new BadRequestException(`transaction with _id: ${id} not found!!.`);
        }
        return transaction;
    }

    async getAllWallet():Promise<Transaction[]>{
return await this.transaction.find();
    }

    async deleteWallet(id:string):Promise<Transaction>{
return await this.transaction.findByIdAndDelete(id);
    }

    async updateWallet(id:string, data:any):Promise<Transaction>{
        const transaction = await this.transaction.findByIdAndUpdate(id,data,{new:true});
        if(!transaction){
            throw new BadRequestException(`transaction with _id: ${id} not found!!.`);
        }
        return transaction;
    }
}
