import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ResponseRemoveImageDto {
    @ApiProperty({
        type: 'string',
        description: 'Message',
        example: 'Image removed successfully'
    })
    @IsString()
    message: string;
}