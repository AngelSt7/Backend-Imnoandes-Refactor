import { HandleErrorsService } from '../../../common/services';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Property, User } from 'generated/prisma';
import { PropertyRepository } from 'src/property-me/repository';
import { CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from 'src/property-me/dto';
import { PropertyFactoryService } from '../factory';
import { PropertyFormatterService } from '../formatter';
import { FilterService } from '../filter/filter.service';

@Injectable()
export class PropertyService {
    private readonly context = 'property'

    constructor(
        private readonly propertyRepository: PropertyRepository,
        private readonly handleErrorsService: HandleErrorsService,
        private readonly propertyFactory: PropertyFactoryService,
        private readonly propertyFormatter: PropertyFormatterService,
        private readonly filterService: FilterService,
    ) { }


    async create(createPropertyMeDto: CreatePropertyMeDto, userId: User['id']) {
        try {
            const slug = this.slug(createPropertyMeDto.name);
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

    async findOne(id: Property['id'], userId: User['id']) {
        const property = await this.propertyRepository.findOne(id, userId);
        if (!property) throw new NotFoundException('Property not found');
        const propertyFormatted = this.propertyFormatter.formatOne(property);
        return propertyFormatted
    }

    async findOneWithRelations(id: Property['id'], userId: User['id']) {
        const property = await this.propertyRepository.findOneWithRelations(id, userId);
        if (!property) throw new NotFoundException('Property not found');
        const propertyFormatted = this.propertyFormatter.formatDetail(property);
        return propertyFormatted
    }

    async update(id: Property['id'], updatePropertyMeDto: UpdatePropertyMeDto, prismaClient: Prisma.TransactionClient) {
        const slug = this.slug(updatePropertyMeDto.name!);
        return await this.propertyRepository.update(id, updatePropertyMeDto, slug, prismaClient);
    }

    async changeStatus(id: Property['id'], availability: Property['availability']) {
        return await this.propertyRepository.changeStatus(id, availability);
    }

    slug(name: Property['name']) {
        return name.toLocaleLowerCase().trim().replace(/\s+/g, '-')
    }


}
