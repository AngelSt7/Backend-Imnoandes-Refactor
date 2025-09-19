import { Module } from '@nestjs/common';
import { PropertyPublicService } from './property-public.service';
import { PropertyPublicController } from './property-public.controller';
import { CommonModule } from 'src/common/common.module';
import { PropertyService } from './services/domain/property.service';
import { PropertyRepository } from './repository/property.repository';
import { CarrouselFilterService } from './services/filters/carrousel-filter.service';
import { PropertyFormatterService } from './services/formatter';
import { SearchFilterService } from './services/filters/search-filter.service';
import { PropertySelectsService } from './repository';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [
    CommonModule,
    LocationModule
  ],
  controllers: [
    PropertyPublicController
  ],
  providers: [
    PropertyPublicService,
    PropertyService,
    PropertyRepository,
    CarrouselFilterService,
    PropertySelectsService,
    PropertyFormatterService,
    SearchFilterService
  ],
})
export class PropertyPublicModule { }
