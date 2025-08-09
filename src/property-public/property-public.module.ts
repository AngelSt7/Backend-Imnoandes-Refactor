import { Module } from '@nestjs/common';
import { PropertyPublicService } from './property-public.service';
import { PropertyPublicController } from './property-public.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CommonModule
  ],
  controllers: [
    PropertyPublicController
  ],
  providers: [
    PropertyPublicService
  ],
})
export class PropertyPublicModule { }
