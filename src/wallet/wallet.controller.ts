import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(
    @Req() req,
    @Body() createWalletDto: CreateWalletDto,
  ): Promise<Wallet> {
    const wallet = await this.walletService.create(
      createWalletDto,
      req.user._id,
    );
    return wallet;
  }
  @Get('userid_currency')
  async getWalletByUserIdAndCurrency(
    @Query('userId') userId: string,
    @Query('currency') currency: string,
  ): Promise<Wallet> {
    return this.walletService.getWalletByUserIdAndCurrency(userId, currency);
  }

  @Get('userid')
  async getWalletByUserId(@Query('userId') userId: string): Promise<Wallet> {
    return await this.walletService.getWalletByUserId(userId);
  }
  @Get()
  @Roles(Role.Agent, Role.Admin)
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Agent, Role.Admin)
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return this.walletService.update(id, updateWalletDto, req.user._id);
  }

  @Patch('deposit_wallet/:id')
  async depositWallet(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    return this.walletService.depositWallet(id, updateWalletDto, req.user._id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.walletService.remove(id);
  }
}
