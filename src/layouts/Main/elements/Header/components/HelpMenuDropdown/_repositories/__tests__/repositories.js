import { getVersionInfo } from '../repositories';

describe('src/fragments/WhatsNew/_repositories', () => {
  test('getWhatsNewContent', () => {
    expect(getVersionInfo()).toBeTruthy();
  });
});
