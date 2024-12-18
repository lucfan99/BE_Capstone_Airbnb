import { Expose, Exclude } from 'class-transformer';

export class BinhLuanDto {
  @Exclude()
  id: number;
  @Expose()
  ma_cong_viec: number;
  @Expose()
  ma_nguoi_binh_luan: number;
  @Expose()
  ngay_binh_luan: Date;
  @Expose()
  noi_dung: string;
  @Expose()
  sao_binh_luan: number;

  constructor(partial: Partial<BinhLuanDto>) {
    Object.assign(this, partial);
  }
}
