import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import {User} from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private userRepositorys:UserRepository){}

  async create(createUserDto: CreateUserDto):Promise<User> {
   const userCreated:User = await this.userRepositorys.create(createUserDto);
   return userCreated;
  }

  async findAll():Promise<User[]>{
   const userAll:User[] = await this.userRepositorys.findAll();
   return userAll;
  }

  async findOne(id: number):Promise<User> {
    const userEmail:User = await this.userRepositorys.findOne(id);
    return userEmail;
  }


  async getUserBySession(email: string, password: string):Promise<User>{
    const userSession:User = await this.userRepositorys.getUserBySession(email,password)
    return userSession;
  }


  async getUserByEmail(email:string):Promise<User> {
    const userEmail:User = await this.userRepositorys.getUserByEmail(email);
    return userEmail;
 }

  async update(id: number, updateUserDto: CreateUserDto):Promise<User>{
    const updateUser:User = await this.userRepositorys.update(id,updateUserDto);
    return updateUser;
  }
  
  async remove(id: number):Promise<void>{
    await this.userRepositorys.remove(id);
  }

}
