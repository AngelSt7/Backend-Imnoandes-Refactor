// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as nodemailer from 'nodemailer';
// import { MailService } from './mail.service';

// @Module({
//   imports: [ConfigModule],
//   providers: [
//     MailService,
//     {
//       provide: 'MAIL_TRANSPORTER',
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => {
//         return nodemailer.createTransport({
//           host: configService.get('SMTP_HOST'),
//           port: +configService.get('SMTP_PORT'),
//           secure: false,
//           auth: {
//             user: configService.get('SMTP_USER'),
//             pass: configService.get('SMTP_PASS'),
//           },
//         });
//       },
//     },
//   ],
//   exports: [MailService],
// })
// export class MailModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { Resend } from 'resend';
import { envs } from '@/config';

@Module({
  imports: [ConfigModule],
  providers: [
    MailService,
    {
      provide: 'RESEND_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const apiKey = envs.resendApiKey
        return new Resend(apiKey);
      },
    },
  ],
  exports: [MailService],
})
export class MailModule {}
