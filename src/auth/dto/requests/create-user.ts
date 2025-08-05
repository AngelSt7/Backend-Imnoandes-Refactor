import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Matches, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        type: 'string',
        description: 'User name',
        example: 'Angel'
    })
    @IsString()
    @Length(3, 30)
    name: string;

    @ApiProperty({
        type: 'string',
        description: 'User last name',
        example: 'Santa Cruz'
    })
    @IsString()
    @Length(3, 30)
    lastName: string;

    @ApiProperty({
        type: 'string',
        description: 'User email',
        example: 'example@example.com'
    })
    @IsString()
    @IsEmail()
    @MinLength(13)
    email: string;

    @ApiProperty({
        type: 'string',
        description: 'User password',
        example: 'Lapicera123*@'
    })
    @IsString()
    @Length(8, 30)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._-])[A-Za-z\d@$!%*?&#._-]+$/)
    password: string;
}

