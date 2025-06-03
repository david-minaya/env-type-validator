import { IsMACAddressOptions } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type MacAddressOptions = {
  optional?: boolean;
  noColons?: IsMACAddressOptions['no_colons'];
  noSeparators?: IsMACAddressOptions['no_separators'];
  eui?: IsMACAddressOptions['eui'];
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is a valid MAC address.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.noColons - [DEPRECATED] use no_separators instead. If it's true, the validator will allow MAC addresses without the colons. Also, it allows the use of hyphens or spaces. e.g. `01 02 03 04 05 ab` or `01-02-03-04-05-ab`.
 * @param options.noSeparators - If it's true, the validator will allow MAC addresses without the colons. Also, it allows the use of hyphens or spaces. e.g. `01 02 03 04 05 ab` or `01-02-03-04-05-ab`.  
 * @param options.eui - Setting `eui` allows for validation against EUI-48 or EUI-64 instead of both.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function macAddress<T extends MacAddressOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isMACAddress({ 
          no_colons: options?.noColons, 
          no_separators: options?.noSeparators,
          eui: options?.eui
        })
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
