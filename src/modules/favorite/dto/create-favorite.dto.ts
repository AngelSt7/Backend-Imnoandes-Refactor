import { IsUUID } from "class-validator";
import { Property } from "generated/prisma";

export class CreateFavoriteDto {
    @IsUUID()
    propertyId: Property['id'];
}
