import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class QueryPaginationDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    page: number;
}