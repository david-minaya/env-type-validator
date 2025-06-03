import { IsISO8601Options } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type ISO8601Options = {
  optional?: boolean;
  strict?: IsISO8601Options['strict'];
  strictSeparator?: IsISO8601Options['strictSeparator'];
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is a valid ISO8601 date.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.strict - If it's true, performs additional checks for valid dates, e.g. invalidates dates like `2009-02-29`.
 * @param options.strictSeparator - If it's true, date strings with date and time separated by anything other than a T will be invalid.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function iso8601<T extends ISO8601Options>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isISO8601({ strict: options?.strict, strictSeparator: options?.strictSeparator })
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
