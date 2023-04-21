import { Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { jwtConstants } from './jwt.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Auth} from '../auth/entities/auth.entity'
import { AuthRepository } from './respositories/auth.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
        secret:jwtConstants.secret,
        signOptions:{expiresIn:'60s'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,AuthRepository,JwtStrategy]
})
export class AuthModule {}
