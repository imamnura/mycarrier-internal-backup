import validate from '../validate';

describe('src/components/forms/CPNameForm/validate', () => {
  test('validate', () => {
    expect(validate()).not.toBeNull();
  });
});
