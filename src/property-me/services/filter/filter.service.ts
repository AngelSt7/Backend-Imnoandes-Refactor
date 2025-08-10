
import { Injectable } from '@nestjs/common';
import { Property } from 'generated/prisma';
import { PaginationPropertyMeDto } from 'src/property-me/dto';

@Injectable()
export class FilterService {
    private readonly mode = 'insensitive';
    private readonly searchFields : (keyof Property)[] = ['name'];

    getFilter(query: PaginationPropertyMeDto) {
        const filter: any = {};

        if (query.search) {
            filter.OR = this.searchFields.map(field => ({
                [field]: { contains: query.search, mode: this.mode },
            }));
        }

        if (query.minPrice || query.maxPrice) {
            filter.price = {};
            if (query.minPrice) filter.price.gte = query.minPrice;
            if (query.maxPrice) filter.price.lte = query.maxPrice;
        }

        const exactFilters: (keyof PaginationPropertyMeDto)[] = [
            'currency',
            'departamentId',
            'provinceId',
            'districtId',
            'availability',
        ];

        for( const key of exactFilters) {
            if(query[key] !== undefined && query[key] !== null) {
                filter[key] = query[key];
            }
        }

        return filter;
    }


}