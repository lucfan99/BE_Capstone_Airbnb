import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateVitriDto {
  @IsNotEmpty({ message: 'Không để trống tên vị trí !' })
  @ApiProperty()
  ten_vi_tri: string;
  @ApiProperty()
  tinh_thanh: string;
  @ApiProperty()
  quoc_gia: string;
  @ApiProperty()
  hinh_anh: string;
}
