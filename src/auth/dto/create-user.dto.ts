import { IsEmail, IsOptional, IsString, Length, Matches, MinLength, IsDateString, IsInt, Min, Max } from 'class-validator';

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
        { message: 'La contraseña debe incluir mayúsculas, minúsculas, números y caracteres especiales' }
    )
    password: string;

    @IsOptional()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, {
        message: 'birthDate debe tener el formato YYYY-MM-DD (ej. 2025-08-12)',
    })
    birthDate?: string;

    @IsOptional()
    @IsString()
    @Length(9, 9, { message: 'El número telefónico debe tener exactamente 9 dígitos' })
    @Matches(/^\d+$/, { message: 'El número telefónico solo debe contener dígitos' })
    phone?: string;
}
