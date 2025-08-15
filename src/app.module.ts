import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ImagesModule } from './images/images.module';
import { PropertyMeModule } from './property-me/property-me.module';
import { PropertyPublicModule } from './property-public/property-public.module';
import { SeedModule } from './seed/seed.module';
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    CommonModule,
    ImagesModule,
    PropertyMeModule,
    PropertyPublicModule,
    SeedModule,
    ProvinceModule,
    DistrictModule,
  ]
})
export class AppModule {}
