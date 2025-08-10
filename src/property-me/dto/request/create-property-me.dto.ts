import { IsArray, IsBoolean, IsEnum, IsNumber, IsPositive, IsString, IsUUID, Length } from "class-validator";
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

    @IsBoolean()
    availability: boolean

    @IsUUID()
    departmentId: string

    @IsUUID()
    provinceId: string

    @IsUUID()
    districtId: string

    @IsNumber()
    @IsPositive()
    bedrooms: number

    @IsNumber()
    @IsPositive()
    bathrooms: number

    @IsNumber()
    @IsPositive()
    area: number

    @IsBoolean()
    furnished: boolean

    @IsNumber()
    @IsPositive()
    floor: number

    @IsBoolean()
    parkingSpaces: boolean

    @IsArray()
    @IsUUID('4', { each: true })
    servicesId: string[]
}
