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
}
// DTO cho upload 1 hình ảnh
export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  hinhAnh: any;
}
