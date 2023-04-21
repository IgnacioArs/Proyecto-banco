import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
import { AccountRepository } from './repositories/account.repository';


@Injectable()
export class AccountService {
  constructor(private accountRepository:AccountRepository){}

 async create(createAccountDto: CreateAccountDto):Promise<Account> {
    const account:Account = await this.accountRepository.create(createAccountDto);
    return account;
  }

 async findAll():Promise<Account[]> {
    return await this.accountRepository.findAll();
  }

  async findOne(id: number):Promise<Account> {
    const account:Account = await this.accountRepository.findOne(id);
    return account;
  }
 
 async update(id: number, updateAccountDto: CreateAccountDto):Promise<Account> {
    const accountUpdate:Account = await this.accountRepository.update(id, updateAccountDto);
    return accountUpdate;
  }

  async remove(id: number):Promise<void>{
     await this.accountRepository.remove(id);
  }
  
}
