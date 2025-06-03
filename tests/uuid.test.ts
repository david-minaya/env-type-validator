import { uuid } from '../src/validators/uuid';

const uuidValue = 'b7671bc0-5abc-4f92-bcb9-180376e6c624';

it('should be valid if the variable contains a valid UUID', () => {
  const validator = uuid();
  const isValid = validator.validate('ENV_VAR', uuidValue);
  const result = validator.parse(uuidValue);
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe(uuidValue);
});

it('should be invalid if the variable contains an invalid UUID', () => {
  const validator = uuid();
  const isValid = validator.validate('ENV_VAR', 'b7671bc0-5abck-4f92-bcb9-180376e6c624');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = uuid();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = uuid({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = uuid({ optional: true, defaultValue: uuidValue });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(uuidValue);
});
