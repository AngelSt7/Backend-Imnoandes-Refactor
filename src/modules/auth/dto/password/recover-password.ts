import { IsString, Length, Matches } from "class-validator";

export class RecoverPasswordDto {
  @IsString()
  @Length(8, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]+$/, {
    message: 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo.',
  })
  password: string;

  @IsString()
  repeatPassword: string;
}
