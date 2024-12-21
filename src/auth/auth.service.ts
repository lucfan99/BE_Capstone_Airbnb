import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
// import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  prisma = new PrismaClient();

  constructor(
    private readonly jwtService: JwtService, // dùng để tạo token
    private readonly configService: ConfigService,
    // private readonly emailService: EmailService,
  ) {}

  async login(body: LoginDto): Promise<string> {
    try {
      const { email, pass_word } = body;
      // get user bằng email
      const user = await this.prisma.nguoiDung.findFirst({
        where: { email },
      });
      // kiểm tra user có tồn tại không
      if (!user) {
        throw new BadRequestException('Email is wrong');
      }

      // kiểm tra password có trùng không
      const checkPass = bcrypt.compareSync(pass_word, user.pass_word);

      if (!checkPass) {
        throw new BadRequestException('Password is wrong');
      }

      // tạo token
      const token = this.jwtService.sign(
        { data: { id: user.id } }, //define payload muốn lưu vào token
        {
          expiresIn: '30m', // thời gian sống của token
          secret: 'node47', // secret key để tạo token
        },
      );
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup(body: CreateAccountDto): Promise<any> {
    try {
      let { name, email, pass_word, phone, birth_day, gender, role } = body;
      // Get user by email
      const user = await this.prisma.nguoiDung.findFirst({
        where: { email },
      });
      // Check user exists
      if (user) {
        throw new BadRequestException('Email is exists');
      }

      // hash password
      pass_word = bcrypt.hashSync(pass_word, 10);

      // create user
      const newUser = await this.prisma.nguoiDung.create({
        data: {
          name,
          email,
          pass_word,
          phone,
          birth_day,
          gender,
          role,
        },
      });

      // // send email welcome
      // await this.emailService.sendEmail(
      //   email,
      //   'Welcome to Us, ArBnB',
      //   'Let enjoys your traveling',
      // );

      // return user
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
