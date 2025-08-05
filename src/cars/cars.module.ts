import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './entities/car.entity';
import { CommonModule } from 'src/common/common.module';
import { FilterService } from './services/filter.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    CommonModule,
    AuthModule
  ],
  controllers: [CarsController],
  providers: [CarsService, FilterService],
})
export class CarsModule {}
