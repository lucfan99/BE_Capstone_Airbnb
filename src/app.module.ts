import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BinhluanModule } from './binhluan/binhluan.module';
import { VitriModule } from './vitri/vitri.module';
import { PhongModule } from './phong/phong.module';
import { DatphongModule } from './datphong/datphong.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // load tất cả các biến môi trường và sử dụng nhiều nơi
    }),
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
