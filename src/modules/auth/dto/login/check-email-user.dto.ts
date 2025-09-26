import { IsEmail } from "class-validator";

export class CheckEmailUserDto {
    @IsEmail()
    email: string
}