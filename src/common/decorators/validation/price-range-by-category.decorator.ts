import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { CURRENCY, PROPERTY_CATEGORY } from 'generated/prisma';

type PriceRange = {
  [currency in CURRENCY]?: { min?: number; max?: number };
};

type CategoryPriceConfig = {
  [category in PROPERTY_CATEGORY]?: PriceRange;
};

export function PriceRangeByCategory(
  categoryField: string,
  currencyField: string,
  config: CategoryPriceConfig,
  defaultCurrency: CURRENCY = CURRENCY.PEN,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'PriceRangeByCategory',
      target: object.constructor,
      propertyName,
      constraints: [categoryField, currencyField, config, defaultCurrency],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value == null) return true;

          const [categoryField, currencyField, config, defaultCurrency] = args.constraints;
          const category = (args.object as any)[categoryField];
          let currency = (args.object as any)[currencyField] || defaultCurrency;

          if (!category || !config[category]) return true;
          const ranges = config[category];
          const range = ranges[currency] || ranges[defaultCurrency];

          if (!range) return true;

          if (range.min != null && value < range.min) return false;
          if (range.max != null && value > range.max) return false;
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [categoryField, currencyField, config, defaultCurrency] = args.constraints;
          const category = (args.object as any)[categoryField];
          let currency = (args.object as any)[currencyField] || defaultCurrency;

          const ranges = config[category];
          const range = ranges[currency] || ranges[defaultCurrency];

          if (!range) return `${args.property} does not comply with dynamic rules`;

          if (range.min != null && range.max != null)
            return `${args.property} must be between ${range.min} and ${range.max} for category ${category} in currency ${currency}`;
          if (range.min != null)
            return `${args.property} must be greater than or equal to ${range.min} for category ${category} in currency ${currency}`;
          if (range.max != null)
            return `${args.property} must be less than or equal to ${range.max} for category ${category} in currency ${currency}`;

          return `${args.property} does not comply with dynamic rules`;
        },
      },
    });
  };
}
