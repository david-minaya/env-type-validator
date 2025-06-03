import { IsEmailOptions } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type EmailOptions = {
  optional?: boolean;
  allowDisplayName?: IsEmailOptions['allow_display_name'];
  requireDisplayName?: IsEmailOptions['require_display_name'];
  allowUtf8LocalPart?: IsEmailOptions['allow_utf8_local_part'];
  requireTld?: IsEmailOptions['require_tld'];
  ignoreMaxLength?: IsEmailOptions['ignore_max_length'];
  allowIpDomain?: IsEmailOptions['allow_ip_domain'];
  domainSpecificValidation?: IsEmailOptions['domain_specific_validation'];
  allowUnderscores?: IsEmailOptions['allow_underscores'];
  hostBlacklist?: IsEmailOptions['host_blacklist'];
  hostWhitelist?: IsEmailOptions['host_whitelist'];
  blacklistedChars?: IsEmailOptions['blacklisted_chars'];
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is a valid email.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.allowDisplayName - If it's true, the validator will also match `Display Name <email-address>`.
 * @param options.requireDisplayName - If it's true, the validator will reject strings without the format `Display Name <email-address>`.
 * @param options.allowUtf8LocalPart - If it's true, the validator will not allow any non-English UTF8 character in email address' local part.
 * @param options.requireTld - If it's true, the validator will not check for the standard max length of an email.
 * @param options.ignoreMaxLength - If it's true, the validator will not check for the standard max length of an email.
 * @param options.allowIpDomain - If it's true, the validator will allow IP addresses in the host part.
 * @param options.domainSpecificValidation - If it's true, some additional validation will be enabled, e.g. disallowing certain syntactically valid email addresses that are rejected by GMail.
 * @param options.allowUnderscores - If it's true, the validator will allow underscores in an email address.
 * @param options.hostBlacklist - If host_blacklist is set to an array of strings and the part of the email after the @ symbol matches one of the strings defined in it, the validation fails.
 * @param options.hostWhitelist - If host_whitelist is set to an array of strings and the part of the email after the @ symbol matches none of the strings defined in it, the validation fails.
 * @param options.blacklistedChars - If blacklisted_chars receives a string, then the validator will reject emails that include any of the characters in the string, in the name part.
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function email<T extends EmailOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isEmail({
          allow_display_name: options?.allowDisplayName,
          require_display_name: options?.requireDisplayName,
          allow_utf8_local_part: options?.allowUtf8LocalPart,
          require_tld: options?.requireTld,
          ignore_max_length: options?.ignoreMaxLength,
          allow_ip_domain: options?.allowIpDomain,
          domain_specific_validation: options?.domainSpecificValidation,
          allow_underscores: options?.allowUnderscores,
          host_blacklist: options?.hostBlacklist,
          host_whitelist: options?.hostWhitelist,
          blacklisted_chars: options?.blacklistedChars
        })
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
