import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCarDto } from '../request/create-car.dto';
import { IsOptional } from 'class-validator';

export class ResponseCarDto extends CreateCarDto {
  
  @Expose()
  @ApiProperty({ example: true, description: 'Car status', required: true })
  active: boolean;

  @Expose()
  @ApiProperty({ example: '686b3e3974b3f83e4d336ad6', description: 'User id', required: true })
  userId: string;

  @Expose()
  @ApiProperty({ example: '686b3e3974b3f83e4d336ad6', description: 'User id', required: true })
  _id: string;

  @Expose()
  @ApiProperty({ example: '2025-07-08T23:24:42.483Z', description: 'Car creation date', required: true })
  createdAt: Date;

  @Expose()
  @ApiProperty({ example: '2025-07-08T23:24:42.483Z', description: 'Car update date', required: true })
  updatedAt: Date;

  @Expose()
  @ApiProperty({ example: 'toyota-corolla-2020', description: 'Slug car', required: true })
  slug: string;

  @Exclude()
  @IsOptional()
  __v: number;
}
