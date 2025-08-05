import { ApiProperty } from "@nestjs/swagger";

export class ResponseConfirmAccountDto  {
    @ApiProperty({
        type: 'string',
        description: 'Message',
        example: 'Account confirmed'
    })
    message: string
};