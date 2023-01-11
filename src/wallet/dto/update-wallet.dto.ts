import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsString } from 'class-validator';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  @IsDate()
  updatedAt: Date;
  @IsString()
  updatedBy: string;
}
