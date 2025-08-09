import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyMeService } from './property-me.service';
import { CreatePropertyMeDto } from './dto/create-property-me.dto';
import { UpdatePropertyMeDto } from './dto/update-property-me.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { JwtUser } from 'src/auth/interfaces';
import { PropertyService } from './services';
import { User } from 'generated/prisma';

@Auth()
@Controller('property-me')
export class PropertyMeController {

  constructor(
    private readonly propertyMeService: PropertyMeService,
    private readonly propertyService: PropertyService
  ) {}


  @Post()
  create(
    @GetUser('id') userId: User['id'],
    @Body() createPropertyMeDto: CreatePropertyMeDto
  ) {

    return this.propertyMeService.create(createPropertyMeDto, userId);
  }

  @Get()
  findAll() {
    return this.propertyMeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyMeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyMeDto: UpdatePropertyMeDto) {
    return this.propertyMeService.update(+id, updatePropertyMeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyMeService.remove(+id);
  }
}
