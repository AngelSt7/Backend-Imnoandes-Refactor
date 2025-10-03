import { Type } from "class-transformer";
import { IsEmail, IsString, Length, Matches, Max, Min, MIN, MinLength } from "class-validator";

export class ContactEmailDto {

    @IsString()
    fullName: string;

    @IsEmail()
    email: string;

    @Matches(/^9\d{8}$/, { message: 'Phone number is not valid' })
    @Type(() => String)
    phone: string;

    @IsString()
    @Length(20, 350)
    message: string;

    @IsString()
    @Length(10, 350)
    address: string;

    @IsEmail()
    ownerEmail: string;
}
