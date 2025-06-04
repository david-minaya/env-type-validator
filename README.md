# Env Type Validator

A validation library used to validate, type, and parse environment variables in Node.

### Content

- [Installation](#installation)
- [Usage](#usage)
- [Type inference](#type-inference)
- [Validators](#validators)
- [Custom validator](#custom-validator)
- [Contributing](#contributing)

## Installation

##### npm

```
npm install env-type-validator
```

##### yarn

```
yarn add env-type-validator
```

##### pnpm

```
pnpm i env-type-validator
```

## Usage

This library validates environment variables. If any variable is invalid, it throws an exception. Otherwise, it returns a typed and parsed object containing the validated environment variables.

By default, all variables are required. To make a variable optional, set the `optional` option to `true` in the validator function. Optional variables are only validated if they are defined, if the variable is `undefined`, the validation is skipped. If a `defaultValue` is provided for an optional variable, it will be used when the variable is not set.

##### Example .env file

```shell
DB_NAME=database
# DB_PASS=aasu2922l
HOST=localhost
# PORT=8070
ENABLE_LOGS=yes
DECIMAL=141.363
```

##### Validation file

```ts
import validate, { string, number, boolean } from 'env-type-validator';

const env = validate({
  DB_NAME: string(),
  DB_PASS: string({ optional: true }),
  HOST: string(),
  PORT: number({ optional: true, defaultValue: 8596 }),
  ENABLE_LOGS: boolean({ trueValue: 'yes', optional: true }),
  DECIMAL: float({ min: 89.334234 }),
});
```

#### Result

```ts
{
  DB_NAME: 'database',
  DB_PASS: undefined,
  HOST: 'localhost',
  PORT: 8596,
  ENABLE_LOGS: true,
  DECIMAL: 141.363
}
```

## Type inference

This library infers the type of environment variables based on the validators.

For example:

- The `number()` validator will return a value of type `number`.

- The `number({ optional: true })` with the optional option set to true will return a value of type `number | undefined`.

<br>

![alt text](images/image.png)

## Validators

List of built-in validators. You can also create your own custom validator; see the [Custom validator](#custom-validator) section for more information.

> We use [validator.js](https://www.npmjs.com/package/validator) for some of the validations.

#### Built-in validators:

- [alpha](#alpha)
- [alphanumeric](#alphanumeric)
- [ascii](#ascii)
- [base64](#base64)
- [boolean](#boolean)
- [date](#date)
- [email](#email)
- [enumm](#enumm)
- [float](#float)
- [hash](#hash)
- [hex](#hex)
- [ip](#ip)
- [ipRange](#ipRange)
- [iso8601](#iso8601)
- [json](#json)
- [jwt](#jwt)
- [mac](#mac)
- [number](#number)
- [numeric](#numeric)
- [port](#port)
- [regex](#regex)
- [string](#string)
- [url](#url)
- [uuid](#uuid)

#### `alpha()`

Validate if the environment variable value only contains letters (a-zA-Z).

###### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **length**: The length of the value.
- **locale**: Locale used in the validation.
- **ignore**: Characters to be ignored in the validation.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `alphanumeric()`

Validate if the environment variable value only contains alphanumeric values (a-zA-Z0-9).

###### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **length**: The length of the value.
- **locale**: Locale used in the validation.
- **ignore**: Characters to be ignored in the validation.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `ascii()`

Validate if the environment variable value contains valid ASII characters.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **length**: The length of the value.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `base64()`

Validate if the environment variable value contains a valid base64 value.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **length**: The length of the value.
- **urlSafe**: Validate if the value is url safe.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `boolean()`

Validate if the environment variable value is boolean and parse it to boolean.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **trueValue**: The value that will be compared to the variable to determine if it is true or false. Default "true".
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `date()`

Validate if the environment variable value contains a valid date.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **format**: The format that will be used to validate the date.
- **strictMode**: If it's true, the validator will reject inputs different from format.
- **delimiters**: An array of allowed date delimiters, default: ['/', '-'].
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `email()`

Validate if the environment variable value is a valid email.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **allowDisplayName**: If it's true, the validator will also match `Display Name <email-address>`.
- **requireDisplayName**: If it's true, the validator will reject strings without the format `Display Name <email-address>`.
- **allowUtf8LocalPart**: If it's true, the validator will not allow any non-English UTF8 character in email address' local part.
- **requireTld**: If it's true, the validator will not check for the standard max length of an email.
- **ignoreMaxLength**: If it's true, the validator will not check for the standard max length of an email.
- **allowIpDomain**: If it's true, the validator will allow IP addresses in the host part.
- **domainSpecificValidation**: If it's true, some additional validation will be enabled, e.g. disallowing certain syntactically valid email addresses that are rejected by GMail.
- **allowUnderscores**: If it's true, the validator will allow underscores in an email address.
- **hostBlacklist**: If host_blacklist is set to an array of strings and the part of the email after the @ symbol matches one of the strings defined in it, the validation fails.
- **hostWhitelist**: If host_whitelist is set to an array of strings and the part of the email after the @ symbol matches none of the strings defined in it, the validation fails.
- **blacklistedChars**: If blacklisted_chars receives a string, then the validator will reject emails that include any of the characters in the string, in the name part.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `enumm()`

Validate if the environment variable value is one of the values of the enum.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **enum**: The list of values used to validate the variable.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `float()`

Validate if the environment variable value is a valid float number and parse it to float.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **min**: The min value allowed of the variable.
- **max**: The max value allowed of the variable.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `hash()`

Validate if the environment variable value is a valid hash.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **algorithm**: The algorithm used to validate the hash.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `hex()`

Validate if the environment variable value is a valid hexadecimal value.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **length**: The length of the value.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `ip()`

Validate if the environment variable value is a valid IP address.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **version**: The IP version used to validate the IP.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `ipRange()`

Validate if the environment variable value is a valid IP range.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **version**: The IP version used to validate the IP range.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `iso8601()`

Validate if the environment variable value is a valid ISO8601 date.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **strict**: If it's true, performs additional checks for valid dates, e.g. invalidates dates like `2009-02-29`.
- **strictSeparator**: If it's true, date strings with date and time separated by anything other than a T will be invalid.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `json()`

Validate if the environment variable value is a valid JSON and parse it using JSON.parse.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `jwt()`

Validate if the environment variable value is a valid JWT token.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `mac()`

Validate if the environment variable value is a valid MAC address.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **noColons**: *[DEPRECATED]* use no_separators instead. If it's true, the validator will allow MAC addresses without the colons. Also, it allows the use of hyphens or spaces. e.g. `01 02 03 04 05 ab` or `01-02-03-04-05-ab`.
- **noSeparators**: If it's true, the validator will allow MAC addresses without the colons. Also, it allows the use of hyphens or spaces. e.g. `01 02 03 04 05 ab` or `01-02-03-04-05-ab`.  
- **eui**: Setting `eui` allows for validation against EUI-48 or EUI-64 instead of both.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `number()`

Validate if the environment variable value is a valid number and parse it to number.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **min**: The min value allowed of the variable.
- **max**: The max value allowed of the variable.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `numeric()`

Validate if the environment variable value is numeric value.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **noSymbols**: If it's true, the validator will reject numeric strings that feature a symbol (e.g. `+`, `-`, or `.`).
- **locale**: Locale used in the validation.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `port()`

Validate if the environment variable value is a valid PORT.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `regex()`

Validate if the environment variable value is a valid string.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **regex**: The regex used to validate the variable.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `string()`

Validate if the environment variable value is a valid string.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **length**: The length of the value.
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `url()`

Validate if the environment variable value is a valid url.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **protocols**: valid protocols can be modified with this option.
- **requireTld**: If set to false isURL will not check if the URL's host includes a top-level domain.
- **requireProtocol**: if set to true isURL will return false if protocol is not present in the URL.
- **requireHost**: if set to false isURL will not check if host is present in the URL.
- **requirePort**: if set to true isURL will check if port is present in the URL.
- **requireValidProtocol**: isURL will check if the URL's protocol is present in the protocols option.
- **allowUnderscores**: if set to true, the validator will allow underscores in the URL.
- **hostWhitelist**: if set to an array of strings or regexp, and the domain matches none of the strings defined in it, the validation fails.
- **hostBlacklist**: if set to an array of strings or regexp, and the domain matches any of the strings defined in it, the validation fails.
- **allowTrailingDot**: if set to true, the validator will allow the domain to end with a . character.
- **allowProtocolRelativeUrls**: if set to true protocol relative URLs will be allowed.
- **disallowAuth**: if set to true, the validator will fail if the URL contains an authentication component, e.g. `http://username:password@example.com`.
- **allowFragments**: if set to false isURL will return false if fragments are present.
- **allowQueryComponents**: if set to false isURL will return false if query components are present.
- **validateLength**: if set to false isURL will skip string length validation. max_allowed_length will be ignored if this is set as false.
- **maxAllowedLength**: if set, isURL will not allow URLs longer than the specified value (default is 2084 that IE maximum URL length).
- **defaultValue**: Value that will be returned if the variable is undefined.

#### `uuid()`

Validate if the environment variable value is a valid UUID.

##### *Options*

- **optional**: If it's true, only validate the variable if it is defined.
- **version**: UUID version used to validate the value.
- **defaultValue**: Value that will be returned if the variable is undefined.

## Custom validator

You can define your own custom validator by creating an object that includes a `validate` function and, optionally, a `parse` function.

- **validate**: This function checks whether the environment variable is valid. It should return `{ isValid: true }` if the value is valid, or `{ isValid: false, error?: string }` if it’s invalid. You can optionally include an error message to describe the issue.

- **parse (optional)**: This function transforms the raw value into a desired format or type. If parse is not provided, the original value will be returned as-is. The type of the variable is inferred from the return value of this function.

Example:

```ts

// COLORS=red,blue,white,yellow

const env = validate({
  COLORS: {
    validate: (key, value) => {
      return { 
        isValid: value !== undefined && /^(\w+,)+\w+$/.test(value)
      } 
    },
    parse: (value) => {
      return value.split(',');
    }
  }
});
```

Result:

```ts
{ COLORS: ['red', 'blue', 'white', 'yellow'] }
```

## Contributing

Contributions are welcome! If you’d like to implement a new validator, improve existing ones, or fix a bug, feel free to open a pull request or create an issue to report it.
