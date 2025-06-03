import { macAddress } from '../src/validators/mac';

it('should be valid if the variable contains a valid MAC address', () => {
  const validator = macAddress();
  const isValid = validator.validate('ENV_VAR', '00-1A-2B-3C-4D-5E');
  const result = validator.parse('00-1A-2B-3C-4D-5E');
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe('00-1A-2B-3C-4D-5E');
});

it('should be invalid if the variable contains an invalid MAC address', () => {
  const validator = macAddress();
  const isValid = validator.validate('ENV_VAR', '00-1A-2B-3C-4D');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = macAddress();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = macAddress({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = macAddress({ optional: true, defaultValue: '00-1A-2B-3C-4D-5E' });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe('00-1A-2B-3C-4D-5E');
});
