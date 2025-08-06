import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Length, Matches, MinLength, IsDateString, IsInt, Min, Max, IsDate } from 'class-validator';

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
    @Type(() => Date)
    @IsDate({ message: 'birthDate debe ser una fecha válida (ej. 1995-08-12)' })
    birthDate?: Date;

    @IsOptional()
    @IsString()
    @Length(9, 9, { message: 'El número telefónico debe tener exactamente 9 dígitos' })
    @Matches(/^\d+$/, { message: 'El número telefónico solo debe contener dígitos' })
    phone?: string;
}
