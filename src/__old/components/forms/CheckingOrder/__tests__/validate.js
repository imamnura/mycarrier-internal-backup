import validate from '../validate';

describe('src/components/forms/CheckingOrder/validate', () => {
  test('validate', () => {
    expect(validate()).not.toBeNull();
  });
});
