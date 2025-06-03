import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type EnumOptions = {
  optional?: boolean;
  enum: string[];
  defaultValue?: string; 
};

/**
 * Validate if the environment variable value is one of the values of the enum.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.enum - The list of values used to validate the variable.
 * @param options.defaultValue - Value to be returned if the variable is not defined.
 * 
 * @returns Validator object.
 */
export function enumm<T extends EnumOptions>(options: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .enum(options.enum)
        .validate();
    },
    parse: (value?: string) => {
      return value !== undefined
        ? value
        : options.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
