import validate from '../validate';

describe('src/components/forms/DownloadReport/validate', () => {
  test('validate', () => {
    expect(validate()).not.toBeNull();
  });
});
