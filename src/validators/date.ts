import { IsDateOptions } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type DateOptions = {
  optional?: boolean;
  format?: IsDateOptions['format'];
  strictMode?: IsDateOptions['strictMode'];
  delimiters?: IsDateOptions['delimiters'];
  defaultValue?: string;
};

/**
 * Validate if the environment variable value contains a valid date.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.format - The format that will be used to validate the date.
 * @param options.strictMode - If it's true, the validator will reject inputs different from format.
 * @param options.delimiters - An array of allowed date delimiters, default: ['/', '-'].
 * @param options.defaultValue - Value to be returned if the variable is not defined.
 * 
 * @returns Validator object.
 */
export function date<T extends DateOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isDate({
          format: options?.format,
          strictMode: options?.strictMode,
          delimiters: options?.delimiters
        })
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
