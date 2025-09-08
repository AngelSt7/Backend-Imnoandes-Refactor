import { IsOptional, IsEnum, IsNumber, IsArray, ArrayNotEmpty, Min, Max, IsDateString, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from 'generated/prisma';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';
import { IsGreaterOrEqual } from '@decorators/validation/is-greater-or-equal.decorator';


export class PaginationPropertyPublicDto extends BasePaginationDto {
    @IsOptional()
    @IsEnum(CURRENCY, {
        message: `The currency type must be one of the following: ${Object.values(CURRENCY).join(', ')}`
    })
    currency?: CURRENCY;

    @IsOptional()
    @IsEnum(PROPERTY_TYPE, {
        message: `The property type must be one of the following: ${Object.values(PROPERTY_TYPE).join(', ')}`
    })
    propertyType: PROPERTY_TYPE

    @IsOptional()
    @IsEnum(PROPERTY_CATEGORY, {
        message: `The property category must be one of the following: ${Object.values(PROPERTY_CATEGORY).join(', ')}`
    })
    propertyCategory: PROPERTY_CATEGORY

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minArea?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @IsGreaterOrEqual('minArea', { message: 'maxPrice should be greater than or equal to minArea' })
    maxArea?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minBathrooms?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minBedrooms?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minParkingSpaces?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(-1)
    published?: number;


    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minPrice?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @IsGreaterOrEqual('minPrice', { message: 'maxPrice should be greater than or equal to minPrice' })
    maxPrice?: number;

}
