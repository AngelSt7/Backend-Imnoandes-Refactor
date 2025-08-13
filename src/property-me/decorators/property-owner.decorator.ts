import { applyDecorators, UseGuards } from '@nestjs/common';
import { IsOwnerGuard } from '../guards/is-owner.guard';

export function PropertyOwner() {
  return applyDecorators(
    UseGuards(IsOwnerGuard),
  );
}
