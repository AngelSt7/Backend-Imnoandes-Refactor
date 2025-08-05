import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

export class PaginationCarsDto extends BasePaginationDto {
  @ApiPropertyOptional({
    example: 'Toyota',
    description: 'Brand name of the car',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  brand?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Model name of the car',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  model?: string;

  @ApiPropertyOptional({
    example: 'white',
    description: 'Color of the car',
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  color?: string;

  @ApiPropertyOptional({
    example: 'gasoline',
    description: 'Fuel type',
    enum: ['gasoline', 'diesel', 'electric', 'hybrid'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['gasoline', 'diesel', 'electric', 'hybrid'])
  fuelType?: string;

  @ApiPropertyOptional({
    example: 4,
    description: 'Number of doors',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  doors?: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'Number of seats',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  seats?: number;

  @ApiPropertyOptional({
    example: 'automatic',
    description: 'Transmission type',
    enum: ['manual', 'automatic'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['manual', 'automatic'])
  transmission?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Minimum mileage',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100000)
  @Type(() => Number)
  minMileage?: number;

  @ApiPropertyOptional({
    example: 100000,
    description: 'Maximum mileage',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100000)
  @Type(() => Number)
  maxMileage?: number;

  @ApiPropertyOptional({
    example: 'used',
    description: 'Car condition',
    enum: ['new', 'used'],
  })
  @IsOptional()
  @IsString()
  @IsIn(['new', 'used'])
  status?: string;

  @ApiPropertyOptional({
    example: 2020,
    description: 'Minimum year of manufacture',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minYear?: number;

  @ApiPropertyOptional({
    example: 2025,
    description: 'Maximum year of manufacture',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxYear?: number;

  @ApiPropertyOptional({
    example: 1000,
    description: 'Minimum price of the car',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({
    example: 100000,
    description: 'Maximum price of the car',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;
}
