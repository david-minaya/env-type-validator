import { url } from '../src/validators/url';

const urlValue = 'https://www.google.com';

it('should be valid if the variable contains a valid url', () => {
  const validator = url();
  const isValid = validator.validate('ENV_VAR', urlValue);
  const result = validator.parse(urlValue);
  expect(isValid).toEqual({ isValid: true, error: undefined });
  expect(result).toBe(urlValue);
});

it('should be invalid if the variable contains an invalid url', () => {
  const validator = url();
  const isValid = validator.validate('ENV_VAR', 'https://www.google+*/-.com');
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be invalid if the variable is undefined', () => {
  const validator = url();
  const isValid = validator.validate('ENV_VAR', undefined);
  expect(isValid).toEqual(expect.objectContaining({ isValid: false, error: expect.any(String) }));
});

it('should be valid is the variable is undefined and the optional option is true', () => {
  const validator = url({ optional: true });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(undefined);
});

it('should return the defaultValue if the variable is undefined and the options optional and defaultValue are set', () => {
  const validator = url({ optional: true, defaultValue: urlValue });
  const isValid = validator.validate('ENV_VAR', undefined);
  const result = validator.parse(undefined);
  expect(isValid).toEqual({ isValid: true });
  expect(result).toBe(urlValue);
});
