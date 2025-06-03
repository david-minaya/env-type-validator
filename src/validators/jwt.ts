import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type JWTOptions = {
  optional?: boolean;
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is a valid JWT token.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function jwt<T extends JWTOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isJWT()
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
