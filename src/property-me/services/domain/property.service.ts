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
        private readonly propertyFactoryService: PropertyFactoryService,
        private readonly propertyFormatterService: PropertyFormatterService,
        private readonly filterService: FilterService,
    ) { }


    async create(dto: CreatePropertyMeDto, userId: User['id']) {
        try {
            const slug = this.slug(dto.name);
            const property = this.propertyFactoryService.preparedCreate(dto, slug, userId);
            return await this.propertyRepository.create(property)
        } catch (error) {
            this.handleErrorsService.handleError(error, this.context);
        }
    }

    async findAll(userId: User['id'], queryParams: PaginationPropertyMeDto) {
        const filters = this.filterService.getFilter(queryParams);
        const preparedSelect = this.propertyFactoryService.preparedFindAll();
        const properties = await this.propertyRepository.findAll(userId, filters, queryParams, preparedSelect);
        const propertiesFormatted = this.propertyFormatterService.formatAll(properties.data);
        return {
            data: propertiesFormatted,
            meta: properties.meta
        }
    }

    async findOne(id: Property['id'], userId: User['id']) {
        const preparedSelect = this.propertyFactoryService.preparedFindOne();
        const property = await this.propertyRepository.findOne(id, userId, preparedSelect);
        if (!property) throw new NotFoundException('Property not found');
        const propertyFormatted = this.propertyFormatterService.formatOne(property);
        return propertyFormatted
    }

    async findOneWithRelations(id: Property['id'], userId: User['id']) {
        const preparedSelect = this.propertyFactoryService.preparedFindWhitRelations();
        const property = await this.propertyRepository.findOneWithRelations(id, userId, preparedSelect);
        if (!property) throw new NotFoundException('Property not found');
        const propertyFormatted = this.propertyFormatterService.formatDetail(property);
        return propertyFormatted
    }

    async update(id: Property['id'], updatePropertyMeDto: UpdatePropertyMeDto, prismaClient: Prisma.TransactionClient) {
        const slug = this.slug(updatePropertyMeDto.name);
        const property = await this.propertyFactoryService.preparedUpdate(updatePropertyMeDto, slug);
        return await this.propertyRepository.update(id, property, prismaClient);
    }

    async changeStatus(id: Property['id'], availability: Property['availability']) {
        return await this.propertyRepository.changeStatus(id, availability);
    }

    slug(name: Property['name']) {
        return name.toLocaleLowerCase().trim().replace(/\s+/g, '-')
    }

}
