import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { ContactEmailDto, RequestInfoEmailDto } from './dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/contact-owner')
  async create(@Body() dto: ContactEmailDto) {
    return await this.emailService.contactOwner(dto);
  }

  @Post('/request-info')
  async requestInfo(@Body() dto: RequestInfoEmailDto) {
    return await this.emailService.requestInfo(dto);
  }

}
