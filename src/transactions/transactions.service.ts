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
    const transactioonRef =createTransactionDto.type.substring(0,3)+ new Date().getFullYear() + new Date().getMonth()+ new Date().getDay() + new Date().getHours()+ new Date().getMinutes();
   
    //find the current balance
    const wallet = await this.walletRepository.getWalletById(createTransactionDto.wallet_debited);
     const balance_debit = wallet.balance-(createTransactionDto.debited_amount + createTransactionDto.fee_or_charges);
   
     if(wallet.balance < (createTransactionDto.debited_amount + createTransactionDto.fee_or_charges)){
    await this.transactionsRepository.insertOne({...createTransactionDto,reference_id:transactioonRef,createdAt:new Date(),createdBy:userId, status:TransactionStatus.FAIL});
    throw new BadRequestException(`Insuficient amount!!!!!`);
   }
   const isSuccessTrans = await this.transactionsRepository.insertOne({...createTransactionDto,reference_id:transactioonRef,createdAt:new Date(),createdBy:userId,balance_before_debited:wallet.balance,balance_after_debited:wallet.balance-(createTransactionDto.debited_amount + createTransactionDto.fee_or_charges)});
   if(!isSuccessTrans){
    throw new BadRequestException(`Error in performing ${createTransactionDto.type} operation.`);
   }
   const updateWallet_debited= await this.walletService.update(createTransactionDto.wallet_debited,{
     balance: balance_debit,
     updatedAt: new Date(),
     updatedBy: userId,
   },userId);

   const updateWallet_creadited = await this.walletService.update(createTransactionDto.wallet_credited,{
    balance :balance+ createTransactionDto.credited_amount,
    updatedAt: new Date(),
    updatedBy: userId
  },userId);

   if(!updateWallet_debited || !updateWallet_creadited ){
    throw new BadRequestException(`Error occors updating the balances!!!`);
   }
    return  isSuccessTrans;
  }

  findAll() {
    return this.transactionsRepository.getAllWallet();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
