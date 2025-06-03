import { validateEnv, string, number, boolean, float } from '../src';

const envBackup = process.env;

beforeAll(() => {
  process.env.DB_NAME = 'database';
  process.env.HOST = 'localhost';
  process.env.ENABLE_LOGS = 'yes';
  process.env.DECIMAL = '141.363';
  process.env.CUSTOM = '1, 2, 3, 4, 5';
  process.env.NAME = '1, 2, 3, 4, 5';
});

it('should validate the environment variables', () => {

  const env = validateEnv({
    DB_NAME: string(),
    DB_PASS: string({ optional: true }),
    HOST: string(),
    PORT: number({ optional: true, defaultValue: 8596 }),
    ENABLE_LOGS: boolean({ trueValue: 'yes', optional: true }),
    DECIMAL: float({ min: 89.334234 }),
    CUSTOM: {
      validate: (key, value) => ({ 
        isValid: value !== undefined && /^(\d+,\s)+\d+$/.test(value) 
      })
    }
  });

  expect(env).toEqual({
    DB_NAME: 'database',
    DB_PASS: undefined,
    HOST: 'localhost',
    PORT: 8596,
    ENABLE_LOGS: true,
    DECIMAL: 141.363,
    CUSTOM: '1, 2, 3, 4, 5'
  });
});

it('Should throw an exception if some environment variables are invalid.', () => {

  expect(() => {

    const env = validateEnv({
      DB_NAME: string(),
      DB_PASS: string({ optional: true }),
      HOST: string(),
      PORT: number({ optional: true }),
      ENABLE_LOGS: boolean({ trueValue: 'yes', optional: true }),
      DECIMAL: float({ min: 89.334234 }),
      // The environment variable NAME doesn't exists, it will throws an exception.
      NAME: { 
        validate: (key, value) => ({ 
          isValid: value === 'env' 
        }) 
      }
    });
  
    expect(env).toEqual({
      DB_NAME: 'database',
      DB_PASS: undefined,
      HOST: 'localhost',
      PORT: 8596,
      ENABLE_LOGS: true,
      DECIMAL: 141.363
    });

  }).toThrow();
});

afterAll(() => {
  process.env = envBackup;
});
