import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

type RangeConfig = { min?: number; max?: number };

export function RangeByCategory(
  categoryField: string,
  config: Record<string, RangeConfig>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "RangeByCategory",
      target: object.constructor,
      propertyName,
      constraints: [categoryField, config],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value == null) return true;
          const [categoryField, config] = args.constraints;
          const category = (args.object as any)[categoryField];
          if (!category || !config[category]) return true;

          const { min, max } = config[category];
          if (min != null && value < min) return false;
          if (max != null && value > max) return false;
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [categoryField, config] = args.constraints;
          const category = (args.object as any)[categoryField];
          const { min, max } = config[category] || {};
          if (min != null && max != null) {
            return `${args.property} must be between ${min} and ${max} for category ${category}`;
          }
          if (min != null) {
            return `${args.property} must be greater than or equal to ${min} for category ${category}`;
          }
          if (max != null) {
            return `${args.property} must be less than or equal to ${max} for category ${category}`;
          }
          return `${args.property} does not comply with dynamic rules`;
        },
      },
    });
  };
}
