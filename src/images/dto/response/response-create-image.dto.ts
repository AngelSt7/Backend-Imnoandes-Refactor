import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class ResponseCreateImageDto {
    @IsArray()
    @ApiProperty({
        type: 'array',
        description: 'Array of image urls',
        items: { type: 'string', example: 'https://res.cloudinary.com/dihj0ezqt/image/upload/v1751835144/images/vtzhdun8qajtsggjulz3.png' }
    })
    urls: string[]
}