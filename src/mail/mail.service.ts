import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
// import { Admin } from '../../admin/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(admin: Admin) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/admin/activate/${admin.activationLink}`;
    console.log(admin.email);

    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'WELCOME to Car Dealer App! confirm your email',
      template: './confirmation',
      context: {
        name: admin.name,
        url,
      },
    });
  }
}
