import validate from '../validate';

describe('src/components/forms/Return/validate', () => {
  test('validate', () => {
    const value = jest.fn();
    expect(validate(value, { maxLength: 10 })).not.toBeNull();
  });
});
