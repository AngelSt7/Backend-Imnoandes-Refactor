

import { Injectable } from '@nestjs/common';
import { Property } from 'generated/prisma';
import { QueryPropertyPublicDto } from 'src/property-public/dto';

@Injectable()
export class CarrouselFilterService {
    private readonly mode = 'insensitive';
    private readonly searchFields: (keyof Property)[] = ['name'];

    getFilter(query: QueryPropertyPublicDto) {
        const filter: any = {};

        const exactFilters: (keyof QueryPropertyPublicDto)[] = [
            'propertyType',
        ];

        for (const key of exactFilters) {
            if (query[key] !== undefined && query[key] !== null) {
                filter[key] = query[key];
            }
        }

        return filter;
    }

    private getAndFilter(words: string[]) {
        return words.map(word => ({
            OR: this.searchFields.map(field => ({
                [field]: { contains: word, mode: this.mode },
            })),
        }));
    }

    private getOrFilter(words: string[]) {
        return words.flatMap(word =>
            this.searchFields.map(field => ({
                [field]: { contains: word, mode: this.mode },
            }))
        );
    }

}