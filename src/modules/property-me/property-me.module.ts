import { Module } from '@nestjs/common';
import { CommonModule } from '@/common';
import { LocationModule } from '@/modules/location/location.module'
import { AuthModule, ImagesModule } from '@/modules';
import { PropertyMeController } from './property-me.controller';
import { PropertyMeService } from './property-me.service';
import { PropertyRepository, ServiceToPropertyRepository, ImagesPropertyRepository, PropertySelectsService } from './repository';
import { PropertyService, PropertyFactoryService, PropertyFormatterService, FilterService, ServiceToPropertyService, TransactionService, ImagesPropertyService, NormalizerService } from './services';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ImagesModule,
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
    PropertyService
  ]
})
export class PropertyMeModule {}
