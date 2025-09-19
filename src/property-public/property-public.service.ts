import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { QueryPropertyPublicDto } from './dto';
import { PropertyService } from './services/domain/property.service';
import { PaginationPropertyPublicDto } from './dto/pagination/pagination-property-public.dto';
import { Response } from 'express';
import { LocationService } from 'src/location/location.service';

export type IdsLocation = Awaited<ReturnType<LocationService['getIdsLocations']>>

@Injectable()
export class PropertyPublicService {

  private logger = new Logger(PropertyPublicService.name)

  constructor(
    private readonly propertyService: PropertyService,
    private readonly locationService: LocationService
  ) { }

  async findCarrousel(query: QueryPropertyPublicDto) {
    return await this.propertyService.findCarrousel(query);
  }

  async search(query: PaginationPropertyPublicDto) {
    let idLocations: IdsLocation | undefined;

    if (query.locationId && query.locationId.length > 0) {
      idLocations = await this.locationService.getIdsLocations({
        slugs: query.locationId,
      });
    }

    return await this.propertyService.search({ ...query }, idLocations);
  }


  async findOne(id: string) {
    return await this.propertyService.findOne(id);
  }

}
