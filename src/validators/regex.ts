import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type RegexOptions = {
  optional?: boolean;
  regex: RegExp;
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is a valid string.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.regex - The regex used to validate the variable.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function regex<T extends RegexOptions>(options: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .regex(options?.regex)
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
