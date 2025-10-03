import { Auth, GetUser } from '@/modules/auth/decorators';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { Controller, Get, Post, Body, Patch, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateImagePropertyMeDto, CreateImagesPropertyMeDto, CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from './dto';
import { GetProperty, PropertyOwner } from './decorators';
import { Property, User } from 'generated/prisma';
import { PropertyFormatted } from './interfaces';
import { PropertyMeService } from './property-me.service';
import { Cached } from '@/common/decorators';
import { TTL } from '@/cache/ttls';


@Auth()
@Controller('property-me')
export class PropertyMeController {

  constructor(
    private readonly propertyMeService: PropertyMeService,
  ) { }

  @Post()
  async create(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Body() dto: CreatePropertyMeDto
  ) {
    return await this.propertyMeService.create(dto, userId);
  }

  @Post('/image-main/:id')
  @PropertyOwner()
  async createImageMain(
    @Body() dto: CreateImagePropertyMeDto,
  ) {
    return await this.propertyMeService.createImageMain(dto);
  }

  @Post('/images-gallery/:id')
  @PropertyOwner()
  async createImagesGallery(
    @Body() dto: CreateImagesPropertyMeDto,
  ) {
    return await this.propertyMeService.createImagesGallery(dto);
  }

  @Get('/images/:id')
  @Cached(CACHE_KEYS.PROPERTY_IMAGES, TTL.ONE_HOUR)
  @PropertyOwner()
  changeStatus(
    @GetProperty('id') id: Property['id']
  ) {
    return this.propertyMeService.images(id);
  }

  @Get()
  async findAll(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Query() queryParams: PaginationPropertyMeDto
  ) {
    return await this.propertyMeService.findAll(queryParams, userId);
  }

  @Get('/:id/details')
  @Cached(CACHE_KEYS.PROPERTY_DETAIL, TTL.ONE_HOUR)
  async findOneWithRelations(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Param('id', ParseUUIDPipe) id: Property['id']
  ) {
    return await this.propertyMeService.findOneWithRelations(id, userId);
  }

  @Get(':id')
  @Cached(CACHE_KEYS.PROPERTY_ME, TTL.ONE_HOUR)
  @PropertyOwner()
  async findOne(
    @GetProperty() property: PropertyFormatted
  ) {
    return await property
  }

  @Patch(':id')
  @PropertyOwner()
  update(
    @GetProperty() property: PropertyFormatted,
    @Body() dto: UpdatePropertyMeDto,
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
  ) {
    return this.propertyMeService.update(property, dto, userId);
  }

  @Patch('status/:id')
  @PropertyOwner()
  remove(
    @GetProperty() property: PropertyFormatted,
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
  ) {
    return this.propertyMeService.changeStatus(property, userId);
  }
}
