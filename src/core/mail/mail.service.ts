import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AppsEntity } from 'src/apps/apps.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {
    await this.mailerService.sendMail({
      // to: context.user.email,
      // from: '"Support Team" <support@example.com>',
      // subject: 'Welcome to Nice App! Confirm your Email',
      // template: './confirmation',
      // context,
    });
  }

  appConfirmation(context: AppsEntity) {
    return this.mailerService.sendMail({
      to: context.creator,
      from: '"Support Team" <support@example.com>',
      subject: 'App Created Successfully!',
      template: './app-confirmation',
      context,
    });
  }
}
