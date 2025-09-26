import { Type } from "class-transformer";
import { IsString, Matches } from "class-validator";

export class UpdatePhoneDto {
    @IsString()
    @Type(() => String)
    @Matches(/^9[0-9]{8}$/, { message: 'El teléfono debe tener 9 dígitos y comenzar con 9' })
    phone: string;
}