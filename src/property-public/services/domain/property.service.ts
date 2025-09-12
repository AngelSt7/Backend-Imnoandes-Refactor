import { Injectable } from '@nestjs/common';
import { QueryPropertyPublicDto, PaginationPropertyPublicDto } from 'src/property-public/dto';
import { PropertyRepository, PropertySelectsService } from 'src/property-public/repository';
import { CarrouselFilterService, SearchFilterService, PropertyFormatterService } from 'src/property-public/services';

@Injectable()
export class PropertyService {
    constructor(
        private readonly carrouselFilterService: CarrouselFilterService,
        private readonly propertyRepository: PropertyRepository,
        private readonly propertyFormatter: PropertyFormatterService,
        private readonly searchFilterService: SearchFilterService,
        private readonly propertySelectsService: PropertySelectsService
    ) { }

    async findOne(id: string) {
        const select = this.propertySelectsService.preparedFindOne();
        const property = await this.propertyRepository.findOne(id, select);
        return this.propertyFormatter.formatOne(property);
    }

    async search(query : PaginationPropertyPublicDto) {
        const select = this.propertySelectsService.preparedSearch()
        const filters = this.searchFilterService.getFilter(query);
        const response = await this.propertyRepository.search(filters, select, query.page);
        const formated = this.propertyFormatter.formatSearch(response.data);
        return {
            data: formated,
            meta: response.meta
        }
    }

    async findCarrousel(query: QueryPropertyPublicDto) {
        const select = this.propertySelectsService.preparedFindCarrousel();
        const filters = this.carrouselFilterService.getFilter(query);
        const carrousel = await this.propertyRepository.findCarrousel(filters, select);
        return this.propertyFormatter.formatCarrousel(carrousel);
    }

}
