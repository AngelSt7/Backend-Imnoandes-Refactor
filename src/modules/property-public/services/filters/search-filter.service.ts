import { Injectable } from '@nestjs/common';
import { Property } from 'generated/prisma';
import { PaginationPropertyPublicDto } from '@/modules/property-public/dto';
import { IdsLocation } from '@/modules/property-public/interfaces';

@Injectable()
export class SearchFilterService {
  private readonly mode = 'insensitive';
  private readonly searchFields: (keyof Property)[] = ['name'];

  getFilter(query: PaginationPropertyPublicDto, idLocations: IdsLocation | undefined) {
    const filter: any = {};

    Object.assign(filter, this.buildPublishedFilter(query));
    Object.assign(filter, this.buildNumericFilters(query));
    Object.assign(filter, this.buildExactFilters(query));
    if(idLocations !== undefined) {
      Object.assign(filter, this.buildLocationFilter(idLocations));
    }

    return filter;
  }

  private buildPublishedFilter(query: PaginationPropertyPublicDto) {
    if (query.published !== undefined && query.published !== null) {
      const fromDate = new Date();
      if (query.published === 0) {
        fromDate.setHours(0, 0, 0, 0);
      } else {
        fromDate.setDate(fromDate.getDate() - query.published);
      }
      return { updatedAt: { gte: fromDate } };
    }
    return {};
  }

  private buildNumericFilters(query: PaginationPropertyPublicDto) {
    // key: [min, max, relación opcional]
    const numericFilters: Record<string, [number?, number?, string?]> = {
      price: [query.minPrice, query.maxPrice],
      area: [query.minArea, query.maxArea, 'residential'],
      bathrooms: [query.minBathrooms, undefined, 'residential'],
      bedrooms: [query.minBedrooms, query.maxBedrooms, 'residential'],
      parkingSpaces: [query.minParkingSpaces, undefined, 'commercial'],
    };

    const filter: any = {};

    for (const [field, [min, max, relation]] of Object.entries(numericFilters)) {
      if (min != null || max != null) {
        if (relation) {
          filter[relation] = filter[relation] || {};
          filter[relation][field] = {};
          if (min != null) filter[relation][field].gte = min;
          if (max != null) filter[relation][field].lte = max;
        } else {
          filter[field] = {};
          if (min != null) filter[field].gte = min;
          if (max != null) filter[field].lte = max;
        }
      }
    }

    return filter;
  }

  private buildLocationFilter(idLocations: IdsLocation) {
    const { departmentsIds, provinceIds, districtIds } = idLocations;

    const orFilters: any[] = [];

    if (departmentsIds?.length) {
      orFilters.push({ location: { departmentId: { in: departmentsIds } } });
    }
    if (provinceIds?.length) {
      orFilters.push({ location: { provinceId: { in: provinceIds } } });
    }
    if (districtIds?.length) {
      orFilters.push({ location: { districtId: { in: districtIds } } });
    }

    if (orFilters.length === 0) return {};

    return { AND: orFilters };
  }


  private buildExactFilters(query: PaginationPropertyPublicDto) {
    const exactFilters: (keyof PaginationPropertyPublicDto | keyof Property)[] = [
      'currency',
      'propertyCategory',
      'propertyType',
      'address'
    ];

    const filter: any = {};
    for (const key of exactFilters) {
      const value = query[key];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            filter[key] = { in: value };
          }
        } else {
          filter[key] = value;
        }
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
