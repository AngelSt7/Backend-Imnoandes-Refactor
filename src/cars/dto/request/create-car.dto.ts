import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, Length, Min, Max } from 'class-validator';

export class CreateCarDto {

  @Expose()
  @ApiProperty({ example: 'Toyota', description: 'Car brand', required: true })
  @IsString()
  @Length(2, 30)
  brand: string;

  @Expose()
  @ApiProperty({ example: 'Corolla', description: 'Car model', required: true })
  @IsString()
  @Length(1, 50)
  model: string;

  @Expose()
  @ApiProperty({ example: 2022, description: 'Car year', required: true })
  @IsNumber()
  @Min(1886)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @Expose()
  @ApiProperty({ example: 20000, description: 'Car price', required: true })
  @IsNumber()
  @Min(0)
  price: number;

  @Expose()
  @ApiProperty({ example: 'gasoline', description: 'Car fuel type', required: true })
  @IsString()
  @IsEnum(['gasoline', 'diesel', 'electric', 'hybrid'])
  fuelType: string;

  @Expose()
  @ApiProperty({ example: 'Red', description: 'Car color', required: true })
  @IsString()
  @Length(3, 15)
  color: string;

  @Expose()
  @ApiProperty({ example: 4, description: 'Car doors', required: true })
  @IsNumber()
  @Min(1)
  @Max(6)
  doors: number;

  @Expose()
  @ApiProperty({ example: 5, description: 'Car seats', required: true })
  @IsNumber()
  @Min(1)
  @Max(10)
  seats: number;

  @Expose()
  @ApiProperty({ example: 'manual', description: 'Car transmission', required: true })
  @IsString()
  @IsEnum(['manual', 'automatic'])
  transmission: string;

  @Expose()
  @ApiProperty({ example: 100000, description: 'Car mileage', required: true })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Expose()
  @ApiProperty({ example: 'new', description: 'Car status', required: true })
  @IsString()
  @IsEnum(['new', 'used'])
  status: string;
}
