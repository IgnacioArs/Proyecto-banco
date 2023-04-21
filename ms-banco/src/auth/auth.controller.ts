import { Controller,Body,Get,Post,Patch,Param,Delete,UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags,ApiBearerAuth} from '@nestjs/swagger';
import {JwtAuthGuard} from './jwt-auth.guard'




@ApiBearerAuth('auth')
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //
  @Post('/register')
  registerUser(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }
  
  
  //agregamos el guardian
  @UseGuards(JwtAuthGuard)
  @Post('/login')
  loginUser(@Body() createAuthDto: LoginAuthDto){
    return this.authService.login(createAuthDto);
  }

}
