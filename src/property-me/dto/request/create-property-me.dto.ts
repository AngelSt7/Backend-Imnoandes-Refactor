import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Length, Matches, Max, Min } from "class-validator";
import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from "generated/prisma";
import { RangeByCategory, RequiredByCategory } from "src/property-me/decorators";
import { ArrayByCategory } from "@decorators/validation/array-by-category.decorator";

export class CreatePropertyMeDto {

    @IsString()
    @Length(8, 50)
    name: string

    @IsEnum(PROPERTY_TYPE, {
        message: `The property type must be one of the following: ${Object.values(PROPERTY_TYPE).join(', ')}`
    })
    propertyType: PROPERTY_TYPE

    @IsEnum(PROPERTY_CATEGORY, {
        message: `The property category must be one of the following: ${Object.values(PROPERTY_CATEGORY).join(', ')}`
    })
    propertyCategory: PROPERTY_CATEGORY

    @IsEnum(CURRENCY, {
        message: `The currency type must be one of the following: ${Object.values(CURRENCY).join(', ')}`
    })
    currency: CURRENCY

    @IsNumber()
    @IsPositive()
    price: number

    @IsString()
    @Length(8, 200)
    address: string

    @IsString()
    @Length(8, 300)
    description: string

    @IsUUID()
    departmentId: string

    @IsUUID()
    provinceId: string

    @IsUUID()
    districtId: string

    @IsOptional()
    @RequiredByCategory("propertyCategory", [
        PROPERTY_CATEGORY.HOUSE,
        PROPERTY_CATEGORY.APARTMENT,
    ])
    @RangeByCategory("propertyCategory", {
        [PROPERTY_CATEGORY.HOUSE]: { min: 1, max: 10 },
        [PROPERTY_CATEGORY.APARTMENT]: { min: 1, max: 10 },
    })
    bedrooms?: number | null

    @IsOptional()
    @RangeByCategory("propertyCategory", {
        [PROPERTY_CATEGORY.HOUSE]: { min: 1, max: 10 },
        [PROPERTY_CATEGORY.APARTMENT]: { min: 1, max: 10 },
        [PROPERTY_CATEGORY.COMMERCIAL]: { min: 1, max: 20 },
        [PROPERTY_CATEGORY.OFFICE]: { min: 1, max: 20 },
        [PROPERTY_CATEGORY.WAREHOUSE]: { min: 1, max: 5 },
    })
    bathrooms?: number | null

    @IsNumber()
    @IsPositive()
    area: number

    @IsOptional()
    @IsBoolean()
    furnished?: boolean

    @IsOptional()
    @RequiredByCategory("propertyCategory", [
        PROPERTY_CATEGORY.APARTMENT,
        PROPERTY_CATEGORY.OFFICE,
        PROPERTY_CATEGORY.COMMERCIAL,
        PROPERTY_CATEGORY.HOUSE,
    ])
    @RangeByCategory("propertyCategory", {
        [PROPERTY_CATEGORY.HOUSE]: { min: 1, max: 8 },
        [PROPERTY_CATEGORY.APARTMENT]: { min: 1, max: 50 },
        [PROPERTY_CATEGORY.COMMERCIAL]: { min: 1, max: 50 },
        [PROPERTY_CATEGORY.OFFICE]: { min: 1, max: 20 },
    })
    floor?: number;


    @IsOptional()
    @IsBoolean()
    hasParking?: boolean

    @IsOptional()
    @RangeByCategory("propertyCategory", {
        [PROPERTY_CATEGORY.HOUSE]: { min: 1, max: 5 },
        [PROPERTY_CATEGORY.WAREHOUSE]: { min: 1, max: 20 },
        [PROPERTY_CATEGORY.APARTMENT]: { min: 1, max: 2 },
        [PROPERTY_CATEGORY.OFFICE]: { min: 1, max: 50 },
        [PROPERTY_CATEGORY.COMMERCIAL]: { min: 1, max: 50 },
    })
    parkingSpaces?: number | null

    @IsOptional()
    @ArrayByCategory("propertyCategory", [PROPERTY_CATEGORY.LAND])
    servicesId?: string[] | null;

    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;

    @IsOptional()
    @IsBoolean()
    hasTerrace?: boolean

    @IsOptional()
    @IsNumber()
    @Min(1900)
    @Max(new Date().getFullYear())
    @RequiredByCategory("propertyCategory", [
        PROPERTY_CATEGORY.HOUSE,
        PROPERTY_CATEGORY.APARTMENT,
        PROPERTY_CATEGORY.OFFICE,
        PROPERTY_CATEGORY.COMMERCIAL,
    ])
    yearBuilt?: number | null;

    @IsOptional()
    @IsString()
    @Length(8, 300)
    extraInfo?: string | null

    @IsString()
    @Type(() => String)
    @Matches(/^9[0-9]{8}$/, { message: 'El teléfono debe tener 9 dígitos y comenzar con 9' })
    phone: string;
        
}
