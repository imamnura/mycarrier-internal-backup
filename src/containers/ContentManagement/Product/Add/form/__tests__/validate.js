import validate from '../validate';

describe('src/containers/ContentManagement/Add/form/validate', () => {
  test('validate', () => {
    expect(validate()).not.toBeNull();
  });
});
