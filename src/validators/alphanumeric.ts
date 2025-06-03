import { AlphanumericLocale, IsAlphanumericOptions } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type AlphanumericOptions = {
  optional?: boolean;
  length?: number;
  locale?: AlphanumericLocale;
  ignore?: IsAlphanumericOptions['ignore']
  defaultValue?: string;
};

/**
 * Validate if the environment variable value only contains alphanumeric values (a-zA-Z0-9).
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.length - The length of the value.
 * @param options.locale - Locale used in the validation.
 * @param options.ignore - Characters to be ignored in the validation.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function alphanumeric<T extends AlphanumericOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isAlphanumeric({ locale: options?.locale, ignore: options?.ignore })
        .length(options?.length)
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
