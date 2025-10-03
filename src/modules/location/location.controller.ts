import { Controller, Get, Logger, Param, ParseUUIDPipe, Query, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { QuerySearchLocationDto } from './dto/query-search-location.dto';
import { Department, Province } from 'generated/prisma';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { QuerySlugLocationDto } from './dto/query-slug-location.dto';
import { Cached } from '@/common/decorators';
import { TTL } from '@/cache/ttls';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Get('/search')
  @Cached(CACHE_KEYS.LOCATION, TTL.ONE_WEEK)
  async findAll(
    @Query() query: QuerySearchLocationDto,
  ) {
    return await this.locationService.search(query);
  }

  @Get('/provinces/:departmentId')
  @Cached(CACHE_KEYS.LOCATION, TTL.ONE_WEEK)
  async findProvinces(
    @Param('departmentId', ParseUUIDPipe) departmentId: Department['id']
  ) {
    return await this.locationService.findProvinces(departmentId);
  }

  @Get('/districts/:provinceId')
  @Cached(CACHE_KEYS.LOCATION, TTL.ONE_WEEK)
  async findDistricts(
    @Param('provinceId', ParseUUIDPipe) provinceId: Province['id']
  ) {
    return this.locationService.findDistricts(provinceId);
  }

  @Get()
  @Cached(CACHE_KEYS.LOCATION, TTL.ONE_WEEK)
  async findOne(
    @Query() slug: QuerySlugLocationDto,
  ) {
    return await this.locationService.findLocations(slug);
  }
}
