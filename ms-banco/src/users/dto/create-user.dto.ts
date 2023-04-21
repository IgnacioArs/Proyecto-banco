import { ApiProperty } from "@nestjs/swagger/dist";
export class CreateUserDto {
    @ApiProperty()
    id?: number;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
  
    @ApiProperty()
    accountId: number;
}

