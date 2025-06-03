import { hash } from '../src/validators/hash';

it('should be valid if the variable contains a valid hash', () => {
  const validator = hash({ algorithm: 'md5' });
  const isValid = validator.validate('ENV_VAR', '5d59d36569272e0f4e11dea9b2b2e756');
  const result = validator.parse('5d59d36569272e0f4e11dea9b2b2e756');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('5d59d36569272e0f4e11dea9b2b2e756');
});

it('should be invalid if the variable contains an invalid hash', () => {
  const validator = hash({ algorithm: 'md5' });
  const isValid = validator.validate('ENV_VAR', 'invalid_hash');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = hash({ algorithm: 'md5' });
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = hash({ algorithm: 'md5', optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = hash({ optional: true, algorithm: 'md5', defaultValue: '5d59d36569272e0f4e11dea9b2b2e756' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('5d59d36569272e0f4e11dea9b2b2e756');
});
