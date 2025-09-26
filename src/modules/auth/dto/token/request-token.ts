import { IsString, IsEmail, MinLength } from "class-validator";

export class RequestTokenDto {
    @IsString()
    @IsEmail()
    @MinLength(13)
    email: string;
}
