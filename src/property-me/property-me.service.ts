import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePropertyMeDto } from './dto/request/create-property-me.dto';
import { UpdatePropertyMeDto } from './dto/request/update-property-me.dto';
import { Property, User, ServiceToProperty } from 'generated/prisma';
import { PropertyService, ServiceService } from './services';
import { PaginationPropertyMeDto } from './dto';
import { CacheUtilsService } from 'src/common/services';
import { CACHE_KEYS } from 'src/cache/cache-keys';
import { PropertyUtilsService } from './services/utils/property-utils.service';

@Injectable()
export class PropertyMeService {

  constructor(
    private readonly propertyService: PropertyService,
    private readonly cacheUtilsService: CacheUtilsService,
    private readonly propertyUtils: PropertyUtilsService,
    private readonly serviceToProperty: ServiceService
  ) { }

  async create(createProperty: CreatePropertyMeDto, userId: User['id']) {
    const slug = this.propertyService.slug(createProperty.name);
    await this.propertyService.create(createProperty, slug, userId);
    this.cacheUtilsService.deleteKeys(CACHE_KEYS.PROPERTIES_ME);
    return {
      message: 'Property created successfully',
    }
  }

  async findAll(userId: User['id'], queryParams: PaginationPropertyMeDto) {
    return await this.propertyService.findAll(userId, queryParams);
  }

  async findOne(id: Property['id']) {
    return await this.propertyService.findOne(id);
  }

  async update(id: Property['id'], updateProperty: UpdatePropertyMeDto, userId: User['id']) {
    const property = await this.propertyService.findOne(id);
    console.log(property.userId, userId);
    if (property.userId !== userId) throw new UnauthorizedException('You are not authorized to update this property');
    
    const servicesIdsToBD = property.servicesId.map(service => service.id);
    const aggregates = this.propertyUtils.getAdds(updateProperty.servicesId as [], servicesIdsToBD);
    const deletes = this.propertyUtils.getDeletes( updateProperty.servicesId as [], servicesIdsToBD,);

    await this.serviceToProperty.delete(deletes)
    const propertyUpdated = await this.propertyService.update(id, {...updateProperty, servicesId: aggregates}, userId);
    this.cacheUtilsService.deleteKeys([CACHE_KEYS.PROPERTIES_ME, CACHE_KEYS.PROPERTY_ME]);
    return propertyUpdated
  }

  async changeStatus(id: Property['id']) {
    const property = await this.propertyService.findOne(id);
    await this.propertyService.changeStatus(id, property.availability);
    this.cacheUtilsService.deleteKeys([CACHE_KEYS.PROPERTIES_ME, CACHE_KEYS.PROPERTY_ME]);
    return {
      message: 'Property status changed successfully',
    }
  }
}
