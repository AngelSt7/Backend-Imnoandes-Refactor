import { IsArray, IsUrl, IsUUID } from "class-validator"
import { ImageMain, Property } from "generated/prisma"

export class CreateImagesGalleryPropertyMeDto {
    @IsUUID()
    id: Property['id']

    @IsArray()
    @IsUrl({}, { each: true })
    url: ImageMain['url'][]
}