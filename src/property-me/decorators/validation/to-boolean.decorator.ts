import { Transform } from 'class-transformer';

export function ToBoolean() {
  return Transform(({ value, obj, key }) => {
    if (!(key in obj)) return undefined;

    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  });
}
