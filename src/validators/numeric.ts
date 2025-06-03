import { AlphaLocale } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type NumericOptions = {
  optional?: boolean;
  noSymbols?: boolean;
  locale?: AlphaLocale;
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is numeric value.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.noSymbols - If it's true, the validator will reject numeric strings that feature a symbol (e.g. `+`, `-`, or `.`).
 * @param options.locale - Locale used in the validation.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function numeric<T extends NumericOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isNumeric({ no_symbols: options?.noSymbols, locale: options?.locale })
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
