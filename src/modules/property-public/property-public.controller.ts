import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertyPublicService } from './property-public.service';
import { QueryPropertyPublicDto } from './dto';
import { PaginationPropertyPublicDto } from './dto/pagination/pagination-property-public.dto';
import { Cached } from '@/common/decorators';
import { CACHE_KEYS } from '@/cache/cache-keys';
import { TTL } from '@/cache/ttls';

@Controller('property-public')
export class PropertyPublicController {

  constructor(
    private readonly propertyPublicService: PropertyPublicService,
  ) { }

  @Get('carrousel')
  @Cached(CACHE_KEYS.PROPERTY_PUBLIC, TTL.FIVE_MINUTES)
  async findCarrusel(
    @Query() query: QueryPropertyPublicDto
  ) {
    return await this.propertyPublicService.findCarrousel(query);
  }

  @Get('/search')
  @Cached(CACHE_KEYS.PROPERTY_PUBLIC, TTL.FIVE_MINUTES)
  async search(
    @Query() query: PaginationPropertyPublicDto,
  ) {
    return this.propertyPublicService.search(query);
  }

  @Get(':shortId')
  @Cached(CACHE_KEYS.PROPERTY_PUBLIC, TTL.ONE_HOUR)
  async findOne(@Param('shortId') shortId: string) {
    return await this.propertyPublicService.findOne(shortId);
  }

}