import { CACHE_KEYS } from '@/cache/cache-keys';
import { CacheUtilsService, CollectionDiffService, RedisService } from '@/common/services';
import { CreateImagePropertyMeDto, CreateImagesPropertyMeDto, CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from './dto';
import { Injectable } from '@nestjs/common';
import { IMAGE_TYPE, Location, Property, User } from 'generated/prisma';
import { PropertyFormatted } from './interfaces';
import { PropertyService, TransactionService, ImagesPropertyService } from './services';
import { NormalizerService } from './services/normalizer';
import { LocationService } from '@/modules/location/location.service';
import { ImagesService } from '@/modules/images/images.service';
import { TTL } from '@/cache/ttls';
;

@Injectable()
export class PropertyMeService {

  constructor(
    private readonly propertyService: PropertyService,
    private readonly imagesPropertyService: ImagesPropertyService,
    private readonly cacheUtilsService: CacheUtilsService,
    private readonly collectionDiffService: CollectionDiffService,
    private readonly transactionService: TransactionService,
    private readonly normalizerService: NormalizerService,
    private readonly locationService: LocationService,
    private readonly imagesService: ImagesService,
    private readonly redisService: RedisService
  ) { }

  async location(departmentId: Location['departmentId'], provinceId: Location['provinceId'], districtId: Location['districtId']) {
    return await this.locationService.findLocation(departmentId, provinceId, districtId);
  }

  async create(dto: CreatePropertyMeDto, userId: User['id']) {
    const location = await this.location(dto.departmentId, dto.provinceId, dto.districtId);
    await Promise.all([
      this.propertyService.create({ ...dto }, location.id, userId),
      this.cacheUtilsService.deleteKeys([
        `${CACHE_KEYS.PROPERTIES_ME}/${userId}`,
        CACHE_KEYS.PROPERTY_PUBLIC
      ]),
    ])
    return {
      message: 'Propiedad creada correctamente',
    }
  }

  async images(id: Property['id']) {
    return await this.imagesPropertyService.images(id);
  }

  async createImageMain(dto: CreateImagePropertyMeDto) {
    const created = await this.imagesPropertyService.createMain(dto);
    await this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.PROPERTY_IMAGES}/${dto.propertyId}`, CACHE_KEYS.PROPERTY_PUBLIC]);
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
    this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.PROPERTY_IMAGES}/${dto.propertyId}`, CACHE_KEYS.PROPERTY_PUBLIC]);
    const created = await this.imagesPropertyService.createGallery({ ...dto, images: addsObjects });
    return {
      images: created.map(image => image.url)
    }
  }

  async findAll(queryParams: PaginationPropertyMeDto, userId: User['id'],) {
    const key = this.cacheUtilsService.generateCacheKey(CACHE_KEYS.PROPERTIES_ME, queryParams, userId);
    const cached = await this.redisService.get(key);
    if(cached){
      return JSON.parse(cached);
    } else {
      const data = await this.propertyService.findAll(userId, queryParams);
      await this.redisService.set(key, JSON.stringify(data), 'EX', TTL.ONE_HOUR);
      return data
    }
  }

  async findOneWithRelations(id: Property['id'], userId: User['id']) {
    return await this.propertyService.findOneWithRelations(id, userId);
  }

  async update(property: PropertyFormatted, updateProperty: UpdatePropertyMeDto, userId: User['id']) {
    const location = await this.location(updateProperty.departmentId, updateProperty.provinceId, updateProperty.districtId);
    const propertyNormalized = this.normalizerService.normalizeProperty(updateProperty);
    const { adds, deletes } = this.collectionDiffService.preparedData(propertyNormalized.servicesId, property.servicesId);
    await Promise.all([
      this.transactionService.update(deletes, location.id, { ...propertyNormalized, servicesId: adds }, String(property.id)),
      this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.PROPERTIES_ME}/${userId}`, `${CACHE_KEYS.PROPERTY_ME}/${property.id}`, `${CACHE_KEYS.PROPERTY_DETAIL}/${property.id}`, CACHE_KEYS.PROPERTY_PUBLIC]),
    ])
    return {
      message: 'Propiedad actualizada correctamente',
    }
  }

  async changeStatus(property: PropertyFormatted, userId: User['id']) {
    await Promise.all([
      this.propertyService.changeStatus(String(property.id), property.availability),
      this.cacheUtilsService.deleteKeys([`${CACHE_KEYS.PROPERTIES_ME}/${userId}}`, `${CACHE_KEYS.PROPERTY_ME}/${property.id}`, `${CACHE_KEYS.PROPERTY_DETAIL}/${property.id}`, CACHE_KEYS.PROPERTY_PUBLIC]),
    ])
    return {
      message: 'Estado de la propiedad actualizada correctamente',
    }
  }
}
