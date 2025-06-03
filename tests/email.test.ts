import { email } from '../src/validators/email';

it('should be valid if the variable contains a valid email', () => {
  const validator = email();
  const isValid = validator.validate('ENV_VAR', 'example@mail.com');
  const result = validator.parse('example@mail.com');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('example@mail.com');
});

it('should be invalid if the variable contains an invalid email', () => {
  const validator = email();
  const isValid = validator.validate('ENV_VAR', 'example@mail');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = email();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = email({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = email({ optional: true, defaultValue: 'example@mail.com' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('example@mail.com');
});
