import { date } from '../src/validators/date';

it('should be valid if the variable contains a valid date', () => {
  const validator = date();
  const isValid = validator.validate('ENV_VAR', '2025-05-23');
  const result = validator.parse('2025-05-23');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('2025-05-23');
});

it('should be invalid if the variable contains an invalid date', () => {
  const validator = date();
  const isValid = validator.validate('ENV_VAR', '89-741-896');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = date();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = date({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = date({ optional: true, defaultValue: '2025-04-25' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('2025-04-25');
});
