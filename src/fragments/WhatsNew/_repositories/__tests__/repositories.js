import { getWhatsNewContent } from '../repositories';

describe('src/fragments/WhatsNew/_repositories', () => {
  test('getWhatsNewContent', () => {
    expect(getWhatsNewContent()).toBeTruthy();
  });
});
