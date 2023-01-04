import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CurrencyUsed, TransactionStatus, WalletTypes } from "src/common";
@Schema({versionKey:false})
export class Transaction extends Document{ 
@Prop({
    required: true,
    index: true,
    })
reference_id:string;

@Prop()
description:string;
@Prop({
    
    default:0
})
credited_amount:number;

@Prop({
    
    default:0
})
debited_amount:number;
@Prop( {
default:WalletTypes.TRANSFER,
type: String,
enum: WalletTypes,
})
type:WalletTypes;
@Prop( {
default:TransactionStatus.SUCCESS,
type: String,
enum: TransactionStatus,
})
status:TransactionStatus;

@Prop()
balance_before_debited:number;
@Prop()
balance_after_debited:number;

@Prop()
balance_before_credited:number;
@Prop()
balance_after_credited:number;

@Prop()
wallet_credited:string;

@Prop()
wallet_debited:string;

@Prop({default:0})
fee_or_charges:number;

@Prop(

{default:CurrencyUsed.RWA,
type: String,
enum: CurrencyUsed,
})
currency_debited:CurrencyUsed;

@Prop(

    {default:CurrencyUsed.RWA,
    type: String,
    enum: CurrencyUsed,
    })
    currency_credited:CurrencyUsed;

@Prop()
createdAt:Date;
@Prop()
createdBy:string;
@Prop()
updatedAt:Date;
@Prop()
updatedBy:string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
