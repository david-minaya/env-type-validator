import { BaseValidator, ParseFunction } from './types/validator';

type EnvSchema = Record<string, BaseValidator>;

type Return<T extends EnvSchema> = { 
  [key in keyof T]: 
  T[key]['parse'] extends ParseFunction
    ? ReturnType<T[key]['parse']> 
    : string
};

/**
 * Validate environment variables, if any variable is not valid, throw an exception.
 * 
 * @param schema - Validation schema
 * 
 * @returns A typed and parsed version of the environment variables.
 * 
 * @example
 * 
 * 
 * **Environment variables**
 * 
 * ```bash
 *  DB_NAME=database
 *  # DB_PASS=aasu2922l
 *  HOST=localhost
 *  # PORT=8070
 *  ENABLE_LOGS=yes
 *  DECIMAL=141.363
 * ```
 * 
 * **Validation**
 * 
 * ```
 *  const env = validateEnv({
 *    DB_NAME: string(),
 *    DB_PASS: string({ optional: true }),
 *    HOST: string(),
 *    PORT: number({ optional: true, defaultValue: 8596 }),
 *    ENABLE_LOGS: boolean({ trueValue: 'yes', optional: true }),
 *    DECIMAL: float({ min: 89.334234 }),
 *  });
 * ```
 * 
 * **Result:**
 * 
 * ```
 *  {
 *    DB_NAME: 'database',
 *    DB_PASS: undefined,
 *    HOST: 'localhost',
 *    PORT: 8596,
 *    ENABLE_LOGS: true,
 *    DECIMAL: 141.363
 *  }
 * ```
 */
export function validateEnv<T extends EnvSchema>(schema: T): { [k in keyof Return<T>]: Return<T>[k] } {

  const result: { [key: string]: unknown } = { };

  for (const [key, value] of Object.entries(schema)) {

    const envValue = process.env[key];

    const validateResult = value.validate(key, envValue);

    if (!validateResult.isValid) {
      const errorMessage = validateResult.error ?? `${key}: invalid variable`;
      throw new Error(errorMessage);
    }

    result[key] = value.parse ? value.parse(envValue) : envValue;
  }

  return result as Return<T>;
}
