import { Injectable } from '@nestjs/common';
import { QueryPropertyPublicDto } from './dto';
import { PropertyService } from './services/domain/property.service';
import { PaginationPropertyPublicDto } from './dto/pagination/pagination-property-public.dto';

@Injectable()
export class PropertyPublicService {

  constructor(
    private readonly propertyService: PropertyService
  ) {}

  async findCarrousel(query: QueryPropertyPublicDto) {
    return await this.propertyService.findCarrousel(query);
  }

  async search(query: PaginationPropertyPublicDto) {
    return await this.propertyService.search(query);
  }

  async findOne(id: string) {
    return await this.propertyService.findOne(id);
  }

}
