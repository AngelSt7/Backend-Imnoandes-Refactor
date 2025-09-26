import { Controller, Get, Logger, Param, Query, Req, Res } from '@nestjs/common';
import { PropertyPublicService } from './property-public.service';
import { QueryPropertyPublicDto } from './dto';
import { PaginationPropertyPublicDto } from './dto/pagination/pagination-property-public.dto';
import { LocationService } from '@/modules/location/location.service';

@Controller('property-public')
export class PropertyPublicController {

  private logger = new Logger(PropertyPublicController.name)
  constructor(
    private readonly propertyPublicService: PropertyPublicService,
    private readonly locationService: LocationService
  ) { }


  @Get('carrousel')
  async findCarrusel(
    @Query() query: QueryPropertyPublicDto
  ) {
    return await this.propertyPublicService.findCarrousel(query);
  }

  @Get('/search')
  async search(
    @Query() query: PaginationPropertyPublicDto,
  ) {
    return this.propertyPublicService.search(query);
  }


  @Get(':shortId')
  async findOne(@Param('shortId') shortId: string) {
    return await this.propertyPublicService.findOne(shortId);
  }

}