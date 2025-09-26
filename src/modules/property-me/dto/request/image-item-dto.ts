import { IsString, IsUrl } from "class-validator";
import { Image } from "generated/prisma";

export class ImageItemDto {
  @IsString()
  publicId: Image['publicId'];

  @IsUrl()
  url: Image['url'];
}
