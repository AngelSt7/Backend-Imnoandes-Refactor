import { Injectable } from '@nestjs/common';
import { CreatePropertyPublicDto } from './dto/create-property-public.dto';
import { UpdatePropertyPublicDto } from './dto/update-property-public.dto';

@Injectable()
export class PropertyPublicService {
  create(createPropertyPublicDto: CreatePropertyPublicDto) {
    return 'This action adds a new propertyPublic';
  }

  findAll() {
    return `This action returns all propertyPublic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyPublic`;
  }

  update(id: number, updatePropertyPublicDto: UpdatePropertyPublicDto) {
    return `This action updates a #${id} propertyPublic`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyPublic`;
  }
}
