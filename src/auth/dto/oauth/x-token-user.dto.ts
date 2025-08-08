import { IsUUID } from "class-validator";

export class XTokenUserDto {
    
    @IsUUID()
    x_token: string;
}