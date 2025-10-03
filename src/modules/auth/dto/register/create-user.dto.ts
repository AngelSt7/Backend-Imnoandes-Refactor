import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length, Matches, MinLength, IsDate } from 'class-validator';

export class CreateUserDto {
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
    @Length(8, 30)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]+$/,
        { message: 'The password must include at least one lowercase letter, one uppercase letter, one number, and one special character' }
    )
    password: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'birthDate debe ser una fecha válida (ej. 1995-08-12)' })
    birthDate?: Date;

    @IsOptional()
    @Type(() => String)
    @IsString()
    @Length(9, 9, { message: 'The phone number must have exactly 9 digits' })
    @Matches(/^\d+$/, { message: 'The phone number must have exactly 9 digits' })
    phone?: string;
}
