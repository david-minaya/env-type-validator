import { enumm } from '../src/validators/enumm';

const enumValue = ['A', 'B'];

it('should be valid if the variable is one of the values of the enum', () => {
  const validator = enumm({ enum: enumValue });
  const isValid = validator.validate('ENV_VAR', 'A');
  const result = validator.parse('A');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('A');
});

it('should be invalid if the variable isn\'t one of the values of the enum', () => {
  const validator = enumm({ enum: enumValue });
  const isValid = validator.validate('ENV_VAR', 'C');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = enumm({ enum: enumValue });
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = enumm({ optional: true, enum: enumValue });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = enumm({ optional: true, enum: enumValue, defaultValue: 'A' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('A');
});
