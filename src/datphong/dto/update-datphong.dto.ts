import { PartialType } from '@nestjs/swagger';
import { CreateDatphongDto } from './create-datphong.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateDatphongDto extends PartialType(CreateDatphongDto) {
  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  ma_phong?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  ngay_den?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  ngay_di?: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  so_luong_khach?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  ma_nguoi_dat?: number;
}
