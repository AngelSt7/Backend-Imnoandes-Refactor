import { IsEnum, IsOptional } from "class-validator";
import { PROPERTY_TYPE } from "generated/prisma";

export class QueryPropertyPublicDto {

    @IsOptional()
    @IsEnum(PROPERTY_TYPE, {
        message: `property_type must be one of the following: ${Object.values(PROPERTY_TYPE).join(', ')}`
    })
    propertyType?: PROPERTY_TYPE;
}