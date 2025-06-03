import { number } from '../src/validators/number';

it('should be valid if the variable is a valid number', () => {
  const validator = number();
  const isValid = validator.validate('ENV_VAR', '1');
  const result = validator.parse('1');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe(1);
});

it('should be invalid if the variable isn\'t a number', () => {
  const validator = number();
  const isValid = validator.validate('ENV_VAR', 'float');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = number();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is less than the min option', () => {
  const validator = number({ min: 3 });
  const isValid = validator.validate('ENV_VAR', '2');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is greater than the max option', () => {
  const validator = number({ max: 10 });
  const isValid = validator.validate('ENV_VAR', '20');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = number({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = number({ optional: true, defaultValue: 2 });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(2);
});
