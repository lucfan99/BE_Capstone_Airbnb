import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBinhluanDto {
  @IsNotEmpty({ message: 'Mã công việc không để trống' })
  @ApiProperty()
  ma_cong_viec: number;
  @IsNotEmpty({ message: 'Mã User không để trống' })
  @ApiProperty()
  ma_nguoi_binh_luan: number;
  @ApiProperty()
  ngay_binh_luan: Date;
  @ApiProperty()
  noi_dung: string;
  @ApiProperty()
  sao_binh_luan: number;
}
