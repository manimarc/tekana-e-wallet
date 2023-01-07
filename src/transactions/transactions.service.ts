import { BadRequestException, Injectable } from '@nestjs/common';
import { now } from 'mongoose';
import { TransactionStatus } from 'src/common';
import { WalletRepository } from 'src/wallet/wallet.repository';
import { WalletService } from 'src/wallet/wallet.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository:TransactionsRepository,
    private readonly walletRepository:WalletRepository,private readonly walletService:WalletService){}
  async create(createTransactionDto: CreateTransactionDto,userId:string):Promise<any> {
    try{
    const transactioonRef =createTransactionDto.type.substring(0,3)+ new Date().getFullYear() + new Date().getMonth()+ new Date().getDay() + new Date().getHours()+ new Date().getMinutes();
   
   
    const wallet_deb = await this.walletRepository.getWalletById(createTransactionDto.wallet_debited);
    const wallet_cred = await this.walletRepository.getWalletById(createTransactionDto.wallet_credited);
    //find the current balance for debited wallet
    const balance_debit = wallet_deb.balance-(createTransactionDto.debited_amount + createTransactionDto.fee_or_charges);
   
     if(wallet_deb.balance < (createTransactionDto.debited_amount + createTransactionDto.fee_or_charges)){
    await this.transactionsRepository.insertOne({...createTransactionDto,reference_id:transactioonRef,createdAt:new Date(),createdBy:userId, status:TransactionStatus.FAIL});
    throw new BadRequestException(`Insuficient amount!!!!!`);
   }
   if(wallet_cred.currency !== wallet_deb.currency){
    throw new BadRequestException(`Credited account's currency : ${wallet_cred.currency} is not the same as debited account's currency: ${wallet_deb.currency} `);
   }
   if(wallet_cred.currency !== createTransactionDto.currency_credited){
    throw new BadRequestException(`The specified currrencies are different!!!!`);
   }
   if(wallet_deb.currency !== createTransactionDto.currency_debited){
    throw new BadRequestException(`The specified currrencies are different!!!!`);
   }
   if(!wallet_cred){
    throw new BadRequestException(`The specified account #: ${createTransactionDto.wallet_credited} for ${createTransactionDto.type} not found!!`);
   }
   if(createTransactionDto.wallet_credited ===createTransactionDto.wallet_debited){
    throw new BadRequestException(`Wallet debited #: ${createTransactionDto.wallet_debited} and Wallet credited #: ${createTransactionDto.wallet_credited} are the same!!!`);
   }
   const isSuccessTrans = await this.transactionsRepository.insertOne({...createTransactionDto,reference_id:transactioonRef,createdAt:new Date(),createdBy:userId,balance_before_debited:wallet_deb.balance,balance_after_debited:wallet_deb.balance-(createTransactionDto.debited_amount + createTransactionDto.fee_or_charges),
    balance_before_credited:wallet_cred.balance,balance_after_credited:wallet_cred.balance+createTransactionDto.credited_amount});
   if(!isSuccessTrans){
    await this.transactionsRepository.insertOne({...createTransactionDto,reference_id:transactioonRef,createdAt:new Date(),createdBy:userId,balance_before_debited:wallet_deb.balance,balance_after_debited:wallet_deb.balance-(createTransactionDto.debited_amount + createTransactionDto.fee_or_charges),
      balance_before_credited:wallet_cred.balance,balance_after_credited:wallet_cred.balance+createTransactionDto.credited_amount,status:TransactionStatus.FAIL});
   
    throw new BadRequestException(`Error in performing ${createTransactionDto.type} operation.`);
   }
   // update the balance for debited wallet
   const updateWallet_debited= await this.walletService.update(createTransactionDto.wallet_debited,{
     balance: balance_debit,
     updatedAt: new Date(),
     updatedBy: userId,
   },userId);
   // update the balance for credited wallet

   const updateWallet_creadited = await this.walletService.update(createTransactionDto.wallet_credited,{
    balance :wallet_cred.balance + createTransactionDto.credited_amount,
    updatedAt: new Date(),
    updatedBy: userId
  },userId);
    // check the success of the balance on both accounts
   if(!updateWallet_debited && !updateWallet_creadited ){
     await this.transactionsRepository.insertOne({...createTransactionDto,reference_id:transactioonRef,createdAt:new Date(),createdBy:userId,balance_before_debited:wallet_deb.balance,balance_after_debited:wallet_deb.balance-(createTransactionDto.debited_amount + createTransactionDto.fee_or_charges),
      balance_before_credited:wallet_cred.balance,balance_after_credited:wallet_cred.balance+createTransactionDto.credited_amount,status:TransactionStatus.FAIL});
     
    throw new BadRequestException(`Error occurs updating the balances!!!`);
   }
    return  isSuccessTrans;
  }catch(err){
    throw new BadRequestException(err.message);
  }
  }

  async findAll() {
    return await this.transactionsRepository.getAllTransaction();
  }

  async findOne(id: string):Promise<Transaction> {

    return await this.transactionsRepository.getTransactionById(id);
  }
  
  async update(id: string, updateTransactionDto: UpdateTransactionDto,userId:string):Promise<Transaction> {
  try{
      const transaction = await this.transactionsRepository.updateTransaction(id,{...updateTransactionDto,updatedAt:new Date(),updatedBy:userId})
      return transaction;
    }catch(err){
      throw new BadRequestException(err.message);
    }
  }

  async remove(id: string) {
    return await this.transactionsRepository.deleteTransaction(id);
  }
}
