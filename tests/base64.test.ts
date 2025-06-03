import { base64 } from '../src/validators/base64';

it('should be valid if the variable contains a valid base64 string', () => {
  const validator = base64();
  const isValid = validator.validate('ENV_VAR', 'aG9sYSBtdW5kbw==');
  const result = validator.parse('aG9sYSBtdW5kbw==');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('aG9sYSBtdW5kbw==');
});

it('should be invalid if the variable contains invalid base64 string', () => {
  const validator = base64();
  const isValid = validator.validate('ENV_VAR', 'abc1ñ');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = base64();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = base64({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = base64({ optional: true, defaultValue: 'aG9sYSBtdW5kbw==' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('aG9sYSBtdW5kbw==');
});

it('should be valid if the length of the variable is equal than the length option', () => {
  const validator = base64({ length: 16 });
  const isValid = validator.validate('ENV_VAR', 'aG9sYSBtdW5kbw==');
  expect(isValid).toEqual({ isValid: true });
});

it('should be invalid if the length of the variable isn\'t equal than the length option', () => {
  const validator = base64({ length: 3 });
  const isValid = validator.validate('ENV_VAR', 'aG9sYSBtdW5kbw==');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});
