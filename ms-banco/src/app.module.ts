import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';


@Module({
imports: [ConfigModule.forRoot({
isGlobal:true,
envFilePath:['env/enviroment.env'],
}),
TypeOrmModule.forRoot({
type:'postgres',
host:process.env.POSTGRES_HOST,
port:parseInt(<string>process.env.POSTGRES_PORT),
username:process.env.POSTGRES_USER,
password:process.env.POSTGRES_PASSWORD,
database:process.env.POSTGRES_DATABASE,
entities:[__dirname + '/**/*.entity{.ts,.js}'],
synchronize:true,
autoLoadEntities:true
}),
AccountModule,
UsersModule,
AuthModule
],
controllers: [],
providers: [],
})
export class AppModule {}
