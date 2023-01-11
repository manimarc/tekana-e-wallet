import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole, UserStatus } from "src/common";
@Schema({versionKey:false})
export class User extends Document{ 
    @Prop()
    names:string;
    @Prop({
        type:String,
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
    @Prop(
        
        {default:UserRole.User,
        type: String,
        enum: UserRole,
    })
    role:UserRole;
    @Prop()
    createdAt:Date;
    
    @Prop({
        type: String,
         enum: UserStatus,
         default:UserStatus.LOCKED
      })
    status:UserStatus;

    @Prop()
    last_login:Date;
    @Prop()
    updatedAt: Date;
    @Prop()
    updatedBy: string;
    @Prop()
    createdBy:string;

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({_id:1,email:1,phone:1},{unique:true});