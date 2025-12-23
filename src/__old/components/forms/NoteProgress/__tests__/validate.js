import validate from '../validate';

describe('src/components/forms/NoteProgress/validate', () => {
  test('validate', () => {
    expect(validate()).not.toBeNull();
  });
});
