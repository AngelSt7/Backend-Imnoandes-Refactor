import { IsOptional, IsString, IsUrl, IsUUID } from "class-validator"
import { Image, Property } from "generated/prisma"

export class CreateImagePropertyMeDto {

    @IsOptional()
    @IsUUID()
    id?: Image['id']

    @IsUUID()
    propertyId: Property['id']

    @IsString()
    publicId: Image['publicId']

    @IsUrl()
    url: Image['url']
}