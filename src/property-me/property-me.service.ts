import { Injectable } from '@nestjs/common';
import { CreatePropertyMeDto } from './dto/create-property-me.dto';
import { UpdatePropertyMeDto } from './dto/update-property-me.dto';
import { User } from 'generated/prisma';
import { PropertyService } from './services';

@Injectable()
export class PropertyMeService {

  constructor(
    private readonly propertyService: PropertyService
  ) { }



  create(createProperty: CreatePropertyMeDto, userId: User['id']) {
    const slug = this.propertyService.slug(createProperty.name);
    return this.propertyService.create(createProperty, slug, userId);
  }













  findAll() {
    return `This action returns all propertyMe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyMe`;
  }

  update(id: number, updatePropertyMeDto: UpdatePropertyMeDto) {
    return `This action updates a #${id} propertyMe`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyMe`;
  }
}
