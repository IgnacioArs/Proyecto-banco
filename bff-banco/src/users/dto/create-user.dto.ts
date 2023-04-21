import {ApiProperty,OmitType} from '@nestjs/swagger'
import {
    IsNotEmpty,
    IsString,
    IsNumber,
  } from 'class-validator';
export class CreateUserDto {
    @ApiProperty()
    @IsNumber()
    id?: number;
  
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
  
    @ApiProperty()
    @IsNumber()
    accountId: number;
}

export class UpdateUserDto extends OmitType(CreateUserDto, ['id'] as const) {}