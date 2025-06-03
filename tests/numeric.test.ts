import { numeric } from '../src/validators/numeric';

it('should be valid if the variable contains a valid numeric value', () => {
  const validator = numeric();
  const isValid = validator.validate('ENV_VAR', '1000');
  const result = validator.parse('1000');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('1000');
});

it('should be invalid if the variable contains an invalid numeric valid', () => {
  const validator = numeric();
  const isValid = validator.validate('ENV_VAR', 'invalid');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = numeric();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = numeric({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = numeric({ optional: true, defaultValue: '1000' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('1000');
});
