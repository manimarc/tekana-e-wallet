import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { WalletRepository } from './wallet.repository';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createWalletDto: CreateWalletDto,
    userId: string,
  ): Promise<Wallet> {
    const { user_id, ...rest } = createWalletDto;
    const isUniqueUserAndCurrency =
      await this.walletRepository.getWalletByCurrencyAndUserId(
        user_id,
        rest.currency,
      );
    if (isUniqueUserAndCurrency.length > 0) {
      throw new BadRequestException(
        `Wallet account should be unique for currency: ${rest.currency}. instead use wallet _id: ${isUniqueUserAndCurrency[0]} !!!`,
      );
    }
    return this.walletRepository.insertOne({ ...rest, user_id: userId });
  }

  async findAll() {
    return await this.walletRepository.getAllWallet();
  }
  async getWalletByUserId(userId: string): Promise<any> {
    const wallet = await this.walletRepository.findWalletByUserId(userId);
    if (!wallet) {
      throw new HttpException(
        `Wallet for userid: ${userId} not found!!`,
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.usersService.getUserById(wallet.user_id);
    return { wallet, user };
  }
  async getWalletByUserIdAndCurrency(
    userId: string,
    currency: string,
  ): Promise<any> {
    const wallet = await this.walletRepository.getWalletByCurrencyAndUserId(
      userId,
      currency,
    );
    if (!wallet) {
      throw new HttpException(
        `Wallet for userid: ${userId} and currency: ${currency} not found!!`,
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.usersService.getUserById(wallet[0].user_id);
    return { wallet, user };
  }
  async findOne(id: string) {
    const wallet = await this.walletRepository.getWalletById(id);
    if (!wallet) {
      throw new HttpException(
        `Wallet for _id: ${id} not found!!`,
        HttpStatus.NOT_FOUND,
      );
    }
    const user = await this.usersService.getUserById(wallet.user_id);
    return { wallet, user };
  }

  async update(
    id: string,
    updateWalletDto: UpdateWalletDto,
    userId: string,
  ): Promise<any> {
    return await this.walletRepository.updateWallet(id, {
      balance: updateWalletDto.balance,
      currency: updateWalletDto.currency,
      updatedBy: userId,
      updatedAt: new Date(),
    });
  }

  async remove(id: string): Promise<Wallet> {
    const wallet = await this.walletRepository.deleteWallet(id);
    if (!wallet) {
      throw new BadRequestException(`Error occurred deliting wallet!!!`);
    }
    return wallet;
  }

  async depositWallet(
    id: string,
    updateWalletDto: UpdateWalletDto,
    userId: string,
  ): Promise<any> {
    try {
      const wallet = await this.walletRepository.getWalletById(id);
      if (!wallet) {
        throw new HttpException(
          `Wallet for _id: ${id} not found!!`,
          HttpStatus.NOT_FOUND,
        );
      }
      const currentBalance = wallet.balance;
      if (wallet.currency !== updateWalletDto.currency) {
        throw new BadRequestException(
          `You are depositing amount of ${updateWalletDto.currency} currency into account with ${wallet.currency} currency!!!`,
        );
      }
      return await this.walletRepository.updateWallet(id, {
        balance: currentBalance + updateWalletDto.balance,
        updatedBy: userId,
        updatedAt: new Date(),
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
