import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsPositive, IsString, MinLength, Min } from 'class-validator';

export class BasePaginationDto {

  @ApiProperty({ example: 10, description: 'Pagination limit', required: false, default: 10 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ example: 0, description: 'Number of items to skip', required: false, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(-1)
  @Type(() => Number)
  offset?: number;

  @ApiProperty({ example: 'toyota', description: 'Search', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  search?: string;
}
