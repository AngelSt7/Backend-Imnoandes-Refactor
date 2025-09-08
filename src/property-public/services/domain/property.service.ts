import { Injectable } from '@nestjs/common';
import { CarrouselFilterService } from '../filters/carrousel-filter.service';
import { PropertyRepository } from 'src/property-public/repository';
import { QueryPropertyPublicDto } from 'src/property-public/dto';
import { PropertyFactoryService } from '../factory';
import { PropertyFormatterService } from '../formatter';
import { OnePropertyDB } from 'src/property-public/interfaces/raw/one-property-bd.interface';
import { SearchFilterService } from '../filters/search-filter.service';
import { PaginationPropertyPublicDto } from 'src/property-public/dto/query/pagination-property-public.dto';




@Injectable()
export class PropertyService {
    constructor(
        private readonly carrousekFilterService: CarrouselFilterService,
        private readonly propertyRepository: PropertyRepository,
        private readonly propertyFactoryService: PropertyFactoryService,
        private readonly propertyFormatter: PropertyFormatterService,
        private readonly searchFilterService: SearchFilterService
    ) { }

    async findOne(id: string) {
        const select = this.propertyFactoryService.preparedFindOne();
        const property = await this.propertyRepository.findOne(id, select);
        return this.propertyFormatter.formatOne(property);
    }

    async search(query : PaginationPropertyPublicDto) {
        const filters = this.searchFilterService.getFilter(query);
        return await this.propertyRepository.search(filters);
    }

    async findCarrousel(query: QueryPropertyPublicDto) {
        const filters = this.carrousekFilterService.getFilter(query);
        const select = this.propertyFactoryService.preparedFindCarrousel();
        const carrousel = await this.propertyRepository.findCarrousel(filters, select);
        return this.propertyFormatter.formatCarrousel(carrousel);
    }

}
