import { CreatePropertyDB, OnePropertyDB } from 'src/property-me/interfaces';
import { HandleErrorsService } from '../../../common/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Property, User } from 'generated/prisma';
import { PropertyRepository } from 'src/property-me/repository';
import { CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from 'src/property-me/dto';
import { PropertyFactoryService } from '../factory';
import { PropertyFormatterService } from '../formatter';
import { Cached } from '@decorators/cache/cached.decorator';
import { CACHE_KEYS } from 'src/cache/cache-keys';
import { FilterService } from '../filter/filter.service';
import { FormattedOneProperty } from 'src/property-me/interfaces/one-property-bd.interface';
import { PropertyUtilsService } from '../utils/property-utils.service';
import { ServiceService } from './service.service';
@Injectable()
export class PropertyService {

    private readonly context = 'property'

    constructor(
        private readonly propertyRepository: PropertyRepository,
        private readonly handleErrorsService: HandleErrorsService,
        private readonly propertyFactory: PropertyFactoryService,
        private readonly propertyFormatter: PropertyFormatterService,
        private readonly filterService: FilterService,
        private readonly propertyUtils: PropertyUtilsService,
        private readonly serviceService: ServiceService
    ) { }


    async create(createPropertyMeDto: CreatePropertyMeDto, slug: Property['slug'], userId: User['id']) {
        try {
            const property = this.propertyFactory.preparedCreate(createPropertyMeDto, slug, userId);
            return await this.propertyRepository.create(property)
        } catch (error) {
            this.handleErrorsService.handleError(error, this.context);
        }
    }

    async findAll(userId: User['id'], queryParams: PaginationPropertyMeDto) {
        const filters = this.filterService.getFilter(queryParams);
        const properties = await this.propertyRepository.findAll(userId, filters);
        const propertiesFormatted = this.propertyFormatter.formatAll(properties);
        return propertiesFormatted
    }
    
    async findOne(id: Property['id']) {
        const property = await this.propertyRepository.findOne(id);
        if(!property) throw new NotFoundException('Property not found');
        const propertyFormatted = this.propertyFormatter.formatOne(property);
        return propertyFormatted
    }

    async update(id: Property['id'], updatePropertyMeDto: UpdatePropertyMeDto, userId: User['id']) {
        const slug = this.slug(updatePropertyMeDto.name!);
        return await this.propertyRepository.update(id, updatePropertyMeDto, slug, userId);
    }

    async changeStatus(id: Property['id'], availability: Property['availability']) {
        return await this.propertyRepository.changeStatus(id, availability);
    }

    slug(name: Property['name']) {
        return name.toLocaleLowerCase().trim().replace(/\s+/g, '-')
    }


}
