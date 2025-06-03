/* eslint-disable @typescript-eslint/no-explicit-any */
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type JsonOptions = {
  optional?: boolean;
  defaultValue?: any;
};

/**
 * Validate if the environment variable value is a valid JSON and parse it using JSON.parse.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function json<T extends JsonOptions>(options?: T): Validator<T, any> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isJSON()
        .validate();
    },
    parse: (value?: string) => {
      return value
        ? JSON.parse(value)
        : options?.defaultValue as InferParseReturnType<T, any>;
    }
  };
}
