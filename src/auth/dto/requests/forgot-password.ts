import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength } from "class-validator";

export class ForgotPasswordDto {
    @ApiProperty({
        type: "string",
        description: "User email",
        example: "example@example.com",
    })
    @IsString()
    @IsEmail()
    @MinLength(13)
    email: string;
}
