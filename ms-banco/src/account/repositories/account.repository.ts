import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAccountDto} from '../dto/create-account.dto';
import { Account } from '../entities/account.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService:JwtService
  ) {}

  create(countyDto: CreateAccountDto): Promise<Account> {
    return this.accountRepository.save(countyDto);
  }

  findAll(): Promise<Account[]> {
    
    return this.accountRepository.find({
      order: {
        priority: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Account> {
    return this.accountRepository.findOneBy({ id });
  }

  async update(id: number, countyDto: CreateAccountDto) {
    await this.accountRepository.update(id, countyDto);
    return this.accountRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.accountRepository.delete(id);
  }


}