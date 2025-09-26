import { IsEmail, IsString, Length, Matches } from "class-validator";

export class UpdatePasswordDto {

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 30)
    currentPassword: string;

    @IsString()
    @Length(8, 30)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]+$/,
        { message: 'The password must include at least one lowercase letter, one uppercase letter, one number, and one special character' }
    )
    newPassword: string;
}