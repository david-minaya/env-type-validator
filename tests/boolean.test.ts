import { boolean } from '../src/validators/boolean';

it('should be valid if the variable value is "true" and should parse the value to true', () => {
  const validator = boolean();
  const isValid = validator.validate('ENV_VAR', 'true');
  const result = validator.parse('true');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe(true);
});

it('should be valid if the variable value isn\'t "true" and should parse the value to false', () => {
  const validator = boolean();
  const isValid = validator.validate('ENV_VAR', 'false');
  const result = validator.parse('false');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe(false);
});

it('should be valid if the variable value is equals to the trueValue option and should parse the value to true', () => {
  const validator = boolean({ trueValue: 'yes' });
  const isValid = validator.validate('ENV_VAR', 'yes');
  const result = validator.parse('yes');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe(true);
});

it('should be invalid if the variable is undefined', () => {
  const validator = boolean();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = boolean({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = boolean({ optional: true, defaultValue: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(true);
});
