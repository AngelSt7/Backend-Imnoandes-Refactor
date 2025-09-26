

import { Injectable } from '@nestjs/common';
import { Property } from 'generated/prisma';
import { PaginationPropertyMeDto } from '@/modules/property-me/dto';

@Injectable()
export class FilterService {
    private readonly mode = 'insensitive';
    private readonly searchFields: (keyof Property)[] = ['name', 'address'];

    getFilter(query: PaginationPropertyMeDto) {

        const filter: any = {};

        if (query.search) {
            const words = query.search.trim().split(/[\s-]+/);

            filter.AND = this.getAndFilter(words);
        }

        const exactFilters: (keyof PaginationPropertyMeDto)[] = [
            'currency',
            'departmentId',
            'availability',
            'propertyCategory',
            'propertyType',
        ];

        for (const key of exactFilters) {
            if (query[key] !== undefined && query[key] !== null) {
                filter[key] = query[key];
            }
        }

        return filter;
    }

    //Filter by AND
    //example: filter.AND = this.getAndFilter(words);
    private getAndFilter(words: string[]) {
        return words.map(word => ({
            OR: this.searchFields.map(field => ({
                [field]: { contains: word, mode: this.mode },
            })),
        }));
    }

    //Filter by OR
    //example: filter.ORD = this.getOrFilter(words);
    private  __getOrFilter(words: string[]) {
        return words.flatMap(word =>
            this.searchFields.map(field => ({
                [field]: { contains: word, mode: this.mode },
            }))
        );
    }

}