import validate from '../validate';

describe('src/components/forms/NoteNonConsortium/validate', () => {
  test('validate', () => {
    expect(validate()).not.toBeNull();
  });
});
