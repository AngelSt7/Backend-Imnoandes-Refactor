import { IsString } from "class-validator";
import { CreateImageDto } from "./create-image.dto";

export class DeleteImageDto extends CreateImageDto {
    @IsString()
    publicId: string
};