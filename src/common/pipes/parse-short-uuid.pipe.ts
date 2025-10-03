import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseShortUuidPipe implements PipeTransform {
  transform(value: string) {
    if (!value) {
      throw new BadRequestException('Slug is required');
    }

    const segments = value.split('-');
    const shortId = segments.pop();

    if (!shortId) {
      throw new BadRequestException('Slug is invalid');
    }

    const isHex = /^[0-9a-f]{8}$/i.test(shortId);
    if (!isHex) {
      throw new BadRequestException('shortId is invalid');
    }

    return shortId.toLowerCase();
  }
}
