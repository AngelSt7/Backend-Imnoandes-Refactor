

import { Injectable } from '@nestjs/common';
import { Property } from 'generated/prisma';
import { PaginationPropertyPublicDto } from 'src/property-public/dto/query/pagination-property-public.dto';

@Injectable()
export class SearchFilterService {
    private readonly mode = 'insensitive';
    private readonly searchFields: (keyof Property)[] = ['name'];

    getFilter(query: PaginationPropertyPublicDto) {
        const numericFilters: Record<string, [number?, number?]> = {
            price: [query.minPrice, query.maxPrice],
            area: [query.minArea, query.maxArea],
            bathrooms: [query.minBathrooms],
            bedrooms: [query.minBedrooms],
            parkingSpaces: [query.minParkingSpaces],
        };

        const filter: any = {};

        if (query.published) {
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - query.published);
            filter.updatedAt = { gte: fromDate };
        }

        for (const [field, [min, max]] of Object.entries(numericFilters)) {
            if (min != null || max != null) {
                filter[field] = {};
                if (min != null) filter[field].gte = min;
                if (max != null) filter[field].lte = max;
            }
        }

        const exactFilters: (keyof PaginationPropertyPublicDto)[] = [
            'currency',
            'propertyType',
            'propertyCategory',
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
    private getOrFilter(words: string[]) {
        return words.flatMap(word =>
            this.searchFields.map(field => ({
                [field]: { contains: word, mode: this.mode },
            }))
        );
    }

}