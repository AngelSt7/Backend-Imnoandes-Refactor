import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth';
import { PropertyService, PropertyRepository, PropertyMeController, PropertyMeService, ServiceToPropertyService, PropertyFactoryService, FilterService, PropertyFormatterService, TransactionService, ServiceToPropertyRepository, ImagesPropertyRepository  } from '.';
import { ImagesPropertyService } from './services/domain/images-property.service';
import { NormalizerService } from './services/normalizer/normalizer.service';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ImagesModule
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
    NormalizerService
  ],
  exports: [
    PropertyService
  ]
})
export class PropertyMeModule {}
