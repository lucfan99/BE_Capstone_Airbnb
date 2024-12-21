import { Expose, Exclude } from 'class-transformer';

export class datphongDto {

    @Exclude()
    id : number ;


    
    @Exclude()
    ma_phong : number ; 


    
    @Exclude()
    ngay_den : Date;


    
    @Exclude()
    ngay_di : Date ;


    
    @Exclude()
    so_luong_khach : number;



    
    @Exclude()
    ma_nguoi_dat : number;




    constructor(partial: Partial<datphongDto>) {
        Object.assign(this, partial);
      }


}