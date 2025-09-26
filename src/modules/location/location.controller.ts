import { Controller, Get, Logger, Param, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { QuerySearchLocationDto } from './dto/query-search-location.dto';
import { Department, Province } from 'generated/prisma';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { QuerySlugLocationDto } from './dto/query-slug-location.dto';
import { Response } from 'express';
import { Cached } from '@/common/decorators';

@Controller('location')
export class LocationController {
  private logger = new Logger(LocationController.name)
  constructor(private readonly locationService: LocationService) { }

  @Get('/search')
  @Cached(CACHE_KEYS.LOCATION)
  async findAll(
    @Query() query: QuerySearchLocationDto,
  ) {
    return await this.locationService.search(query);
  }

  @Get('/provinces/:departmentId')
  @Cached(CACHE_KEYS.LOCATION)
  async findProvinces(
    @Param('departmentId', ParseUUIDPipe) departmentId: Department['id']
  ) {
    return await this.locationService.findProvinces(departmentId);
  }

  @Get('/districts/:provinceId')
  @Cached(CACHE_KEYS.LOCATION)
  async findDistricts(
    @Param('provinceId', ParseUUIDPipe) provinceId: Province['id']
  ) {
    return this.locationService.findDistricts(provinceId);
  }

  @Get('')
  // @Cached(CACHE_KEYS.LOCATION)
  async findOne(
    @Query() slug: QuerySlugLocationDto,
    @Res({ passthrough: true }) response: Response
  ) {
    // try {
      return await this.locationService.findLocations(slug);
    // } catch (error) {
    //   return response.redirect(
    //     `http://localhost:3000/es/search/venta-de-departamentos-en-lima`
    //   )
    // }
  }
}
