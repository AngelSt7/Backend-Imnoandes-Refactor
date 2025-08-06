import { SetMetadata } from '@nestjs/common';
import { AUTH_PROVIDERS } from 'generated/prisma';

export const META_PROVIDERS= 'providers'

export const AuthProvider = (...args: AUTH_PROVIDERS[]) => {
    return SetMetadata(META_PROVIDERS, args);
}