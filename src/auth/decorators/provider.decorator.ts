import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VALID_PROVIDERS } from '../interfaces';

export function Provider(provider: VALID_PROVIDERS) {
  return applyDecorators(
    UseGuards(AuthGuard(provider))
  );
}
