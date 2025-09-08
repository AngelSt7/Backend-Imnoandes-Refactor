import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PropertyPublicService } from './property-public.service';
import { CreatePropertyPublicDto } from './dto/create-property-public.dto';
import { UpdatePropertyPublicDto } from './dto/update-property-public.dto';
import { QueryPropertyPublicDto } from './dto';
import { ParseShortUuidPipe } from 'src/common/pipes/parse-short-uuid.pipe';
import { PaginationPropertyPublicDto } from './dto/query/pagination-property-public.dto';

@Controller('property-public')
export class PropertyPublicController {
  constructor(private readonly propertyPublicService: PropertyPublicService) {}

  
  @Get('carrousel')
  async findCarrusel(
    @Query() query: QueryPropertyPublicDto
  ) {
    return await this.propertyPublicService.findCarrousel(query);
  }
  
  @Get('/search')
  search(
    @Query() query: PaginationPropertyPublicDto
  ) {
    return this.propertyPublicService.search(query);
  }

  @Get(':slug')
  async findOne(@Param('slug', ParseShortUuidPipe) shortId: string) {
    return await this.propertyPublicService.findOne(shortId);
  }


}
