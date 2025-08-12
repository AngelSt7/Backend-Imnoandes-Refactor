import { Injectable, Logger } from '@nestjs/common';
import { CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from './dto';
import { Property, User } from 'generated/prisma';
import { PropertyService, TransactionService, ServiceToPropertyUtilsService } from './services';
import { CacheUtilsService } from 'src/common/services';
import { CACHE_KEYS } from 'src/cache/cache-keys';

@Injectable()
export class PropertyMeService {

  private readonly logger = new Logger(PropertyMeService.name)

  constructor(
    private readonly propertyService: PropertyService,
    private readonly cacheUtilsService: CacheUtilsService,
    private readonly serviceToPropertyUtils: ServiceToPropertyUtilsService,
    private readonly transactionService: TransactionService
  ) { }

  async create(createProperty: CreatePropertyMeDto, userId: User['id']) {
    await this.propertyService.create(createProperty, userId);
    this.cacheUtilsService.deleteKeys(CACHE_KEYS.PROPERTIES_ME);
    return {
      message: 'Property created successfully',
    }
  }

  async findAll(queryParams: PaginationPropertyMeDto, userId: User['id'],) {
    return await this.propertyService.findAll(userId, queryParams);
  }

  async findOne(id: Property['id'], userId: User['id']) {
    return await this.propertyService.findOne(id, userId);
  }

  async findOneWithRelations(id: Property['id'], userId: User['id']) {
    return await this.propertyService.findOneWithRelations(id, userId);
  }


  async update(id: Property['id'], updateProperty: UpdatePropertyMeDto, userId: User['id']) {
    const property = await this.propertyService.findOne(id, userId);
    const { adds, deletes } = this.serviceToPropertyUtils.preparedData(updateProperty.servicesId, property.servicesId);
    await this.transactionService.update(deletes, { ...updateProperty, servicesId: adds }, id);
    this.cacheUtilsService.deleteKeys([CACHE_KEYS.PROPERTIES_ME, `${CACHE_KEYS.PROPERTY_ME}/${id}`]);
    this.logger.debug('Transaction completed successfully');
    return {
      message: 'Property updated successfully',
    }
  }

  async changeStatus(id: Property['id'], userId: User['id']) {
    const property = await this.propertyService.findOne(id, userId);
    await this.propertyService.changeStatus(id, property.availability);
    this.cacheUtilsService.deleteKeys([CACHE_KEYS.PROPERTIES_ME, `${CACHE_KEYS.PROPERTY_ME}/${id}`]);
    return {
      message: 'Property status changed successfully',
    }
  }
}
