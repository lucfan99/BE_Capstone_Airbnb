import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;
  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'luottrenconsong2@gmail.com',
        pass: 'hxsf sabz pqef redh',
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<any> {
    try {
      const optionEmail = {
        from: 'luottrenconsong2@gmail.com',
        to,
        subject,
        text,
        html,
      };
      return await this.transporter.sendMail(optionEmail);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
