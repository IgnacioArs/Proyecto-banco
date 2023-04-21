import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

import { DeleteResult, Repository } from 'typeorm';
import {CreateUserDto} from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService:JwtService
  ) {}

 async create(UserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const password = UserDto.password;
    const newPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = {
        id:UserDto.id,
        name:UserDto.name,
        email:UserDto.email,
        password:newPassword,
        accountId:UserDto.accountId
    }
    return await this.usersRepository.save(newUser);
  }

 async findAll(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }




  async getUserByEmail(email:string): Promise<User> {  

    console.log("viendo los parametros MS",JSON.stringify(email));
    const emailFound = await this.usersRepository.findOne({where:{
      email:email
    }}) 

    return emailFound
 
   /*  if(emailFound){
      const isMatch = await bcrypt.compare(password,emailFound.password);
      if(isMatch){
        const payload ={id:emailFound.id, name:emailFound.name}
        const token = this.jwtService.sign(payload)
        const NewUserToken ={
          id:emailFound.id,
          name:emailFound.name,
          email:emailFound.email,
          password:emailFound.password,
          account:emailFound.account,
          accountId:emailFound.accountId,
          token:token
        }
        
      return NewUserToken
      }else{
        
        return isMatch
      }
    } */
  }




  async getUserBySession(email: string, password: string):Promise<User>{
    const user = await this.usersRepository.findOne({
      where:{
        email:email
      }
    })
    
    if(user){
      const isMatch = await bcrypt.compare(password,user.password);
          if(isMatch){
            const jwtConstants = {
              secret:'secretkey',
            };
            const payload ={id:user.id,jwtConstants}
            const token = this.jwtService.sign(payload)
            const NewUserToken ={
              id:user.id,
              name:user.name,
              email:user.email,
              password:user.password,
              account:user.account,
              accountId:user.accountId
            }
          return NewUserToken
      }else{
        return isMatch
      }
    }
    
  }



  async update(id: number, updateCountryDto: CreateUserDto) {
    await this.usersRepository.update(id, updateCountryDto);
    return this.usersRepository.findOneBy({ id });
  }


  
  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }



}
