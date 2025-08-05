import { ApiProperty } from "@nestjs/swagger";

export class ResponseForgotPasswordDto {
    @ApiProperty({
        type: 'string',
        description: 'Message',
        example: 'he token to reset your account was sent to your email'
    })
    message: string;
}