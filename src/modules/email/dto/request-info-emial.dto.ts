import { Type } from "class-transformer";
import { IsEmail, IsString, Length, Matches } from "class-validator";

export class RequestInfoEmailDto {

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
    
}
