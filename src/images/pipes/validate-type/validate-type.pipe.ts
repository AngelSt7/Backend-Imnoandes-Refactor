import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { configByType, UploadType } from 'src/images/config/upload.config';

@Injectable()
export class ValidateTypePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!configByType[value]) throw new BadRequestException(`Invalid upload type. Allowed: ${Object.keys(configByType).join(', ')}`);
    return value as UploadType;
  }
}
