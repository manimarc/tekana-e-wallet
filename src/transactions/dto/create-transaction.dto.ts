import { IsDate, IsNumber, IsString } from "class-validator";
import { CurrencyUsed, TransactionStatus, WalletTypes } from "src/common";

export class CreateTransactionDto {

description:string;
@IsNumber()
credited_amount:number;

@IsNumber()
debited_amount:number;
@IsString( )
type:WalletTypes;
@IsString( )
status:TransactionStatus;

@IsNumber()
balance_before_debited:number;
@IsNumber()
balance_after_debited:number;

@IsNumber()
balance_before_credited:number;
@IsNumber()
balance_after_credited:number;
@IsString()
wallet_credited:string;

@IsString()
wallet_debited:string;

@IsNumber()
fee_or_charges:number;

@IsString()
currency_credited:CurrencyUsed;
@IsString()
currency_debited:CurrencyUsed;
@IsDate()
createdAt:Date;
@IsString()
createdBy:string;

}
