import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username không được để trống' })
  @ApiProperty()
  name: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Email không để trống' })
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birth_day: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  role: string;
}
export class FileUploadAvatarDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  hinhAnh: any;
}
