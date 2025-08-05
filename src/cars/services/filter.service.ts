import { Injectable } from '@nestjs/common';
import { PaginationCarsDto } from '../dto/request/pagination-cars.dto';

@Injectable()
export class FilterService {

    resolveFilter(query: PaginationCarsDto) {
        const filter: any = {};

        if (query.search) {
            const normalized = this.applyRegex(query.search);
            filter.$or = [
                { brand: normalized },
                { model: normalized },
            ];
        }

        if (query.brand) filter.brand = this.applyRegex(query.brand);
        if (query.model) filter.model = this.applyRegex(query.model);
        if (query.color) filter.color = this.applyRegex(query.color);
        if (query.fuelType) filter.fuelType = this.applyRegex(query.fuelType);
        if (query.transmission) filter.transmission = this.applyRegex(query.transmission);
        if (query.status) filter.status = this.applyRegex(query.status);
        if (query.doors) filter.doors = query.doors;
        if (query.seats) filter.seats = query.seats;

        if (query.minMileage || query.maxMileage) {
            filter.mileage = {};
            if (query.minMileage) filter.mileage.$gte = query.minMileage;
            if (query.maxMileage) filter.mileage.$lte = query.maxMileage;
        }

        if (query.minPrice || query.maxPrice) {
            filter.price = {};
            if (query.minPrice) filter.price.$gte = query.minPrice;
            if (query.maxPrice) filter.price.$lte = query.maxPrice;
        }

        if (query.minYear || query.maxYear) {
            filter.year = {};
            if (query.minYear) filter.year.$gte = query.minYear;
            if (query.maxYear) filter.year.$lte = query.maxYear;
        }

        return filter
    }

    private applyRegex(item: string | number) {
        return { $regex: item, $options: 'i' }
    }
}
