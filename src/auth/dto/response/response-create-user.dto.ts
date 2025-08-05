import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../requests';

export class ResponseCreateUserDto extends OmitType(CreateUserDto, ['password'] as const) {}
