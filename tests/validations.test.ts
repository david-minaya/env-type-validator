import { validations } from '../src/validations';

it('should throw an exception if another method is called first than the isOptional method', () => {

  expect(() => {

    validations('ENV_VAR', 'value')
      .isDefined()
      .isOptional()
      .validate();

  }).toThrow();

});
