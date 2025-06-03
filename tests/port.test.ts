import { port } from '../src/validators/port';

it('should be valid if the variable contains a valid port', () => {
  const validator = port();
  const isValid = validator.validate('ENV_VAR', '80');
  const result = validator.parse('80');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('80');
});

it('should be invalid if the variable contains an invalid port', () => {
  const validator = port();
  const isValid = validator.validate('ENV_VAR', '2564256');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = port();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = port({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = port({ optional: true, defaultValue: '80' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('80');
});
