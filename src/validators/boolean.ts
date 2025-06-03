import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type BooleanOptions = {
  optional?: boolean;
  trueValue?: string;
  defaultValue?: boolean;
};

/**
 * Validate if the environment variable value is boolean and parse it to boolean.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.trueValue - The value that will be compared to the variable to determine if it is true or false. Default "true".
 * @param options.defaultValue - Value to be returned if the variable is not defined.
 * 
 * @returns Validator object.
 */
export const boolean = <T extends BooleanOptions>(options?: T): Validator<T, boolean> => ({
  validate: (key, value) => (
    validations(key, value)
      .isOptional(options?.optional)
      .isDefined()
      .validate()
  ),
  parse: (value?: string) => (
    value !== undefined 
      ? value === (options?.trueValue || 'true')
      : options?.defaultValue as InferParseReturnType<T, boolean>
  )
});
