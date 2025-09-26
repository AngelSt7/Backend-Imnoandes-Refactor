import { Injectable, NotFoundException } from '@nestjs/common';
import { Location, Prisma, Property, User } from 'generated/prisma';
import { PropertyRepository, PropertySelectsService } from '@/modules/property-me/repository';
import { HandleErrorsService } from '@/common/services';
import { CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from '@/modules/property-me/dto';
import { PropertyFactoryService, FilterService, PropertyFormatterService } from '@/modules/property-me/services';

@Injectable()
export class PropertyService {
    private readonly context = 'property'

    constructor(
        private readonly propertyRepository: PropertyRepository,
        private readonly handleErrorsService: HandleErrorsService,
        private readonly propertyFactoryService: PropertyFactoryService,
        private readonly propertySelectsService: PropertySelectsService,
        private readonly propertyFormatterService: PropertyFormatterService,
        private readonly filterService: FilterService,
    ) { }


    async create(dto: CreatePropertyMeDto, locationId: Location['id'], userId: User['id']) {
        try {
            const slug = this.slug(dto.name);
            const property = this.propertyFactoryService.preparedCreate(dto, locationId, slug, userId);
            return await this.propertyRepository.create(property)
        } catch (error) {
            this.handleErrorsService.handleError(error, this.context);
        }
    }

    async findAll(userId: User['id'], queryParams: PaginationPropertyMeDto) {
        const filters = this.filterService.getFilter(queryParams);
        const preparedSelect = this.propertySelectsService.preparedFindAll();
        const properties = await this.propertyRepository.findAll(userId, filters, queryParams, preparedSelect);
        const propertiesFormatted = this.propertyFormatterService.formatAll(properties.data);
        return {
            data: propertiesFormatted,
            meta: properties.meta
        }
    }

    async findOne(id: Property['id'], userId: User['id']) {
        const preparedSelect = this.propertySelectsService.preparedFindOne();
        const property = await this.propertyRepository.findOne(id, userId, preparedSelect);
        if (!property || property === null) throw new NotFoundException('Property not found');
        const propertyFormatted = this.propertyFormatterService.formatOne(property);
        return propertyFormatted
    }

    async findOneWithRelations(id: Property['id'], userId: User['id']) {
        const preparedSelect = this.propertySelectsService.preparedFindWhitRelations();
        const property = await this.propertyRepository.findOneWithRelations(id, userId, preparedSelect);
        if (!property) throw new NotFoundException('Property not found');
        const propertyFormatted = this.propertyFormatterService.formatDetail(property);
        return propertyFormatted
    }

    async update(id: Property['id'], updatePropertyMeDto: UpdatePropertyMeDto, locationId: Location['id'], prismaClient: Prisma.TransactionClient) {
        const slug = this.slug(updatePropertyMeDto.name);
        const property = await this.propertyFactoryService.preparedUpdate(updatePropertyMeDto, locationId, slug);
        return await this.propertyRepository.update(id, property, prismaClient);
    }

    async changeStatus(id: Property['id'], availability: Property['availability']) {
        return await this.propertyRepository.changeStatus(id, availability);
    }

    slug(name: Property['name']) {
        return name.toLocaleLowerCase().trim().replace(/\s+/g, '-')
    }

}
