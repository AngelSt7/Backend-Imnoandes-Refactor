import { VALID_PROVIDERS } from '@/constants';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function Provider(provider: VALID_PROVIDERS) {
  return applyDecorators(
    UseGuards(AuthGuard(provider))
  );
}
