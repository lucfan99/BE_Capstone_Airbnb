import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDatphongDto {

    @ApiProperty()
    id : number;


    @ApiProperty()
    ma_phong : number ; 


    @ApiProperty()
    ngay_den : Date;


    @ApiProperty()
    ngay_di : Date ;


    @ApiProperty()
    so_luong_khach : number;



    @ApiProperty()
    ma_nguoi_dat : number;




}

