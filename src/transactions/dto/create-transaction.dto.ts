import { IsDate, IsNumber, IsString } from "class-validator";
import { TransactionStatus, WalletTypes } from "src/common";

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
@IsString()
wallet_credited:string;

@IsString()
wallet_debited:string;

@IsNumber()
fee_or_charges:number;

@IsString()
currency:string;
@IsDate()
createdAt:Date;
@IsString()
createdBy:string;

}
