import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailModule } from '@/common/transporters';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [MailModule, CommonModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule { }
