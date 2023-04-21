import { Controller, Get,Post,Delete,Patch,Param,Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags,ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('users')
@ApiTags('users')
@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body()createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id')id: string) {
    return this.usersService.findOne(+id);
  }


  @Get('/session/:email/:password')
  getUserBySession(@Param('email') email: string, @Param('password') password: string){
     return this.usersService.getUserBySession(email,password)
  }

  @Get('/verificacion/:email')
  getUserByEmail(@Param('email') email:string) {
    return this.usersService.getUserByEmail(email);
  }


  @Patch(':id')
  update(@Param('id') id:string,@Body()updateUserDto: CreateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  
  @Delete(':id')
  remove(@Param('id')id: string) {
    return this.usersService.remove(+id);
  }




}
