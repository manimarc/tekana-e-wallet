import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// import { seeder } from "nestjs-seeder";
import { User, UserSchema } from "./users/entities/user.entity";
import { UserSeed } from "./users/seeds/user.seeds";
import { CommandModule } from 'nestjs-command';
import { UsersRepository } from "./users/users.repository";
@Module({
    imports:[CommandModule,MongooseModule.forFeature([{name:User.name,schema:UserSchema}],
        )],

        providers: [UserSeed,UsersRepository],
    
})
export class SeedsModule {}

