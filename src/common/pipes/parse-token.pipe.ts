import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseTokenPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const token = value

    if (!token || typeof token !== 'string' || !/^\d{6}$/.test(token)) {
      throw new BadRequestException('Invalid token');
    }

    return value;
  }
}
