import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Property, User } from 'generated/prisma';
import { PropertyFormatted } from 'src/property-me/interfaces';
import { PropertyService } from 'src/property-me/services';

@Injectable()
export class IsOwnerGuard implements CanActivate {

  constructor(
    private readonly propertyService: PropertyService
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const user : User = request.user;
    const propertyId : Property['id'] = request.params.id;

    if(!isUUID(propertyId)) throw new BadRequestException('Validation failed (uuid is expected)');

    const property : PropertyFormatted = await this.propertyService.findOne(propertyId, user.id);
    request.property = property;

    return true;
  }
}
