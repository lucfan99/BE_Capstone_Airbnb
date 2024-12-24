import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { EmailModule } from 'src/email/email.module';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [JwtModule.register({}), EmailModule],
})
export class AuthModule {}
