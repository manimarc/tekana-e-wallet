import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsString } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsDate()
  updatedAt: Date;
  @IsString()
  updatedBy: string;
}
