import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches } from "class-validator";

export class RecoverPasswordDto {
  @ApiProperty({
    type: "string",
    description: "New password",
    example: "Lapicera123*@",
  })
  @IsString()
  @Length(8, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]+$/, {
    message: 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un símbolo.',
  })
  password: string;

  @ApiProperty({
    type: "string",
    description: "Repeat password to confirm",
    example: "Lapicera123*@",
  })
  @IsString()
  repeatPassword: string;
}
