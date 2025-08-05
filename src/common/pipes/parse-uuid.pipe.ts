import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'uuid'

@Injectable()
export class ParseUuidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || !validate(value)) throw new BadRequestException('Invalid UUID');
    return value;
  }
}
