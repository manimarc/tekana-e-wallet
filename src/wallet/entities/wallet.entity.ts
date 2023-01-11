
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { CurrencyUsed } from "src/common";
@Schema({versionKey:false})
export class Wallet extends Document{ 
   @Prop({
        required: true,
        index: true,
       })
    user_id:string;
    @Prop({
        
        default:0
    })
    
    balance:number;
    @Prop(
        
        {default:CurrencyUsed.RWA,
        type: String,
        enum: CurrencyUsed,
    })
    currency:CurrencyUsed;

    @Prop()
    createdAt:Date;
    @Prop()
    createdBy:string;
    @Prop()
    updatedAt:Date;
    @Prop()
    updatedBy:string;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
WalletSchema.index({_id:1,user_id:1});