import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Req() req, @Body() createWalletDto: CreateWalletDto):Promise<Wallet> {
console.log(createWalletDto)
const wallet = await this.walletService.create(createWalletDto,req.user._id);
    return  wallet;
  }
@Get('/userid_currency')
async getWalletByUserIdAndCurrency(@Query('userId') userId:string, @Query('currency') currency:string):Promise<Wallet>{
 
  return this.walletService.getWalletByUserIdAndCurrency(userId,currency);
}

@Get('userid')
async getWalletByUserId(@Query('userId') userId:string):Promise<Wallet>{

  return await this.walletService.getWalletByUserId(userId);

}
  @Get()
  findAll() {
    return this.walletService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @Patch(':id')
  update(@Req() req,@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(id, updateWalletDto,req.user._id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(id);
  }
}
