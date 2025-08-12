import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth';
import { PropertyService, PropertyRepository, PropertyMeController, PropertyMeService, ServiceToPropertyService, PropertyFactoryService, FilterService, ServiceToPropertyUtilsService, PropertyFormatterService, TransactionService, ServiceToPropertyRepository  } from '.';

@Module({
  imports: [
    CommonModule,
    AuthModule
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
    ServiceToPropertyUtilsService,
    ServiceToPropertyService,
    TransactionService,
    ServiceToPropertyRepository
  ],
  exports: [
    PropertyService
  ]
})
export class PropertyMeModule {}
