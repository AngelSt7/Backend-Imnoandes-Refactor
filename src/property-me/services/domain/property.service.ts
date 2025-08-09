import { CreatePropertyDB } from 'src/property-me/interfaces';
import { HandleErrorsService } from '../../../common/services';
import { Injectable } from '@nestjs/common';
import { Property, User } from 'generated/prisma';
import { PropertyRepository } from 'src/property-me/repository';
import { CreatePropertyMeDto } from 'src/property-me/dto';

@Injectable()
export class PropertyService {

    private readonly context = 'property'

    constructor(
        private readonly propertyRepository: PropertyRepository,
        protected readonly handleErrorsService: HandleErrorsService
    ) {}

    create(property: CreatePropertyMeDto, slug: Property['slug'], userId: User['id']) {
        try {
            return this.propertyRepository.create(property, slug, userId);
        } catch (error) {
            this.handleErrorsService.handleError(error, this.context);
        }
    }

    slug(name: Property['name']){
        return name.toLocaleLowerCase().trim().replace(/\s+/g, '-')
    }
}
