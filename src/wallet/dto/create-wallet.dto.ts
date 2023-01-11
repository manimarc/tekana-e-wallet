import { IsDate, IsNumber, IsString } from 'class-validator';
import { CurrencyUsed } from 'src/common';

export class CreateWalletDto {
  @IsNumber()
  user_id: string;
  @IsNumber()
  balance: number;
  @IsString()
  currency: CurrencyUsed;

  @IsDate()
  createdAt: Date;
  @IsString()
  createdBy: string;
}
