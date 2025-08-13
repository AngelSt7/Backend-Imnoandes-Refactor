import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetProperty = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return !data ? request.property : request.property[data];
});