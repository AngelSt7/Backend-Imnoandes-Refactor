import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, Length, Matches } from "class-validator";

export class RecoverPasswordDto {
    @ApiProperty({
        type: "string",
        description: "User email",
        example: "example@example.com",
    })
    @IsString()
    @IsEmail()
    @MinLength(13)
    email: string;

    @ApiProperty({
        type: "string",
        description: "User password",
        example: "Lapicera123*@",
    })
    @IsString()
    @Length(8, 30)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]+$/)
    password: string;
}
