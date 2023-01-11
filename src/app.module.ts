import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/role.guards';
import { WalletModule } from './wallet/wallet.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SeedsModule } from './seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRootAsync({
    imports:[ConfigModule],
    useFactory:async(configService:ConfigService)=>({
      uri:configService.get<String>('MONGODB_URI'),
      useCreateIndex: true,
    }),
    inject:[ConfigService]
  }),
    UsersModule,
    AuthModule,
    WalletModule,
    TransactionsModule,SeedsModule],
  controllers: [AppController],
  providers: [AppService,
    {
    provide:APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide:APP_GUARD,
  useClass:RolesGuard
},
],
})
export class AppModule {}
