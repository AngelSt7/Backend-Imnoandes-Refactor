import { PartialType } from '@nestjs/swagger';
import { CreatePropertyMeDto } from './create-property-me.dto';

export class UpdatePropertyMeDto extends PartialType(CreatePropertyMeDto) {}
