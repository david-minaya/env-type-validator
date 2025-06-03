import { IPVersion } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type IPRangeOptions = {
  optional?: boolean;
  version?: IPVersion;
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is a valid IP range.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.version - The IP version used to validate the IP range.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function ipRange<T extends IPRangeOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isIPRange(options?.version)
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
