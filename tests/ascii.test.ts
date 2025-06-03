import { ascii } from '../src/validators/ascii';

it('should be valid if the variable is defined only contains ASCII characters', () => {
  const validator = ascii();
  const isValid = validator.validate('ENV_VAR', 'abc');
  const result = validator.parse('abc');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('abc');
});

it('should be invalid if the variable is defined and contains invalid ASCII characters', () => {
  const validator = ascii();
  const isValid = validator.validate('ENV_VAR', 'abc1ñ');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = ascii();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = ascii({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = ascii({ optional: true, defaultValue: 'abc' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('abc');
});

it('should be valid if the length of the variable is equal than the length option', () => {
  const validator = ascii({ length: 3 });
  const isValid = validator.validate('ENV_VAR', 'abc');
  expect(isValid).toEqual({ isValid: true });
});

it('should be invalid if the length of the variable isn\'t equal than the length option', () => {
  const validator = ascii({ length: 3 });
  const isValid = validator.validate('ENV_VAR', 'abcd');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});
