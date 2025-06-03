import { json } from '../src/validators/json';

it('should be valid if the variable contains a valid json', () => {
  const validator = json();
  const isValid = validator.validate('ENV_VAR', '{ "key": "value" }');
  const result = validator.parse('{ "key": "value" }');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toEqual({ key: 'value' });
});

it('should be invalid if the variable contains an invalid json', () => {
  const validator = json();
  const isValid = validator.validate('ENV_VAR', '{ color: red }');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = json();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = json({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = json({ optional: true, defaultValue: { key: 'value' } });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toEqual({ key: 'value' });
});
