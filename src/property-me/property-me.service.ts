import { CACHE_KEYS } from 'src/cache/cache-keys';
import { CacheUtilsService } from 'src/common/services';
import { CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from './dto';
import { Injectable, Logger } from '@nestjs/common';
import { Property, User } from 'generated/prisma';
import { PropertyFormatted } from './interfaces';;
import { PropertyService, TransactionService, ServiceToPropertyUtilsService } from './services';
import { CreateImageMainPropertyMeDto } from './dto/request/create-image-main-property-me.dto';
import { CreateImagesGalleryPropertyMeDto } from './dto/request/create-images-gallery-property-me.dto';
import { ImageMainService } from './services/domain/image-main.service';
import { ImagesGalleryService } from './services/domain/images-gallery.service';

@Injectable()
export class PropertyMeService {

  private readonly logger = new Logger(PropertyMeService.name)

  constructor(
    private readonly propertyService: PropertyService,
    private readonly imageMainService: ImageMainService,
    private readonly imagesGalleryService: ImagesGalleryService,
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

  async createImageMain(createImageMainPropertyMeDto: CreateImageMainPropertyMeDto, userId: User['id']) {
    this.propertyService.findOne(createImageMainPropertyMeDto.id, userId);
    return await this.imageMainService.createImageMain(createImageMainPropertyMeDto);
  }

   async createImagesGallery(createImagesGalleryPropertyMeDto: CreateImagesGalleryPropertyMeDto, userId: User['id']) {
    this.propertyService.findOne(createImagesGalleryPropertyMeDto.id, userId);
    return await this.imagesGalleryService.createImagesGallery(createImagesGalleryPropertyMeDto);
  }


  async findAll(queryParams: PaginationPropertyMeDto, userId: User['id'],) {
    return await this.propertyService.findAll(userId, queryParams);
  }

  async findOneWithRelations(id: Property['id'], userId: User['id']) {
    return await this.propertyService.findOneWithRelations(id, userId);
  }

  async update(property: PropertyFormatted, updateProperty: UpdatePropertyMeDto) {
    const { adds, deletes } = this.serviceToPropertyUtils.preparedData(updateProperty.servicesId, property.servicesId);
    await this.transactionService.update(deletes, { ...updateProperty, servicesId: adds }, property.id);
    this.cacheUtilsService.deleteKeys([CACHE_KEYS.PROPERTIES_ME, `${CACHE_KEYS.PROPERTY_ME}/${property.id}`]);
    this.logger.debug('Transaction completed successfully');
    return {
      message: 'Property updated successfully',
    }
  }

  async changeStatus(property: PropertyFormatted) {
    await this.propertyService.changeStatus(property.id, property.availability);
    this.cacheUtilsService.deleteKeys([CACHE_KEYS.PROPERTIES_ME, `${CACHE_KEYS.PROPERTY_ME}/${property.id}`]);
    return {
      message: 'Property status changed successfully',
    }
  }
}
