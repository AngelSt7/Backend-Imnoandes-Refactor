import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function ArrayByCategory(
  categoryField: string,
  allowedNullFor: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "ArrayByCategory",
      target: object.constructor,
      propertyName,
      constraints: [categoryField, allowedNullFor],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [categoryField, allowedNullFor] = args.constraints;
          const category = (args.object as any)[categoryField];

          if (!category) return true;

          if (allowedNullFor.includes(category) && value == null) return true;

          if (!Array.isArray(value)) return false;

          const uuidV4Regex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

          return value.every((id) => typeof id === "string" && uuidV4Regex.test(id));
        },
        defaultMessage(args: ValidationArguments) {
          const [categoryField, allowedNullFor] = args.constraints;
          const category = (args.object as any)[categoryField];

          if (allowedNullFor.includes(category)) {
            return `${args.property} must be null or an array of UUIDs for category ${category}`;
          }

          return `${args.property} must be an array of UUID v4 for category ${category}`;
        },
      },
    });
  };
}
