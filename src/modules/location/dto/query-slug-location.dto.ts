import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Location } from "generated/prisma";

export class QuerySlugLocationDto {
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    @Transform(({ value }) => 
        typeof value === 'string' ? value.split(',').map(val => val.trim()) : value
    )
    slugs: Location['slug'][];
}