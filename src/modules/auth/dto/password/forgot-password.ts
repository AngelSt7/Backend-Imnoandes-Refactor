import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength } from "class-validator";

export class ForgotPasswordDto {
    @IsString()
    @IsEmail()
    @MinLength(13)
    email: string;
}
