import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../users/entities/user.entity'
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from 'src/auth/jwt.constants';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'60s'}
  })],
  controllers: [UsersController],
  providers: [UsersService,UserRepository]
})
export class UsersModule {}
