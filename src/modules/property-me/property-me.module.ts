import { Module } from '@nestjs/common';
import { CommonModule } from '@/common';
import { LocationModule } from '@/modules/location/location.module'
import { PropertyMeController } from './property-me.controller';
import { PropertyMeService } from './property-me.service';
import { PropertyRepository, ServiceToPropertyRepository, ImagesPropertyRepository, PropertySelectsService } from './repository';
import { PropertyService, PropertyFactoryService, PropertyFormatterService, FilterService, ServiceToPropertyService, TransactionService, ImagesPropertyService, NormalizerService } from './services';
import { ImagesModule } from '../images';
import { AuthModule } from '../auth';

@Module({
  imports: [
    CommonModule,
    ImagesModule,
    AuthModule,
    LocationModule
  ],
  controllers: [
    PropertyMeController
  ],
  providers: [
    PropertyMeService,
    PropertyService,
    PropertyRepository,
    PropertyFactoryService,
    PropertyFormatterService,
    FilterService,
    ServiceToPropertyService,
    TransactionService,
    ServiceToPropertyRepository,
    ImagesPropertyRepository,
    ImagesPropertyService,
    NormalizerService,
    PropertySelectsService
  ],
  exports: [
    PropertySelectsService,
    PropertyService
  ]
})
export class PropertyMeModule {}
