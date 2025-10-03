import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, Max, Min } from "class-validator";
import { PROPERTY_TYPE } from "generated/prisma";

export class QueryPropertyPublicDto {

    @IsOptional()
    @IsEnum(PROPERTY_TYPE, {
        message: `property_type must be one of the following: ${Object.values(PROPERTY_TYPE).join(', ')}`
    })
    propertyType?: PROPERTY_TYPE;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    @Min(2)
    @Max(10)
    quantity: number
}