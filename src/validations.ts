import validator from 'validator';

interface ValidationItem {
  condition: boolean;
  error?: string 
}

export function validations(key: string, value?: string) {
  return new Validations(key, value);
}

class Validations {

  private skipValidations = false;
  private validations: ValidationItem[] = [];

  constructor(
    private readonly key: string,
    private readonly value?: string
  ) {}

  isOptional(optional?: boolean) {

    if (this.validations.length >= 1) {
      throw new Error('The isOptional method must be called before that all other methods');
    }

    this.skipValidations = optional === true && this.value === undefined;

    return this;
  }

  isDefined() {
    this.add({ 
      condition: this.value !== undefined,
      error: `${this.key}: this variable is required`
    });
    return this;
  }

  isNumber() {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isInt(this.value),
        error: `${this.key}: invalid value ${this.value}, expecting a number`
      });
    }
    return this;
  }

  isFloat() {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isFloat(this.value),
        error: `${this.key}: invalid value ${this.value}, expecting a float number`
      });
    }
    return this;
  }

  isAlpha(options?: { locale?: validator.AlphanumericLocale, ignore?: validator.IsAlphaOptions['ignore'] }) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isAlpha(this.value, options?.locale, { ignore: options?.ignore }),
        error: `${this.key}: invalid value: ${this.value}, the string can only contains letters (a-zA-Z)`
      });
    }
    return this;
  }

  isAlphanumeric(options?: { locale?: validator.AlphanumericLocale, ignore?: validator.IsAlphaOptions['ignore'] }) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isAlphanumeric(this.value, options?.locale, { ignore: options?.ignore }),
        error: `${this.key}: invalid value: ${this.value}, the string can only contains letters (a-zA-Z0-9)`
      });
    }
    return this;
  }

  isAscii() {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isAscii(this.value),
        error: `${this.key}: invalid value: ${this.value}, the string can only contains ASCII characters`
      });
    }
    return this;
  }

  isEmail(options?: validator.IsEmailOptions) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isEmail(this.value, options),
        error: `${this.key}: invalid email: ${this.value}`
      });
    }
    return this;
  }

  isUrl(options?: validator.IsURLOptions) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isURL(this.value, options),
        error: `${this.key}: invalid url: ${this.value}`
      });
    }
    return this;
  }

  isUUID(version?: validator.UUIDVersion) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isUUID(this.value, version),
        error: `${this.key}: invalid UUID: ${this.value}`
      });
    }
    return this;
  }

  isNumeric(options?: validator.IsNumericOptions) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isNumeric(this.value, options),
        error: `${this.key}: invalid value: ${this.value}, the value only can contain numbers`
      });
    }
    return this;
  }

  isDate(options?: validator.IsDateOptions) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isDate(this.value, options),
        error: `${this.key}: invalid date: ${this.value}`
      });
    }
    return this;
  }

  isIP(version?: validator.IPVersion) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isIP(this.value, version),
        error: `${this.key}: invalid IP: ${this.value}`
      });
    }
    return this;
  }

  isBase64(options?: validator.IsBase64Options) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isBase64(this.value, options),
        error: `${this.key}: invalid Base64 value: "${this.value}"`
      });
    }
    return this;
  }

  isISO8601(options?: validator.IsISO8601Options) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isISO8601(this.value, options),
        error: `${this.key}: invalid ISO8601 value: "${this.value}"`
      });
    }
    return this;
  }

  isJSON() {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isJSON(this.value),
        error: `${this.key}: invalid JSON value: ${this.value}`
      });
    }
    return this;
  }

  isHex() {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isHexadecimal(this.value),
        error: `${this.key}: invalid hex value: ${this.value}`
      });
    }
    return this;
  }

  isJWT() {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isJWT(this.value),
        error: `${this.key}: invalid JWT token: ${this.value}`
      });
    }
    return this;
  }

  isMACAddress(options?: validator.IsMACAddressOptions) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isMACAddress(this.value, options),
        error: `${this.key}: invalid MAC address: ${this.value}`
      });
    }
    return this;
  }

  isIPRange(version?: validator.IPVersion) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isIPRange(this.value, version),
        error: `${this.key}: invalid IP range: ${this.value}`
      });
    }
    return this;
  }

  isHash(algorithm: validator.HashAlgorithm) {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isHash(this.value, algorithm),
        error: `${this.key}: invalid hash: ${this.value}`
      });
    }
    return this;
  }

  isPort() {
    if (this.value !== undefined) {
      this.add({
        condition: validator.isPort(this.value),
        error: `${this.key}: invalid hash: ${this.value}`
      });
    }
    return this;
  }

  enum(enumOptions: string[]) {
    if (this.value !== undefined && enumOptions) {
      this.add({
        condition: enumOptions.includes(this.value),
        error: `${this.key}: invalid value: ${this.value}, the value must be one of the followings: ${enumOptions.join(',')}`
      });
    }
    return this;
  }

  length(length?: number) {
    if (this.value !== undefined && length !== undefined) {
      this.add({ 
        condition: this.value.length === length,
        error: `${this.key}: invalid value: "${this.value}", current length: ${this.value.length}, expected length: ${length}`
      });
    }
    return this;
  }

  min(min?: number) {
    if (this.value !== undefined && min !== undefined) {
      this.add({
        condition: parseFloat(this.value) > min,
        error: `${this.key}: invalid value: ${this.value}, min value ${min}`
      });
    }
    return this;
  }
  
  max(max?: number) {
    if (this.value !== undefined && max !== undefined) {
      this.add({
        condition: parseFloat(this.value) < max,
        error: `${this.key}: invalid value: ${this.value}, max value ${max}`
      });
    }
    return this;
  }

  regex(regex: RegExp) {
    if (this.value !== undefined) {
      this.add({
        condition: regex.test(this.value),
        error: `${this.key}: invalid value: ${this.value}, the value doesn't match the regex: ${regex}`
      });
    }
    return this;
  }

  validate() {

    if (this.skipValidations) {
      return { isValid: true };
    }

    for (const validation of this.validations) {
      if (!validation.condition) {
        return { isValid: false, error: validation.error };
      }
    }

    return { isValid: true };
  }

  private add(item: ValidationItem) {
    this.validations.push(item);
  }
}
