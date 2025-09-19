import { CACHE_KEYS } from 'src/cache/cache-keys';
import { CacheUtilsService } from 'src/common/services';
import { CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from './dto';
import { Injectable, Logger } from '@nestjs/common';
import { IMAGE_TYPE, Location, Property, User } from 'generated/prisma';
import { PropertyFormatted } from './interfaces';
import { PropertyService, TransactionService, ImagesPropertyService } from './services';
import { CreateImagePropertyMeDto } from './dto/request/create-image-property-me.dto';
import { CreateImagesPropertyMeDto } from './dto/request/create-images-property-me.dto';
import { NormalizerService } from './services/normalizer';
import { CollectionDiffService } from 'src/common/services/formaters/collection-diff.service';
import { ImagesService } from 'src/images/images.service';
import { LocationService } from 'src/location/location.service';
;

@Injectable()
export class PropertyMeService {

  private readonly logger = new Logger(PropertyMeService.name)

  constructor(
    private readonly propertyService: PropertyService,
    private readonly imagesPropertyService: ImagesPropertyService,
    private readonly cacheUtilsService: CacheUtilsService,
    private readonly collectionDiffService: CollectionDiffService,
    private readonly transactionService: TransactionService,
    private readonly normalizerService: NormalizerService,
    private readonly locationService: LocationService,
    private readonly imagesService: ImagesService
  ) { }

  async location(departmentId: Location['departmentId'], provinceId: Location['provinceId'], districtId: Location['districtId']){
    return await this.locationService.findLocation(departmentId, provinceId, districtId);
  }

  async create(dto: CreatePropertyMeDto, userId: User['id']) {
    const location = await this.location(dto.departmentId, dto.provinceId, dto.districtId);
    await this.propertyService.create({...dto}, location.id, userId);
    this.cacheUtilsService.deleteKeys(CACHE_KEYS.PROPERTIES_ME);
    return {
      message: 'Property created successfully',
    }
  }

  async images(id: Property['id']) {
    return await this.imagesPropertyService.images(id);
  }

  async createImageMain(dto: CreateImagePropertyMeDto) {
    this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.PROPERTY_IMAGES}/${dto.propertyId}`]);
    const created = await this.imagesPropertyService.createMain(dto);
    return {
      image: created.url
    }
  }

  async createImagesGallery(dto: CreateImagesPropertyMeDto) {
    const currentImages = (await this.imagesPropertyService.images(dto.propertyId)).filter(image => image.type === IMAGE_TYPE.GALLERY).map(image => image.url);
  
    const { adds, deletes } = this.collectionDiffService.preparedData(dto.images.map(image => image.url), currentImages);

    const addsObjects = dto.images.filter(image => adds.includes(image.url));
    await Promise.all([
      this.imagesPropertyService.deleteImages(deletes),
      this.imagesService.remove(deletes)
    ])
    this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.PROPERTY_IMAGES}/${dto.propertyId}`]);
    const created = await this.imagesPropertyService.createGallery({ ...dto, images: addsObjects });
    return {
      images: created.map(image => image.url)
    }
  }


  async findAll(queryParams: PaginationPropertyMeDto, userId: User['id'],) {
    return await this.propertyService.findAll(userId, queryParams);
  }

  async findOneWithRelations(id: Property['id'], userId: User['id']) {
    return await this.propertyService.findOneWithRelations(id, userId);
  }

  async update(property: PropertyFormatted, updateProperty: UpdatePropertyMeDto) {
    const location = await this.location(updateProperty.departmentId, updateProperty.provinceId, updateProperty.districtId);
    const propertyNormalized = this.normalizerService.normalizeProperty(updateProperty);
    const { adds, deletes } = this.collectionDiffService.preparedData(propertyNormalized.servicesId, property.servicesId);
    await this.transactionService.update(deletes, location.id, { ...propertyNormalized, servicesId: adds }, String(property.id));
    this.cacheUtilsService.deleteKeys([CACHE_KEYS.PROPERTIES_ME, `${CACHE_KEYS.PROPERTY_ME}/${property.id}`, `${CACHE_KEYS.PROPERTY_DETAIL}/${property.id}`]);
    return {
      message: 'Property updated successfully',
    }
  }

  async changeStatus(property: PropertyFormatted) {
    await this.propertyService.changeStatus(String(property.id), property.availability);
    this.cacheUtilsService.deleteKeys([CACHE_KEYS.PROPERTIES_ME, `${CACHE_KEYS.PROPERTY_ME}/${property.id}`, `${CACHE_KEYS.PROPERTY_DETAIL}/${property.id}`]);
    return {
      message: 'Property status changed successfully',
    }
  }
}
