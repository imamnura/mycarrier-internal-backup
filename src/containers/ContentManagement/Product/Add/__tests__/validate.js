import validate from '../validate';

describe('src/containers/ContentManagement/Product/Add/validate', () => {
  test('validate', () => {
    expect(validate()).not.toBeNull();
  });
});
