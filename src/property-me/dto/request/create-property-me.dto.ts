import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Length, Max, Min } from "class-validator";
import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from "generated/prisma";
import { RangeByCategory, RequiredByCategory } from "src/property-me/decorators";

export class CreatePropertyMeDto {

    @IsString()
    @Length(8, 50)
    name: string

    @IsEnum(PROPERTY_TYPE, {
        message: `The property type must be one of the following: ${Object.values(PROPERTY_TYPE).join(', ')}`
    })
    property_type: PROPERTY_TYPE

    @IsEnum(PROPERTY_CATEGORY, {
        message: `The property category must be one of the following: ${Object.values(PROPERTY_CATEGORY).join(', ')}`
    })
    property_category: PROPERTY_CATEGORY

    @IsEnum(CURRENCY, {
        message: `The currency type must be one of the following: ${Object.values(CURRENCY).join(', ')}`
    })
    currency: CURRENCY

    @IsNumber()
    @IsPositive()
    price: number

    @IsString()
    @Length(8, 40)
    location: string

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
    @RequiredByCategory("property_category", [
        PROPERTY_CATEGORY.HOUSE,
        PROPERTY_CATEGORY.APARTMENT,
    ])
    @RangeByCategory("property_category", {
        [PROPERTY_CATEGORY.HOUSE]: { min: 1, max: 10 },
        [PROPERTY_CATEGORY.APARTMENT]: { min: 1, max: 10 },
    })
    bedrooms?: number | null

    @IsOptional()
    @RangeByCategory("property_category", {
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
    @RequiredByCategory("property_category", [
        PROPERTY_CATEGORY.APARTMENT,
        PROPERTY_CATEGORY.OFFICE,
        PROPERTY_CATEGORY.COMMERCIAL,
        PROPERTY_CATEGORY.HOUSE,
    ])
    @RangeByCategory("property_category", {
        [PROPERTY_CATEGORY.HOUSE]: { min: 1, max: 8 },
        [PROPERTY_CATEGORY.APARTMENT]: { min: 1, max: 50 },
        [PROPERTY_CATEGORY.COMMERCIAL]: { min: 1, max: 50 },
        [PROPERTY_CATEGORY.OFFICE]: { min: 1, max: 20 },
    })
    floor?: number;


    @IsOptional()
    @IsBoolean()
    hasParking: boolean

    @IsOptional()
    @RangeByCategory("property_category", {
        [PROPERTY_CATEGORY.HOUSE]: { min: 0, max: 5 },
        [PROPERTY_CATEGORY.WAREHOUSE]: { min: 0, max: 20 },
        [PROPERTY_CATEGORY.APARTMENT]: { min: 0, max: 2 },
        [PROPERTY_CATEGORY.OFFICE]: { min: 0, max: 50 },
        [PROPERTY_CATEGORY.COMMERCIAL]: { min: 0, max: 50 },
    })
    parkingSpaces?: number | null


    @IsOptional()
    @IsArray()
    @IsUUID('4', { each: true })
    servicesId: string[]

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

    @IsNumber()
    @IsPositive()
    @Min(1900)
    @Max(new Date().getFullYear() + 2)
    yearBuilt: number

    @IsOptional()
    @IsString()
    @Length(8, 300)
    extraInfo?: string | null
}
