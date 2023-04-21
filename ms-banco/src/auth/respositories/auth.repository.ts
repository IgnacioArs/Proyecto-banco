import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entities/auth.entity';

import { DeleteResult, Repository } from 'typeorm';
import {LoginAuthDto} from '../dto/login-auth.dto';
import {RegisterAuthDto} from '../dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Auth)
    private usersRepository: Repository<Auth>,
    private jwtService:JwtService
  ) {}

 async register(loginUser: LoginAuthDto): Promise<Auth> {
    const saltOrRounds = 10;
    const password = loginUser.password;
    const newPassword = await bcrypt.hash(password, saltOrRounds);
 /*    const newUser = {
        id:UserDto.id,
        name:UserDto.name,
        email:UserDto.email,
        password:newPassword,
        accountId:UserDto.accountId
    } */
    return await this.usersRepository.save(loginUser);
  }

 async getUserBySession(authRegister:RegisterAuthDto):Promise<Auth>{
    const user = await this.usersRepository.findOne({
      where:{
        email:authRegister.email
      }
    })
    return user
/*     if(user){
      const isMatch = await bcrypt.compare(password,user.password);
          if(isMatch){
            const payload ={id:user.id, name:user.name}
            const token = this.jwtService.sign(payload)
            const NewUserToken ={
              id:user.id,
              name:user.name,
              email:user.email,
              password:user.password,
              account:user.account,
              accountId:user.accountId,
              token:token
            }
          return NewUserToken
      }else{
        return isMatch
      }
    } */
    
  } 


}
