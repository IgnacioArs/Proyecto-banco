import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './repositories/account.repository';
import { Account } from '../account/entities/account.entity';
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from 'src/auth/jwt.constants';

@Module({
  imports:[TypeOrmModule.forFeature([Account]),
  JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'60s'}
  })],
  controllers: [AccountController],
  providers: [AccountService,AccountRepository]
})
export class AccountModule {}
