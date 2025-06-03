import { IPVersion } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type IPOptions = {
  optional?: boolean;
  version?: IPVersion;
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is a valid IP address.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.version - The IP version used to validate the IP.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function ip<T extends IPOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isIP(options?.version)
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
