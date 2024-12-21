import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePhongDto {}
export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên phòng không được để trống' })
  @ApiProperty()
  ten_phong: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Hãy điền số lượng khách' })
  khach: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'Hãy điền số lượng phòng ngủ' })
  phong_ngu: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'Hãy điền số lượng giường' })
  giuong: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'Hãy điền số lượng phòng tắm' })
  phong_tam: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'Hãy điền giá tiền' })
  gia_tien: number;
  @ApiProperty()
  mo_ta: string;
  @ApiProperty()
  may_giat: boolean;
  @ApiProperty()
  ban_la: boolean;
  @ApiProperty()
  tivi: boolean;
  @ApiProperty()
  dieu_hoa: boolean;
  @ApiProperty()
  wifi: boolean;
  @ApiProperty()
  bep: boolean;
  @ApiProperty()
  do_xe: boolean;
  @ApiProperty()
  ho_boi: boolean;
  @ApiProperty()
  ban_ui: boolean;
  @ApiProperty()
  @IsNotEmpty({ message: 'ViTri không để trống' })
  vi_tri_id: number;
}
// export class FileUploadDto {
//   @ApiProperty({ type: 'string', format: 'binary' })
//   hinh_anh: any;
// }
export class FileUploadPhongDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  hinh_anh: any[];
}
