import { ApiProperty } from '@nestjs/swagger/dist';
export class CreateAccountDto {
    @ApiProperty()
    id?: number;
  
    @ApiProperty()
    codeCountry: string;
  
    @ApiProperty()
    codeRegion: string;
  
    @ApiProperty()
    codeCity: string;
  
    @ApiProperty()
    codeCounty: string;
  
    @ApiProperty()
    description: string;
  
    @ApiProperty()
    priority: number;
  
    @ApiProperty()
    postalCode: string;
}
