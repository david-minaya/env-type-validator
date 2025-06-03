import { IsBase64Options } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type Base64Options = {
  optional?: boolean;
  length?: number;
  urlSafe?: IsBase64Options['urlSafe']
  defaultValue?: string;
};

/**
 * Validate if the environment variable value contains a valid base64 value.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.length - The length of the value.
 * @param options.urlSafe - Validate if the value is url safe.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function base64<T extends Base64Options>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isBase64({ urlSafe: options?.urlSafe })
        .length(options?.length)
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
