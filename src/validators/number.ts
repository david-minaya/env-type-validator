import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type NumberOptions = {
  optional?: boolean;
  min?: number;
  max?: number;
  defaultValue?: number;
};

/**
 * Validate if the environment variable value is a valid number and parse it to number.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.min - The min value allowed of the variable.
 * @param options.max - The max value allowed of the variable.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function number<T extends NumberOptions>(options?: T): Validator<T, number> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isNumber()
        .min(options?.min)
        .max(options?.max)
        .validate();
    },
    parse: (value?: string) => {
      return value !== undefined 
        ? parseInt(value) 
        : options?.defaultValue as InferParseReturnType<T, number>;
    }
  };
}
