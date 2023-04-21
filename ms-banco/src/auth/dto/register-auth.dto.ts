import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import {IsNotEmpty} from 'class-validator'
import { IsEmail,MinLength } from "class-validator";
export class RegisterAuthDto extends PartialType(LoginAuthDto) {
      @IsEmail()
      email:string;
  
      @MinLength(6)
      password:string;
}
