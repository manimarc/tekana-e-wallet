import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { TransactionsRepository } from './transactions.repository';
import { Wallet, WalletSchema } from 'src/wallet/entities/wallet.entity';
import { WalletModule } from 'src/wallet/wallet.module';
import { WalletRepository } from 'src/wallet/wallet.repository';
import { WalletService } from 'src/wallet/wallet.service';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports:[UsersModule,WalletModule,MongooseModule.forFeature([{name:Transaction.name,schema:TransactionSchema},{name:Wallet.name,schema:WalletSchema},{name:User.name,schema:UserSchema}])],
  controllers: [TransactionsController],
  providers: [TransactionsService,TransactionsRepository,WalletRepository,WalletService,UsersService,UsersRepository]
})
export class TransactionsModule {}
