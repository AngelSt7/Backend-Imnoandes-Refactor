
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_PROVIDERS } from 'generated/prisma';
import { AuthProviderGuard } from '@/common/guards';
import { AuthProvider } from '@/common/decorators';

export function Auth(...args: AUTH_PROVIDERS[]) {
  return applyDecorators(
    AuthProvider(...args),
    UseGuards(AuthGuard(), AuthProviderGuard)
  );
}
