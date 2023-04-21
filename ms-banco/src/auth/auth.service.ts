import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthRepository } from './respositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(private authRepository:AuthRepository){}

async register(createAuthDto: RegisterAuthDto) {
    return await this.authRepository.register(createAuthDto)
  }

async login(loginDto: LoginAuthDto) {
    return await this.authRepository.getUserBySession(loginDto);
  }
}
