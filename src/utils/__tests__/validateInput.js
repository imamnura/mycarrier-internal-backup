import validateInput from '../../__old/utils/validateInput';
import Joi from 'joi-browser';

describe('validateInput', () => {
  it('standard object', () => {
    const expectValue = validateInput({
      values: { username: '' },
      schema: { username: Joi.string().required() },
    });
    const equal = { username: '"username" is not allowed to be empty' };
    expect(expectValue).toEqual(equal);
  });

  it('nested 2', () => {
    const expectValue = validateInput({
      values: { user: { username: '' } },
      schema: { user: { username: Joi.string().required() } },
    });
    const equal = {
      user: { username: '"username" is not allowed to be empty' },
    };
    expect(expectValue).toEqual(equal);
  });

  it('nested 3', () => {
    const expectValue = validateInput({
      values: { user: { basic: { username: '' } } },
      schema: { user: { basic: { username: Joi.string().required() } } },
    });
    const equal = {
      user: { basic: { username: '"username" is not allowed to be empty' } },
    };
    expect(expectValue).toEqual(equal);
  });

  it('given rule: max-20', () => {
    const value = `1234567890123456789012345678901234567890
    1234567890123456789012345678901234567890
    1234567890123456789012345678901234567890
    1234567890123456789012345678901234567890
    1234567890123456789012345678901234567890
    1234567890123456789012345678901234567890`;
    const expectValue = validateInput({
      values: { value },
      schema: {
        value: Joi.string().required().max(20),
      },
    });
    expect(expectValue).toEqual({
      value: '"value" length must be less than or equal to 20 characters long',
    });
  });
});
