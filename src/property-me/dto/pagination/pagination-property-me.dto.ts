import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { CURRENCY } from 'generated/prisma';
import { BasePaginationDto } from "src/common/dto/base-pagination.dto";

export class PaginationPropertyMeDto extends BasePaginationDto {

    @IsOptional()
    @IsString()
    search: string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    minPrice: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    maxPrice: number

    @IsOptional()
    @IsBoolean()
    availability: boolean

    @IsOptional()
    @IsUUID()
    departamentId: string

    @IsOptional()
    @IsUUID()
    provinceId: string

    @IsOptional()
    @IsUUID()
    districtId: string

    @IsOptional()
    @IsEnum(CURRENCY, {
        message: `The currency type must be one of the following: ${Object.values(CURRENCY).join(', ')}`
    })
    currency: string

}