import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UploadType } from '../config/upload.config';

export const GetUploadType = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UploadType => {
    const request = ctx.switchToHttp().getRequest();
    return request.params.type as UploadType;
  },
);