import validate from '../validate';

describe('src/form/SendEmailAmMapping', () => {
  it('test validate email', () => {
    const value = jest.fn();
    expect(validate(value)).not.toBeNull();
  });
});
