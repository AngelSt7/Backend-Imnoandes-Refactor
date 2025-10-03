import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseOtpPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const otp = value

    if (!otp || typeof otp !== 'string' || !/^\d{6}$/.test(otp)) {
      throw new BadRequestException('Invalid token');
    }

    return Number(value);
  }
}
