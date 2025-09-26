import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_PROVIDERS, User } from 'generated/prisma';
import { Observable } from 'rxjs';
import { META_PROVIDERS } from '../decorators/security/role-protected.decorator';

@Injectable()
export class AuthProviderGuard implements CanActivate {
  private logger = new Logger(AuthProviderGuard.name)
  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validProvider: string[] = this.reflector.getAllAndOverride(META_PROVIDERS, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!validProvider) {
      return true;
    }
    if (validProvider.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user: User = req.user

    if (!user) throw new InternalServerErrorException('User not found (request)')

    for (const provider of [user.authProvider]) {
      if (validProvider.includes(provider as AUTH_PROVIDERS)) {
        return true;
      }
    }

    throw new ForbiddenException(`This function requires one of the following providers: ${validProvider}`);
  }
}
