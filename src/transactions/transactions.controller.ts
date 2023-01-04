import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Req() req,@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto,req.user._id);
  }

  @Get()
  @Roles(Role.Agent,Role.Admin)
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Agent,Role.Admin)
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Req() req,@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto,req.user._id);
  }
 
  @Delete(':id')
   @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
