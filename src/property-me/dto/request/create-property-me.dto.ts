import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Length, Max, Min } from "class-validator";
import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from "generated/prisma";

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
    @IsNumber()
    @IsPositive()
    bedrooms?: number | null

    @IsOptional()
    @IsNumber()
    @IsPositive()
    bathrooms?: number | null

    @IsNumber()
    @IsPositive()
    area: number

    @IsOptional()
    @IsBoolean()
    furnished?: boolean

    @IsOptional()
    @IsNumber()
    @IsPositive()
    floor?: number

    @IsOptional()
    @IsBoolean()
    hasParking: boolean

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
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
