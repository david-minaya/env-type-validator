export type BaseValidator = {
  validate: (key: string, value?: string) => { isValid: boolean, error?: string };
  parse?: ParseFunction;
};

export type Validator<T extends { optional?: boolean, defaultValue?: unknown }, R> = {
  validate: (key: string, value?: string) => { isValid: boolean, error?: string };
  parse: (value?: string) => InferParseReturnType<T, R>;
};

export type ParseFunction<T = unknown> = (value?: string) => T;

export type InferParseReturnType<T extends { optional?: boolean, defaultValue?: unknown }, R> = 
  T['optional'] extends true
    ? T['defaultValue'] extends R 
      ? R
      : R | undefined
    : R;
