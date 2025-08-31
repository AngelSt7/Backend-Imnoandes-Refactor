import { IsUrl, IsUUID } from "class-validator"
import { ImageMain, Property } from "generated/prisma"

export class CreateImageMainPropertyMeDto {
    @IsUUID()
    id: Property['id']

    @IsUrl()
    url: ImageMain['url']
}