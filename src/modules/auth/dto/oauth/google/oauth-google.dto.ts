import { IsBoolean, IsEmail, IsEnum, IsString, Length, MinLength } from "class-validator";
import { AUTH_PROVIDERS } from "generated/prisma";

export class oAuthGoogleDto {

    @IsString()
    @Length(3, 30)
    name: string;

    @IsString()
    @Length(3, 30)
    lastname: string;

    @IsEmail()
    @MinLength(13)
    email: string;

    @IsString()
    @IsEnum(AUTH_PROVIDERS)
    authProvider: AUTH_PROVIDERS

    @IsBoolean()
    confirmed: boolean
    
}