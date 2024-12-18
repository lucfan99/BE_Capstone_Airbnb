import { Expose, Exclude } from 'class-transformer';

export class VitriDto {
  @Exclude()
  id: number;
  @Expose()
  ten_vi_tri: string;
  @Expose()
  tinh_thanh: string;
  @Expose()
  quoc_gia: string;
  @Expose()
  hinh_anh: string;
  constructor(partial: Partial<VitriDto>) {
    Object.assign(this, partial);
  }
}
