import { IsNotEmpty, IsString } from "class-validator";

export class QuerySearchLocationDto {
    @IsString()
    @IsNotEmpty()
    search: string;
}