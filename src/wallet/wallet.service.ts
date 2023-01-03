import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository:WalletRepository
     , private readonly usersService: UsersService
    ){}
  async create(createWalletDto: CreateWalletDto,userId:string):Promise<Wallet> {
    let {user_id,...rest} = createWalletDto;
    const isUniqueUserAndCurrency = await this.walletRepository.getWalletByCurrencyAndUserId(user_id,rest.currency);
    if(isUniqueUserAndCurrency){
      throw new BadRequestException(`Wallet account should be unique for currency: ${rest.currency}. instead use wallet _id: ${isUniqueUserAndCurrency[0]._id} !!!`);
    }
    return  this.walletRepository.insertOne({...rest,user_id:userId});
  }

  async findAll() {
    return await this.walletRepository.getAllWallet();
  }
async getWalletByUserId(userId:string):Promise<any>{
const wallet=  await this.walletRepository.findWalletByUserId(userId);
if(!wallet){
  throw new BadRequestException(`Wallet for userid: ${userId}  not found!!!`);
}
const user = await this.usersService.getUserById(wallet.user_id);
  return {wallet,user};
}
async getWalletByUserIdAndCurrency(userId:string, currency:string):Promise<any>{
const wallet = await this.walletRepository.getWalletByCurrencyAndUserId(userId,currency);
if(!wallet){
  throw new BadRequestException(`Wallet for userid: ${userId} and currency: ${currency} not found!!!`);
}
  const user = await this.usersService.getUserById( wallet[0].user_id);
  return {wallet,user};
}
  async findOne(id: string) {
    const wallet = await this.walletRepository.getWalletById(id);
    if(!wallet){
      throw new BadRequestException(`Wallet for _id: ${id} not found!!`);
    }
  const user = await this.usersService.getUserById(wallet.user_id);
 return {wallet,user};
  }

  async update(id: string, updateWalletDto: UpdateWalletDto,userId:string):Promise<Wallet> {

    return await this.walletRepository.updateWallet(id,{...updateWalletDto,updatedBy:userId,updatedAt:new Date()});
  }

  remove(id: string) {
    return `This action removes a #${id} wallet`;
  }
}
