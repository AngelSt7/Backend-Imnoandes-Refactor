import { applyDecorators, Type } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ValidResponses } from 'src/auth/interfaces';
import { ResponseEntry } from 'src/common/interfaces';

interface DocumentationOptions {
  type?: Type<unknown>;
  summary?: string;
  responses: ResponseEntry[];
  authenticated?: boolean;
  isArray?: boolean;
}

export const Documentation = ({
  type,
  summary,
  responses,
  authenticated = false,
  isArray = false,
}: DocumentationOptions): MethodDecorator => {
  const decorators: (MethodDecorator | ClassDecorator)[] = [];

  responses.push({ response: ValidResponses.serverError, description: 'Server error' });

  if (summary) decorators.push(ApiOperation({ summary }));
  if (type) decorators.push(ApiExtraModels(type));
  if (authenticated) decorators.push(ApiBearerAuth('access-token'));

  responses.forEach(({ response, description }) => {
    const common: any = {
      status: response,
      description,
    };

    if (type && [ValidResponses.create, ValidResponses.read, ValidResponses.update].includes(response)) {
      common.schema = isArray
        ? {
            type: 'array',
            items: { $ref: getSchemaPath(type) },
          }
        : {
            $ref: getSchemaPath(type),
          };
    }

    decorators.push(ApiResponse(common));
  });

  return applyDecorators(...decorators);
};
