import { Type } from "class-transformer";
import { IsArray, IsUUID, ValidateNested, ArrayMaxSize } from "class-validator";
import { Property } from "generated/prisma";
import { ImageItemDto } from "./image-item-dto";

export class CreateImagesPropertyMeDto {
    @IsUUID()
    propertyId: Property['id']

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageItemDto)
    @ArrayMaxSize(10)
    images: ImageItemDto[]
}