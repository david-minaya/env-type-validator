import { hex } from '../src/validators/hex';

it('should be valid if the variable constains a valid hex value', () => {
  const validator = hex();
  const isValid = validator.validate('ENV_VAR', 'ACFF2B');
  const result = validator.parse('ACFF2B');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('ACFF2B');
});

it('should be invalid if the variable is undefined', () => {
  const validator = hex();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = hex({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = hex({ optional: true, defaultValue: 'ACFF2B' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('ACFF2B');
});

it('should be valid if the length of the variable is equal than the length option', () => {
  const validator = hex({ length: 6 });
  const isValid = validator.validate('ENV_VAR', 'ACFF2B');
  expect(isValid).toEqual({ isValid: true });
});

it('should be invalid if the length of the variable isn\'t equal than the length option', () => {
  const validator = hex({ length: 3 });
  const isValid = validator.validate('ENV_VAR', 'ACFF2B');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});
