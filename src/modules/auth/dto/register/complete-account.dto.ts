import { Type } from "class-transformer";
import { IsString, Length, IsOptional, Matches, IsDate, IsUUID } from "class-validator";

export class CompleteAccountDto {

    @IsUUID()
    id: string;

    @IsString()
    @Length(3, 30)
    name: string;

    @IsString()
    @Length(3, 30)
    lastname: string;

    @IsOptional()
    @Type(() => String)
    @IsString()
    @Length(9, 9, { message: 'El número telefónico debe tener exactamente 9 dígitos' })
    @Matches(/^\d+$/, { message: 'El número telefónico solo debe contener dígitos' })
    phone?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'birthDate debe ser una fecha válida (ej. 1995-08-12)' })
    birthDate?: Date;
}