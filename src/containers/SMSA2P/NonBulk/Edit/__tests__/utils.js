import { optionsParse, isChannelMMS } from '../utils';

describe('src/containers/ServiceAssurance/DigitalProduct/utils', () => {
  test('optionsParse', () =>
    expect(
      optionsParse([{ dropdownName: 'test' }], 'dropdownName'),
    ).not.toBeNull());
  test('isChannelMMS', () => expect(isChannelMMS([])).not.toBeNull());
});
