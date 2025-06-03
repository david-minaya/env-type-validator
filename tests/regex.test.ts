import { regex } from '../src/validators/regex';

const regexp = /^\w+$/;

it('should be valid if the variable contains a valid regex', () => {
  const validator = regex({ regex: regexp });
  const isValid = validator.validate('ENV_VAR', 'name');
  const result = validator.parse('name');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('name');
});

it('should be invalid if the variable contains an invalid regex', () => {
  const validator = regex({ regex: regexp });
  const isValid = validator.validate('ENV_VAR', '+*/-jh5');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = regex({ regex: regexp });
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = regex({ regex: regexp, optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = regex({ regex: regexp, optional: true, defaultValue: 'name' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('name');
});
