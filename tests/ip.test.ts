import { ip } from '../src/validators/ip';

it('should be valid if the variable contains a valid ip', () => {
  const validator = ip();
  const isValid = validator.validate('ENV_VAR', '127.0.0.1');
  const result = validator.parse('127.0.0.1');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('127.0.0.1');
});

it('should be invalid if the variable contains an invalid ip', () => {
  const validator = ip();
  const isValid = validator.validate('ENV_VAR', '127.258.0.63.1');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = ip();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = ip({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = ip({ optional: true, defaultValue: '127.0.0.1' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('127.0.0.1');
});
