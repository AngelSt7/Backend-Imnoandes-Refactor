import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCarDto, UpdateCarDto, PaginationCarsDto } from './dto/request';
import { Car } from './entities/car.entity';
import { isValidObjectId, Model, Types } from 'mongoose';
import { FilterService } from './services/filter.service';
import { HandleErrorsService } from 'src/common/services/handle-errors.service';
import { CacheUtilsService } from 'src/common/services/cache-utils.service';
import { CACHE_KEYS } from '../cache/cache-keys';
import { ResponseCarDto } from './dto/responses/response-car.dto';
import { serializeResponse } from 'src/common/dto/serialize-response.dto';

@Injectable()
export class CarsService {
  private context = 'cars'

  constructor(
    @InjectModel(Car.name)
    private readonly carModel: Model<Car>,
    private readonly filterService: FilterService,
    private readonly cacheUtilsService: CacheUtilsService,
    private readonly handleErrorsService: HandleErrorsService
  ) { }

  async create(createCarDto: CreateCarDto, userId: Types.ObjectId) {
    try {
      const car = await this.carModel.create({ ...createCarDto, userId });
      await this.cacheUtilsService.deleteKeys(CACHE_KEYS.CARS);
      return {
        message: 'Car created successfully',
        data: serializeResponse(ResponseCarDto, car)
      };
    } catch (error) {
      this.handleErrorsService.handleError(error, this.context);
    }
  }

  async findAll(query: PaginationCarsDto) {
    const { limit = 10, offset = 0 } = query;
    const filter = await this.filterService.resolveFilter(query);
    const cars = await this.carModel.find(filter).skip(offset).limit(limit).select('-__v').exec();
    return cars;
  }

  async findOne(term: Types.ObjectId | string) {
    const termSearch = isValidObjectId(term)
    const car = await this.carModel.findOne(termSearch ? { _id: term } : { slug: term }).select('-__v').exec();
    if (!car) throw new NotFoundException('Car not found')
    return car
  }

  async update(id: Types.ObjectId, updateCarDto: UpdateCarDto) {
    await this.findOne(id);
    await this.cacheUtilsService.deleteKeys(`${CACHE_KEYS.CARS}`);
    const car = await this.carModel.findOneAndUpdate({ _id: id }, updateCarDto, { new: true });
    return {
      message: 'Car updated successfully',
      data: serializeResponse(ResponseCarDto, car)
    }
  }

  async changeStatus(id: Types.ObjectId) {
    const car = await this.findOne(id);
    car.active = !car.active;
    await car.save();
    await this.cacheUtilsService.deleteKeys(`${CACHE_KEYS.CARS}`);
    await this.cacheUtilsService.deleteKeys(`${CACHE_KEYS.CAR}`);
    return {
      message: 'Car status updated successfully',
      data: serializeResponse(ResponseCarDto, car)
    }
  }
}
