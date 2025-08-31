import { Auth, GetUser } from 'src/auth/decorators';
import { CACHE_KEYS } from 'src/cache/cache-keys';
import { Cached } from '@decorators/cache/cached.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreatePropertyMeDto, PaginationPropertyMeDto, UpdatePropertyMeDto } from './dto';
import { GetProperty, PropertyOwner } from './decorators';
import { Property, User } from 'generated/prisma';
import { PropertyFormatted } from './interfaces';
import { PropertyMeService } from './property-me.service';
import { CreateImageMainPropertyMeDto } from './dto/request/create-image-main-property-me.dto';
import { CreateImagesGalleryPropertyMeDto } from './dto/request/create-images-gallery-property-me.dto';

@Auth()
@Controller('property-me')
export class PropertyMeController {

  constructor(
    private readonly propertyMeService: PropertyMeService,
  ) { }

  @Post()
  async create(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Body() createPropertyMeDto: CreatePropertyMeDto
  ) {
    return await this.propertyMeService.create(createPropertyMeDto, userId);
  }

  @Post('/image-main')
  async createImageMain(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Body() createImageMainPropertyMeDto: CreateImageMainPropertyMeDto
  ) {
    return await this.propertyMeService.createImageMain(createImageMainPropertyMeDto, userId);
  }

  @Post('/images-gallery')
  async createImagesGallery(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Body() createImagesGalleryPropertyMeDto: CreateImagesGalleryPropertyMeDto
  ) {
    return await this.propertyMeService.createImagesGallery(createImagesGalleryPropertyMeDto, userId);
  }

  @Get()
  @Cached(CACHE_KEYS.PROPERTIES_ME)
  async findAll(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Query() queryParams: PaginationPropertyMeDto
  ) {
    return await this.propertyMeService.findAll(queryParams, userId);
  }

  @Get('/:id/detail')
  @Cached(CACHE_KEYS.PROPERTY_DETAIL)
  async findOneWithRelations(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Param('id', ParseUUIDPipe) id: Property['id']
  ) {
    return await this.propertyMeService.findOneWithRelations(id, userId);
  }

  @Get(':id')
  @Cached(CACHE_KEYS.PROPERTY_ME)
  @PropertyOwner()
  findOne(
    @GetProperty() property: PropertyFormatted
  ) {
    return property
  }

  @Patch(':id')
  @PropertyOwner()
  update(
    @GetProperty() property: PropertyFormatted,
    @Body() updatePropertyMeDto: UpdatePropertyMeDto
  ) {
    return this.propertyMeService.update(property, updatePropertyMeDto);
  }

  @Delete(':id')
  @PropertyOwner()
  remove(
    @GetProperty() property: PropertyFormatted
  ) {
    return this.propertyMeService.changeStatus(property);
  }
}
