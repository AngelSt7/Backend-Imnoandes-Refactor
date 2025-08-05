import { ApiProperty } from "@nestjs/swagger";

export class ResponseRequestTokenDto {
    @ApiProperty({
        type: 'string',
        description: 'Message',
        example: 'Token sent to your email'
    })
    message: string;
}