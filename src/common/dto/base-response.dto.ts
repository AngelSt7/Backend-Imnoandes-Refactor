import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export function ResponseDto<T>(type: Type<T>, messageExample = 'Success') {
  class ResponseDtoClass {
    @ApiProperty({ example: messageExample })
    message: string;

    @ApiProperty({ type })
    data: T;
  }

  Object.defineProperty(ResponseDtoClass, 'name', {
    value: `ResponseDto_${type.name}_${messageExample.replace(/\s+/g, '')}`,
  });

  ApiExtraModels(ResponseDtoClass);

  return ResponseDtoClass;
}
