import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({versionKey:false})
export class User extends Document{ 
    // @Prop()
    // user_id:number;
    @Prop()
    names:string;
    @Prop({
        required: true,
        index: true,
        unique: true
    })
    
    email:string;
    @Prop()
    password:string;
    @Prop({
        required: true,
        index: true,
        unique: true
    })
    phone:string;
    @Prop()
    role:string;
    @Prop()
    date:Date;
    @Prop()
    amount: number;
    @Prop()
    currency: string;
    @Prop()
    status:string;

    @Prop()
    last_login:Date;

}

export const UserSchema = SchemaFactory.createForClass(User);