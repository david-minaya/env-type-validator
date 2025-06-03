import { IsURLOptions } from 'validator';
import { InferParseReturnType } from '../types/validator';
import { Validator } from '../types/validator';
import { validations } from '../validations';

export type UrlOptions = {
  optional?: boolean;
  protocols?: IsURLOptions['protocols'];
  requireTld?: IsURLOptions['require_tld'];
  requireProtocol?: IsURLOptions['require_protocol'];
  requireHost?: IsURLOptions['require_host'];
  requirePort?: IsURLOptions['require_port'];
  requireValidProtocol?: IsURLOptions['require_valid_protocol'];
  allowUnderscores?: IsURLOptions['allow_underscores'];
  hostWhitelist?: IsURLOptions['host_whitelist'];
  hostBlacklist?: IsURLOptions['host_blacklist'];
  allowTrailingDot?: IsURLOptions['allow_trailing_dot'];
  allowProtocolRelativeUrls?: IsURLOptions['allow_protocol_relative_urls'];
  disallowAuth?: IsURLOptions['disallow_auth'];
  allowFragments?: IsURLOptions['allow_fragments'];
  allowQueryComponents?: IsURLOptions['allow_query_components'];
  validateLength?: IsURLOptions['validate_length'];
  maxAllowedLength?: IsURLOptions['max_allowed_length'];
  defaultValue?: string;
};

/**
 * Validate if the environment variable value is a valid url.
 * 
 * @param options - Validation options.
 * @param options.optional - If it's true, only validate the variable if it is defined.
 * @param options.protocols - valid protocols can be modified with this option.
 * @param options.requireTld - If set to false isURL will not check if the URL's host includes a top-level domain.
 * @param options.requireProtocol - if set to true isURL will return false if protocol is not present in the URL.
 * @param options.requireHost - if set to false isURL will not check if host is present in the URL.
 * @param options.requirePort - if set to true isURL will check if port is present in the URL.
 * @param options.requireValidProtocol - isURL will check if the URL's protocol is present in the protocols option.
 * @param options.allowUnderscores - if set to true, the validator will allow underscores in the URL.
 * @param options.hostWhitelist - if set to an array of strings or regexp, and the domain matches none of the strings defined in it, the validation fails.
 * @param options.hostBlacklist - if set to an array of strings or regexp, and the domain matches any of the strings defined in it, the validation fails.
 * @param options.allowTrailingDot - if set to true, the validator will allow the domain to end with a . character.
 * @param options.allowProtocolRelativeUrls - if set to true protocol relative URLs will be allowed.
 * @param options.disallowAuth - if set to true, the validator will fail if the URL contains an authentication component, e.g. http://username:password@example.com.
 * @param options.allowFragments - if set to false isURL will return false if fragments are present.
 * @param options.allowQueryComponents - if set to false isURL will return false if query components are present.
 * @param options.validateLength - if set to false isURL will skip string length validation. max_allowed_length will be ignored if this is set as false.
 * @param options.maxAllowedLength - if set, isURL will not allow URLs longer than the specified value (default is 2084 that IE maximum URL length).
 * @param options.defaultValue - Value that will be returned if the variable is undefined.
 * 
 * @returns Validator object.
 */
export function url<T extends UrlOptions>(options?: T): Validator<T, string> {
  return {
    validate: (key, value) => {
      return validations(key, value)
        .isOptional(options?.optional)
        .isDefined()
        .isUrl({
          require_tld: options?.requireTld,
          require_protocol: options?.requireProtocol,
          require_host: options?.requireHost,
          require_port: options?.requirePort,
          require_valid_protocol: options?.requireValidProtocol,
          allow_underscores: options?.allowUnderscores,
          host_whitelist: options?.hostWhitelist,
          host_blacklist: options?.hostBlacklist,
          allow_trailing_dot: options?.allowTrailingDot,
          allow_protocol_relative_urls: options?.allowProtocolRelativeUrls,
          disallow_auth: options?.disallowAuth,
          allow_fragments: options?.allowFragments,
          allow_query_components: options?.allowQueryComponents,
          validate_length: options?.validateLength,
          max_allowed_length: options?.maxAllowedLength
        })
        .validate();
    },
    parse: (value?: string) => {
      return value ?? options?.defaultValue as InferParseReturnType<T, string>;
    }
  };
}
