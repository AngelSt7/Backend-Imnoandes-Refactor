import { ApiProperty } from "@nestjs/swagger";

export class ResponseRecoverPasswordDto {
    @ApiProperty({
        type: 'string',
        description: 'Message',
        example: 'Password changed successfully'
    })
    message: string;
}