import { ApiProperty,OmitType} from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsNumber,
  } from 'class-validator';
export class CreateAccountDto {
    @ApiProperty()
    @IsNumber()
    id?: number;
  
    @ApiProperty()
    @IsString()
    codeCountry: string;
  
    @ApiProperty()
    @IsString()
    codeRegion: string;
  
    @ApiProperty()
    @IsString()
    codeCity: string;
  
    @ApiProperty()
    @IsString()
    codeCounty: string;
  
    @ApiProperty()
    @IsString()
    description: string;
  
    @ApiProperty()
    @IsNumber()
    priority: number;
  
    @ApiProperty()
    @IsString()
    postalCode: string;
}
export class UpdateAccountDto extends OmitType(CreateAccountDto, ['id'] as const) {}