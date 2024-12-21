import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  pass_word: string;

  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  birth_day: string;

  @IsNotEmpty()
  @ApiProperty()
  gender: string;

  @IsNotEmpty()
  @ApiProperty()
  role: string;
}
