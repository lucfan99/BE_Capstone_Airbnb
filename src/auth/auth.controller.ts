import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiBody } from '@nestjs/swagger';
import { EmailDto } from './dto/email.dto';
import { EmailService } from 'src/email/email.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly emailService: EmailService;
  @Post('/login')
  async login(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    try {
      const token = await this.authService.login(body);
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Login failed' });
    }
  }

  @Post('/signup')
  async signup(
    @Body() body: CreateAccountDto,
    @Res() res: Response,
  ): Promise<Response<any>> {
    try {
      const user = await this.authService.signup(body);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Signup failed' });
    }
  }
  // define API send email
  @Post('/send-email')
  @ApiBody({
    type: EmailDto,
  })
  async sendEmail(@Body() body: EmailDto, @Res() res: Response): Promise<any> {
    try {
      // lấy info {emailTo, subject, text} từ body
      const { emailTo, subject, text } = body;
      // gọi service send email
      await this.emailService.sendEmail(emailTo, subject, text);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Send email successfully' });
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Send email failed' });
    }
  }
}
