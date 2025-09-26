import { Injectable } from '@nestjs/common';
import { ContactEmailDto, RequestInfoEmailDto } from './dto';
import { MailService } from '@/common/transporters/mail/mail.service';


@Injectable()
export class EmailService {

  constructor(
    private readonly mailService: MailService
  ) { }

  async contactOwner(dto: ContactEmailDto) {
    this.mailService.contactOwner(dto);
    return {
      message: 'Email sent successfully',
    }
  }

  requestInfo(dto: RequestInfoEmailDto) {
    this.mailService.requestInfo(dto);
    return {
      message: 'Email sent successfully, we will contact you soon',
    }
  }


}
