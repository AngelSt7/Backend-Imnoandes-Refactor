import { ClassConstructor, plainToInstance } from "class-transformer";

export function serializeResponse<T>(dto: ClassConstructor<T>, entity: any): T {
  return plainToInstance(dto, entity, { excludeExtraneousValues: true });
}
