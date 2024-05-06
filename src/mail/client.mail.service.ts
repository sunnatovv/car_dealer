import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Client } from '../clients/models/client.model';

@Injectable()
export class ClientsMailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(patient: Client) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/clients/activate/${patient.activation_link}`;
    console.log(patient.email);

    console.log(url);
    await this.mailerService.sendMail({
      to: patient.email,
      subject: 'WELCOME to CarDealer App! confirmate your email',
      template: './confirmation',
      context: {
        name: patient.first_name,
        url,
      },
    });
  }
}
