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
      message: 'Email enviado con exito, el propietario se pondra en contacto con usted',
    }
  }

  requestInfo(dto: RequestInfoEmailDto) {
    this.mailService.requestInfo(dto);
    return {
      message: 'Email enviado con exito, nuestro equipo se pondra en contacto con usted',
    }
  }


}
