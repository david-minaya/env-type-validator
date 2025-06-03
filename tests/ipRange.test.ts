import { ipRange } from '../src/validators/ipRange';

it('should be valid if the variable contains a valid IP range', () => {
  const validator = ipRange();
  const isValid = validator.validate('ENV_VAR', '10.1.0.0/20');
  const result = validator.parse('10.1.0.0/20');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('10.1.0.0/20');
});

it('should be invalid if the variable contains an invalid IP range', () => {
  const validator = ipRange();
  const isValid = validator.validate('ENV_VAR', '10.1.0.0/200');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = ipRange();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = ipRange({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = ipRange({ optional: true, defaultValue: '10.1.0.0/20' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('10.1.0.0/20');
});
