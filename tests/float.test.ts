import { float } from '../src/validators/float';

it('should be valid if the variable is a valid float number', () => {
  const validator = float();
  const isValid = validator.validate('ENV_VAR', '1.25');
  const result = validator.parse('1.25');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe(1.25);
});

it('should be invalid if the variable isn\'t a float number', () => {
  const validator = float();
  const isValid = validator.validate('ENV_VAR', 'float');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = float();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is less than the min option', () => {
  const validator = float({ min: 3 });
  const isValid = validator.validate('ENV_VAR', '2');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is greater than the max option', () => {
  const validator = float({ max: 10 });
  const isValid = validator.validate('ENV_VAR', '20');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = float({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = float({ optional: true, defaultValue: 2.3 });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(2.3);
});
