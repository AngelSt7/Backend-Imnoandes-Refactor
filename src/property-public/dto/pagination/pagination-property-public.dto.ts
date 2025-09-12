import { IsOptional, IsEnum, IsNumber, Min, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CURRENCY, Property, PROPERTY_CATEGORY, PROPERTY_TYPE } from 'generated/prisma';
import { IsGreaterOrEqual } from '@decorators/validation/is-greater-or-equal.decorator';


export class PaginationPropertyPublicDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    page: number;

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
    @Transform(({ value }) =>
        typeof value === 'string' ? value.split(',').map(val => val.trim()) : value
    )
    @IsEnum(PROPERTY_CATEGORY, {
        each: true,
        message: `The property category must be one of the following: ${Object.values(PROPERTY_CATEGORY).join(', ')}`
    })
    propertyCategory: PROPERTY_CATEGORY[]

    @IsOptional()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.split(',').map(val => val.trim()) : value
    )
    @IsString({ each: true })
    location: Property['slug'][]

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
    @IsGreaterOrEqual('minBedrooms', { message: 'minBedrooms should be greater than or equal to minBedrooms' })
    maxBedrooms?: number;

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
