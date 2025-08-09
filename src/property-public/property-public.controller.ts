import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyPublicService } from './property-public.service';
import { CreatePropertyPublicDto } from './dto/create-property-public.dto';
import { UpdatePropertyPublicDto } from './dto/update-property-public.dto';

@Controller('property-public')
export class PropertyPublicController {
  constructor(private readonly propertyPublicService: PropertyPublicService) {}

  @Post()
  create(@Body() createPropertyPublicDto: CreatePropertyPublicDto) {
    return this.propertyPublicService.create(createPropertyPublicDto);
  }

  @Get()
  findAll() {
    return this.propertyPublicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyPublicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyPublicDto: UpdatePropertyPublicDto) {
    return this.propertyPublicService.update(+id, updatePropertyPublicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyPublicService.remove(+id);
  }
}
