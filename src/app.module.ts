import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BinhluanModule } from './binhluan/binhluan.module';
import { VitriModule } from './vitri/vitri.module';
import { PhongModule } from './phong/phong.module';
import { DatphongModule } from './datphong/datphong.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BinhluanModule,
    VitriModule,
    PhongModule,
    DatphongModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
