import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PropertyMeService } from './property-me.service';
import { CreatePropertyMeDto } from './dto/request/create-property-me.dto';
import { UpdatePropertyMeDto } from './dto/request/update-property-me.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { PropertyService } from './services';
import { Property, User } from 'generated/prisma';
import { Cached } from '@decorators/cache/cached.decorator';
import { CACHE_KEYS } from 'src/cache/cache-keys';
import { PaginationPropertyMeDto } from './dto';

@Auth()
@Controller('property-me')
export class PropertyMeController {

  constructor(
    private readonly propertyMeService: PropertyMeService,
    private readonly propertyService: PropertyService
  ) { }


  @Post()
  async create(
    @GetUser('id') userId: User['id'],
    @Body() createPropertyMeDto: CreatePropertyMeDto
  ) {
    return await this.propertyMeService.create(createPropertyMeDto, userId);
  }

  @Get()
  @Cached(CACHE_KEYS.PROPERTIES_ME)
  async findAll(
    @GetUser('id') userId: User['id'],
    @Query() queryParams: PaginationPropertyMeDto
  ) {
    return await this.propertyMeService.findAll(userId, queryParams);
  }

  @Get(':id')
  @Cached(CACHE_KEYS.PROPERTY_ME)
  findOne(
    @Param('id') id: Property['id']
  ) {
    return this.propertyMeService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(
    @GetUser('id') userId: User['id'],
    @Param('id') id: Property['id'],
    @Body() updatePropertyMeDto: UpdatePropertyMeDto
  ) {
    return this.propertyMeService.update(id, updatePropertyMeDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: Property['id']) {
    return this.propertyMeService.changeStatus(id);
  }
}
