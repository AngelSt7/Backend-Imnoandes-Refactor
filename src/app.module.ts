import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ImagesModule } from './images/images.module';
import { SeedModule } from './seed/seed.module';
import { CarsModule } from './cars/cars.module';
import { envs } from './config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(envs.mongoUrl),
    AuthModule,
    CommonModule,
    ImagesModule,
    SeedModule,
    CarsModule,
  ]
})
export class AppModule {}
