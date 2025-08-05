import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { Types } from 'mongoose';
import { Cached } from 'src/common/decorators/cache/cached.decorator';
import { Auth, GetUser } from 'src/auth/decorators';
import { CACHE_KEYS } from 'src/cache/cache-keys';
import { ResponseDto } from 'src/common/dto/base-response.dto';
import { ResponseCarDto } from './dto/responses/response-car.dto';
import { ApplyParams, TypesParams } from '@decorators/doc/properties/apply-params.decorator';
import { CreateCarDto, UpdateCarDto, PaginationCarsDto } from './dto/request';
import { CAR_CREATE_RESPONSE, CAR_DELETE_RESPONSES, CAR_READ_RESPONSE, CAR_UPDATE_RESPONSE } from './utils/car-doc.responses';
import { Documentation } from '@decorators/doc/base/documentation.decorator';

@Controller('cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService
  ) { }

  @Post()
  @Auth()
  @Documentation({ authenticated: true, summary: 'Register car',
    type: ResponseDto(ResponseCarDto, 'Car created'), responses: CAR_CREATE_RESPONSE
  })
  create(
    @GetUser('_id') userId: Types.ObjectId,
    @Body() createCarDto: CreateCarDto
  ) {
    return this.carsService.create(createCarDto, userId);
  }

  @Get()
  @Cached(CACHE_KEYS.CARS, 120)
  @Documentation({ summary: 'Get all cars', type: ResponseCarDto, responses: CAR_READ_RESPONSE, isArray: true })
  findAll(@Query() query: PaginationCarsDto) {
    return this.carsService.findAll(query);
  }

  @Get(':term')
  @Cached(CACHE_KEYS.CAR, 120)
  @ApiParam({ name: 'term', required: true, type: String, description: 'Car ID or slug', example: '686b3e3974b3f83e4d336ad8' })
  @Documentation({ summary: 'Get one car', type: ResponseCarDto, responses: CAR_READ_RESPONSE })
  findOne(@Param('term') term: Types.ObjectId | string) {
    return this.carsService.findOne(term);
  }

  @Patch(':id')
  @Auth()
  @ApplyParams('id', true, TypesParams.string, 'Car ID', '686b3e3974b3f83e4d336ad8')
  @Documentation({ summary: 'Update a car', type: ResponseDto(ResponseCarDto, 'Car updated'), responses: CAR_UPDATE_RESPONSE, authenticated: true })
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @Auth()
  @ApplyParams('id', true, TypesParams.string, 'Car ID', '686b3e3974b3f83e4d336ad8')
  @Documentation({ summary: 'Delete a car', type: ResponseDto(ResponseCarDto, 'Car updated'), responses: CAR_DELETE_RESPONSES, authenticated: true })
  changeStatus(@Param('id') id: Types.ObjectId) {
    return this.carsService.changeStatus(id);
  }
}
