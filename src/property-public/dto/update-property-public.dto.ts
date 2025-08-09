import { PartialType } from '@nestjs/swagger';
import { CreatePropertyPublicDto } from './create-property-public.dto';

export class UpdatePropertyPublicDto extends PartialType(CreatePropertyPublicDto) {}
