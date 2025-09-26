import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CURRENCY, PROPERTY_CATEGORY, PROPERTY_TYPE } from 'generated/prisma';
import { BasePaginationDto } from '@/common/dto';
import { ToBoolean } from '@/common/decorators';

export class PaginationPropertyMeDto extends BasePaginationDto {

    @IsOptional()
    @IsString()
    search: string

    @IsOptional()
    @IsBoolean()
    @ToBoolean()
    availability: boolean;

    @IsOptional()
    @IsUUID()
    departmentId: string

    @IsOptional()
    @IsEnum(PROPERTY_TYPE, {
        message: `The property type must be one of the following: ${Object.values(PROPERTY_TYPE).join(', ')}`
    })
    propertyType: PROPERTY_TYPE

    @IsOptional()
    @IsEnum(PROPERTY_CATEGORY, {
        message: `The property type must be one of the following: ${Object.values(PROPERTY_CATEGORY).join(', ')}`
    })
    propertyCategory: PROPERTY_CATEGORY

    @IsOptional()
    @IsEnum(CURRENCY, {
        message: `The currency type must be one of the following: ${Object.values(CURRENCY).join(', ')}`
    })
    currency: string

}