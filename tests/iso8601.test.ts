import { iso8601 } from '../src/validators/iso8601';

it('should be valid if the variable contains a valid ISO8601', () => {
  const validator = iso8601();
  const isValid = validator.validate('ENV_VAR', '2025-05-31T22:38:03.103Z');
  const result = validator.parse('2025-05-31T22:38:03.103Z');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('2025-05-31T22:38:03.103Z');
});

it('should be invalid if the variable contains an invalid ISO8601', () => {
  const validator = iso8601();
  const isValid = validator.validate('ENV_VAR', '2025-05-31T222:38:03.103Z');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = iso8601();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = iso8601({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = iso8601({ optional: true, defaultValue: '2025-05-31T22:38:03.103Z' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('2025-05-31T22:38:03.103Z');
});
