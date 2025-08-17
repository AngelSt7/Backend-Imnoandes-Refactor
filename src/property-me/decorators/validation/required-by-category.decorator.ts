import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function RequiredByCategory(
  categoryField: string,
  requiredCategories: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "RequiredByCategory",
      target: object.constructor,
      propertyName,
      constraints: [categoryField, requiredCategories],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [categoryField, requiredCategories] = args.constraints;
          const category = (args.object as any)[categoryField];
          if (!category) return true;
          if (requiredCategories.includes(category)) {
            return value !== null && value !== undefined;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [categoryField, requiredCategories] = args.constraints;
          const category = (args.object as any)[categoryField];
          return `${args.property} is required for category ${category}`;
        },
      },
    });
  };
}
