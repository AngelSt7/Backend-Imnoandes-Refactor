import { Injectable } from '@nestjs/common';
import { Property } from 'generated/prisma';
import { PaginationPropertyPublicDto } from 'src/property-public/dto/pagination/pagination-property-public.dto';

@Injectable()
export class SearchFilterService {
  private readonly mode = 'insensitive';
  private readonly searchFields: (keyof Property)[] = ['name'];

  getFilter(query: PaginationPropertyPublicDto) {
    const filter: any = {};

    Object.assign(filter, this.buildPublishedFilter(query));
    Object.assign(filter, this.buildNumericFilters(query));
    Object.assign(filter, this.buildExactFilters(query));

    return filter;
  }

  private buildPublishedFilter(query: PaginationPropertyPublicDto) {
    if (query.published !== undefined && query.published !== null) {
      const fromDate = new Date();
      if (query.published === 0) {
        // Solo hoy, desde las 00:00
        fromDate.setHours(0, 0, 0, 0);
      } else {
        fromDate.setDate(fromDate.getDate() - query.published);
      }
      return { updatedAt: { gte: fromDate } };
    }
    return {};
  }

  private buildNumericFilters(query: PaginationPropertyPublicDto) {
    const numericFilters: Record<string, [number?, number?]> = {
      price: [query.minPrice, query.maxPrice],
      area: [query.minArea, query.maxArea],
      bathrooms: [query.minBathrooms],
      bedrooms: [query.minBedrooms],
      parkingSpaces: [query.minParkingSpaces],
    };

    const filter: any = {};
    for (const [field, [min, max]] of Object.entries(numericFilters)) {
      if (min != null || max != null) {
        filter[field] = {};
        if (min != null) filter[field].gte = min;
        if (max != null) filter[field].lte = max;
      }
    }
    return filter;
  }

  private buildExactFilters(query: PaginationPropertyPublicDto) {
    const exactFilters: (keyof PaginationPropertyPublicDto)[] = [
      'currency',
      'propertyCategory',
      'propertyType',
      'location',
    ];

    const filter: any = {};
    for (const key of exactFilters) {
      if (query[key] !== undefined && query[key] !== null) {
        filter[key] = Array.isArray(query[key])
          ? { in: query[key] }
          : query[key];
      }
    }
    return filter;
  }

  // Filter by AND
  private getAndFilter(words: string[]) {
    return words.map(word => ({
      OR: this.searchFields.map(field => ({
        [field]: { contains: word, mode: this.mode },
      })),
    }));
  }

  // Filter by OR
  private getOrFilter(words: string[]) {
    return words.flatMap(word =>
      this.searchFields.map(field => ({
        [field]: { contains: word, mode: this.mode },
      }))
    );
  }
}
