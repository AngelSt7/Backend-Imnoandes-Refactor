import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PropertyMeService } from './property-me.service';
import { CreatePropertyMeDto } from './dto/request/create-property-me.dto';
import { UpdatePropertyMeDto } from './dto/request/update-property-me.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Property, User } from 'generated/prisma';
import { Cached } from '@decorators/cache/cached.decorator';
import { CACHE_KEYS } from 'src/cache/cache-keys';
import { PaginationPropertyMeDto } from './dto';

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
  findOne(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Param('id', ParseUUIDPipe) id: Property['id']
  ) {
    return this.propertyMeService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Param('id', ParseUUIDPipe) id: Property['id'],
    @Body() updatePropertyMeDto: UpdatePropertyMeDto
  ) {
    return this.propertyMeService.update(id, updatePropertyMeDto, userId);
  }

  @Delete(':id')
  remove(
    @GetUser('id', ParseUUIDPipe) userId: User['id'],
    @Param('id', ParseUUIDPipe) id: Property['id']
  ) {
    return this.propertyMeService.changeStatus(id, userId);
  }
}
