import { string } from '../src/validators/string';

it('should be valid if the variable is defined', () => {
  const validator = string();
  const isValid = validator.validate('ENV_VAR', 'abc');
  const result = validator.parse('abc');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('abc');
});

it('should be invalid if the variable is undefined', () => {
  const validator = string();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = string({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = string({ optional: true, defaultValue: 'abc' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('abc');
});

it('should be valid if the length of the variable is equal than the length option', () => {
  const validator = string({ length: 3 });
  const isValid = validator.validate('ENV_VAR', 'abc');
  expect(isValid).toEqual({ isValid: true });
});

it('should be invalid if the length of the variable isn\'t equal than the length option', () => {
  const validator = string({ length: 3 });
  const isValid = validator.validate('ENV_VAR', 'abcd');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});
