

import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
        try{
        const transaction = await new this.transaction(data);
        return transaction.save();
        }catch(err){
            throw new BadRequestException(err.message);
        }
    }

  
    async findTransactionByUserId(userId:string):Promise<Transaction>{
        try{
        const transaction = await this.transaction.findOne({user_id:userId});
        if(!transaction){
            throw new HttpException(`Transaction  for userid: ${userId} not found!!!`, HttpStatus.NOT_FOUND);
   }
        return transaction;
    }catch(err){
        throw new BadRequestException(err.message);
    }
    }

    async getTransactionByCurrencyAndUserId(userId:string, currencyCode:string):Promise<any>{
        try{
        const transaction = await this.transaction.find( {$and: [{user_id:userId,currency:currencyCode} ]});
        if(!transaction){
            throw new HttpException(`Transaction  for userid: ${userId} and currency: ${currencyCode}  not found!!!`, HttpStatus.NOT_FOUND);
        }

        return transaction
    }catch(err){
        throw new BadRequestException(err.message);
    }
    }
    
    async getTransactionById(id:string):Promise<Transaction>{
        try{
        const transaction = await this.transaction.findById(id);
        if(!transaction){
            throw new HttpException(`Transaction  for userid: ${id} not found!!!`, HttpStatus.NOT_FOUND);
         }
        return transaction;
    }catch(err){
        throw new BadRequestException(err.message);
    }
    }

    async getAllTransaction():Promise<Transaction[]>{
        try{
            return await this.transaction.find();
        }catch(err){
            throw new BadRequestException(err.message);
        }
    }

    async deleteTransaction(id:string):Promise<Transaction>{
        try{
return await this.transaction.findByIdAndDelete(id);
        }catch(err){
            throw new BadRequestException(err.message);
        }
    }

    async updateTransaction(id:string, data:any):Promise<Transaction>{
        try{
        const transaction = await this.transaction.findByIdAndUpdate(id,data,{new:true});
        if(!transaction){
            throw new HttpException(`Transaction  for userid: ${id} not found!!!`, HttpStatus.NOT_FOUND);
          }
        return transaction;
    }catch(err){
        throw new BadRequestException(err.message);
    }
    }
}
